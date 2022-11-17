import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet, TextInput, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../assets/colors';

// import { Container } from './styles';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação de senha para o seguinte endereço:' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.error('RecuperarSenha, recover: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Atenção:', 'Por favor digite um email cadastrado!');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imagens/ops.png')}
        style={styles.image}
      />
      {/* <Text style={styles.title}>Ei!</Text> */}
      <Text style={styles.text}>
        Esqueceu sua senha? Digite seu email para realizarmos a recuperação!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButton texto="Recuperar senha" onClick={recover} />
    </View>
  );
};

export default RecuperarSenha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    width: '100%',
    color: COLORS.green,
  },
  text: {
    fontSize: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
