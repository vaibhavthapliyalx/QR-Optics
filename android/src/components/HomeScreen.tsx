/***************************************************************************************
 *  © 2023 Vaibhav Thapliyal
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

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  // const navigation = useNavigation();

  const handleScanSuccess = (data: string) => {
    console.log(data);
    // Handle scanned data here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner App</Text>
      <Text style={styles.description}>
        Tap the button below to scan a QR code.
      </Text>
      <Button
        title="Scan"
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;