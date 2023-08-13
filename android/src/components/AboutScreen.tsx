import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, useColorScheme } from 'react-native';

const AboutScreen = () => {
  const developerEmail = 'vaibhavthapliyal31@gmail.com';
  const colorScheme = useColorScheme();

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${developerEmail}`);
  };

  const isDarkMode = colorScheme === 'dark';
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#333333';
  const buttonColor = isDarkMode ? '#2196F3' : '#0D8AFF';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <Image source={require('../../app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')} style={styles.logo} />
        <Text style={[styles.title, { color: textColor }]}>QR Optics</Text>
        <Text style={[styles.version, { color: textColor }]}>Version 1.0.0</Text>
        <Text style={[styles.description, { color: textColor }]}>
          QR Optics is a simple and user-friendly Android app for scanning QR codes. This app
          is built using React Native and allows you to quickly scan and read QR codes.
        </Text>
        <Text style={[styles.disclaimer, { color: textColor }]}>
          Disclaimer: QR Optics is provided "as is" without any warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The entire risk as to the quality and performance of the app is with you. Should the app prove defective, you assume the cost of all necessary servicing, repair, or correction.
        </Text>
        <Text style={[styles.license, { color: textColor }]}>
          © 2023 Vaibhav Thapliyal. All rights reserved.
          Licensed under the Apache License, Version 2.0.
          See the full license at http://www.apache.org/licenses/LICENSE-2.0
        </Text>
        <TouchableOpacity onPress={handleEmailPress} style={[styles.contactButton, { backgroundColor: buttonColor }]}>
          <Text style={[styles.contactButtonText, { color: 'white' }]}>Got any questions or issues? Contact the Developer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  license: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 40,
  },
  contactButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;
