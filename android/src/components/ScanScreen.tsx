import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

const ScanScreen = () => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const onBarCodeScanned = (event: any) => {
    if (!scanned) {
      setScanned(true);
      setQRCodeData(event.data);
      ToastAndroid.show(`Scanned: ${event.data}`, ToastAndroid.SHORT);
    }
  };

  const generateQRCode = () => {
    setScanned(false);
    setQRCodeData('');
  };

  const shareQRCode = async () => {
    try {
      const shareOptions = {
        title: 'QR Code',
        url: qrCodeData,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : undefined}
        onBarCodeRead={onBarCodeScanned}
      />
      {qrCodeData ? (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} />
          <TouchableOpacity style={styles.button} onPress={shareQRCode}>
            <Text style={styles.buttonText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={generateQRCode}
          disabled={scanned}
        >
          <Text style={styles.buttonText}>
            {scanned ? 'Generating...' : 'Generate QR Code'}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <Text style={styles.flashButtonText}>
          {flashOn ? 'Flash Off' : 'Flash On'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
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
});

export default ScanScreen;
