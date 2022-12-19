import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import Loading from '../componentes/Loading';
import {ApiContext} from '../context/ApiProvider';

const Preload = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {getApi} = useContext(ApiContext);

  const entrar = async (email, password) => {
    if (email !== '' && password !== '') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session) {
        let localUser = JSON.parse(session);
        entrar(localUser.email, localUser.password);
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
        // navigation.navigate('SingIn');
      }
    } catch (error) {
      console.error('Preload, retrieveUserSession: ' + error);
    }
  }

  async function loginAutomatico() {
    await retrieveUserSession();
  }

  useEffect(() => {
    loginAutomatico();
    getApi();
  }, []);

  return (
    <View>
      <Image
        style={styles.image}
        source={require('../assets/imagens/dialogue.gif')}
        accessibilityLabel="logo do app"
      />
      {loading && <Loading />}
    </View>
  );
};

export default Preload;
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
});
