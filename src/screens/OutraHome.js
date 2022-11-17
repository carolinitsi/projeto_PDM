import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  View,
  Text,
  Alert,
} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

const OutraHome = () => {
  const sair = async () => {
    await EncryptedStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(e => {
            console.error('SignOut firebase, sair: ' + e);
          });
        RNRestart.Restart();
      })
      .catch(e => {
        console.error('SignOut, sair: ' + e);
      });
  };

  return (
    <View>
      <MyButton texto="Sair" onClick={sair} />
    </View>
  );
};

export default OutraHome;
