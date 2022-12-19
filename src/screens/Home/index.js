import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
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

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: null},
      }),
    );
  };

  return (
    <>
      <Image
        source={require('../../assets/imagens/background-home.png')}
        style={styles.background}
      />
      <View style={styles.container}>
        <Text style={styles.titulo}> </Text>
        <Text style={styles.texto} />
        <View style={styles.containerButtons}>
          <MyButton texto="< Sair" onClick={sair}/>
          <MyButton texto="Iniciar >" onClick={routeAddUser} />
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    marginTop: 300,
  },
  background: {
    width: 500,
    height: 800,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
    padding: 30,
    color: '#FCBF65',
  },
  texto: {
    fontSize: 18,
    padding: 30,
  },
});
