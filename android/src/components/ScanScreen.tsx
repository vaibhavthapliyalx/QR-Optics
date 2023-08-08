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
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, Animated } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanScreen = () => {
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [scanStatus, setScanStatus] = useState<'none' | 'detected' | 'success'>('none');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const successAnimationValue = useRef(new Animated.Value(0)).current;

  const handleScanSuccess = (data: string) => {
    setQRCodeData(data);
    setSuccessAnimation(true);
    playSuccessAnimation();
  };

  const playSuccessAnimation = () => {
    Animated.sequence([
      Animated.timing(successAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(successAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSuccessAnimation(false);
    });
  };

  const generateQRCode = () => {
    setQRCodeData(null);
    setScanStatus('none'); // Reset scan status when generating a new QR code
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const handleScanStatusChange = (status: boolean) => {
    if (status) {
      setScanStatus('detected');
    } else {
      setScanStatus('none');
    }
  };

  useEffect(() => {
    // Initialize success animation value
    successAnimationValue.setValue(0);
  }, []);

  useEffect(() => {
    if (qrCodeData) {
      // Open the URL in the device's browser
      Linking.openURL(qrCodeData)
        .then((response) => {
          // Handle success
          console.log('Successfully opened URL:', qrCodeData);
          setScanStatus('success');
        })
        .catch((error) => {
          // Handle error
          console.error('Error opening URL:', error);
          setScanStatus('none'); // Reset scan status if opening URL failed
        });
    }
  }, [qrCodeData]);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      >
        <QRCodeScanner
          onRead={(e) => {
            handleScanStatusChange(true);
            handleScanSuccess(e.data);
          }}
          showMarker={true}
          markerStyle={[styles.marker, scanStatus === 'detected' && styles.markerDetected]}
          reactivate={true}
          reactivateTimeout={2000}
        />
      </RNCamera>
      {scanStatus === 'none' && (
        <View style={styles.scanStatusContainer}>
          <View style={styles.scanStatusBox} />
          <Text style={styles.scanStatusText}>No QR Detected</Text>
        </View>
      )}
      {scanStatus === 'detected' && (
        <View style={styles.scanStatusContainer}>
          <View style={[styles.scanStatusBox, styles.scanStatusDetectedBox]} />
          <Text style={styles.scanStatusText}>QR Detected</Text>
        </View>
      )}
      {scanStatus === 'success' && (
        <View style={styles.successAnimationContainer}>
          <Animated.View
            style={[
              styles.successAnimation,
              {
                opacity: successAnimationValue,
                transform: [
                  {
                    scale: successAnimationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <Text style={styles.flashButtonText}>{flashOn ? 'Flash Off' : 'Flash On'}</Text>
      </TouchableOpacity>
      {qrCodeData && (
        <>
          <View style={styles.qrCodeContainer}>
            <Text style={styles.qrCodeText}>Scanned QR Code:</Text>
            <Text style={styles.qrCodeData}>{qrCodeData}</Text>
          </View>
          <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
            <Text style={styles.generateButtonText}>Scan More QR Codes</Text>
          </TouchableOpacity>
        </>
      )}
      {!qrCodeData && (
        <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
          <Text style={styles.generateButtonText}>Generate QR Code</Text>
        </TouchableOpacity>
      )}
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
  successAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successAnimation: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 50,
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
  qrCodeContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  qrCodeText: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
  },
  qrCodeData: {
    fontSize: 16,
    color: 'white',
  },
  generateButton: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
  },
  generateButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default ScanScreen;
