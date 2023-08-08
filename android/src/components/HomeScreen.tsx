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

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  displayHomeScreen: boolean;
}

export type RootStackParamList = {
  ScanScreen: { handleScanSuccess: (data: string) => void } | undefined;
};

const HomeScreen: React.FC<IProps> = ({ displayHomeScreen }: IProps) => {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    setDisplay(displayHomeScreen);
  }, [displayHomeScreen]);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleScanSuccess = (data: string) => {
    console.log(data);
    // Handle scanned data here
  };

  return (
    <>
      {display && (
        <View style={styles.container}>
          <Text style={styles.title}>QR Code Scanner App</Text>
          <Text style={styles.description}>
            Tap the button below to scan a QR code.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ScanScreen', { handleScanSuccess })}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;
