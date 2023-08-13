/***************************************************************************************
 *  © 2023 Vaibhav Thapliyal.
 *  All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at

 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***************************************************************************************/

// React and Component imports.
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

/**
 * @enum ScanStatus: Enum representing the possible states of QR code scanning.
 *
 * @member Detected: Indicates that a QR code has been detected by the scanner.
 * @member Undetected: Indicates that no QR code has been detected.
 */
enum ScanStatus {
  Detected,
  Undetected,
}

/**
 * @enum QRCodeType: Enum representing the possible types of QR codes.
 * 
 * @member None: No specific QR code type detected.
 * @member URl: Indicates that the QR code contains a URL.
 * @member Text: Indicates that the QR code contains plain text.
 * @member Other: Indicates that the QR code contains content of another type. 
 */
enum QRCodeType {
  None,
  URL,
  Text,
  Other,
}
/**
 * ScanScreen Component that renders screen from which QR Code can be scanned.
 * 
 * @returns ScanScreen Component.
 */
const ScanScreen = () => {
  // State variables.
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [QRType, setQRType] = useState<QRCodeType>(QRCodeType.Other);
  const [scanStatus, setScanStatus] = useState<ScanStatus>(ScanStatus.Undetected);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  /**
   * @function Function that sets QR Data after successful QR Code Read.
   * @param data An object that contains QR data received after QR read success. 
   */
  function setQRData(data: any) {
    if (data.includes('http') || data.includes('https') || data.includes('www')) {
      setQRType(QRCodeType.URL);
    } else if (data.type === 'TEXT') {
      setQRType(QRCodeType.Text);
    } else {
      setQRType(QRCodeType.Other);
    }
    setQRCodeData(data);
  }

  /**
   * @function Function to handle state of device's flashlight based on click of button.
   */
  function toggleFlash() {
    setFlashOn(!flashOn);
  }

  /**
   * @function Function that resets the QR Data, enables capturing new data.
   */
  function resetQRData() {
    if (flashOn) {
      setFlashOn(false);
    }
    setQRCodeData(null);
    setQRType(QRCodeType.None);
    setScanStatus(ScanStatus.Undetected); // Reset scan status.
  }

  // UseEffect performed to handle the QR data on each time new QR data is read.
  useEffect(() => {
    if (qrCodeData && QRType === QRCodeType.URL) {
      // Open the URL in the device's browser
      Linking.openURL(qrCodeData)
        .then((response) => {
          // Handle success
          console.log('Successfully opened URL:', qrCodeData);
        })
        .catch((error) => {
          // Handle error
          console.error('Error opening URL:', error);
        });
    }

    // Reset previous data allowing capturing new data.
    resetQRData();
  }, [qrCodeData]);

  /************* Render Function *************/
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      >
        <QRCodeScanner
          onRead={(event) => {
            setScanStatus(ScanStatus.Detected);
            setQRData(event.data);
          }}
          showMarker={true}
          markerStyle={[styles.marker, scanStatus === ScanStatus.Detected && styles.markerDetected]}
          reactivate={true}
          reactivateTimeout={2000}
        />
      </RNCamera>
      {scanStatus === ScanStatus.Undetected && (
        <View style={styles.scanStatusContainer}>
          <View style={styles.scanStatusBox} />
          <Text style={styles.scanStatusText}>No QR Detected</Text>
        </View>
      )}
      {scanStatus === ScanStatus.Detected && (
        <View style={styles.scanStatusContainer}>
          <View style={[styles.scanStatusBox, styles.scanStatusDetectedBox]} />
          <Text style={styles.scanStatusText}>QR Detected</Text>
        </View>
      )}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <Text style={styles.flashButtonText}>{flashOn ? 'Flash Off' : 'Flash On'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={()=>navigation.navigate('AboutScreen')}
      >
      <Image
        style={styles.iconImage}
        source={require('../assets/info/info_icon.png')}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  marker: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  markerDetected: {
    borderColor: 'green',
  },
  scanStatusContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanStatusBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'blue',
  },
  scanStatusDetectedBox: {
    borderColor: 'green',
  },
  scanStatusText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  flashButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconImage: {
    width: 38,
    height: 38,
  },
});

export default ScanScreen;