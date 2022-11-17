import React, {useState} from 'react';
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
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS} from '../assets/colors';

const SingUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && password !== '' && confirPass !== '') {
      if (password === confirPass && password.length > 6) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            let userFirebase = auth().currentUser;
            userFirebase
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enviado um email de confirmação para este endereço:' +
                    email,
                );
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                  }),
                );
              })
              .catch(e => {
                console.error('SingUp, entrar: ' + e);
              });
          })
          .catch(error => {
            console.error('SingUp, entrar: ' + error);
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert('Erro', 'Usuário não cadastrado.');
                break;
              case 'auth/wrong-password':
                Alert.alert('Erro', 'Erro na senha.');
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
        if (password.length > 6) {
          Alert.alert(
            'Atenção',
            'Senha e confirmação de senha devem ser iguais',
          );
        } else {
          Alert.alert('Atenção', 'A senha deve ter mais do que 6 caracteres');
        }
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            keyboardType="nome-address"
            returnKeyType="next"
            onChangeText={t => setNome(t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            // secureTextEntry={showPass}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setConfirmPass(t)}
          />
          <MyButton texto="Cadastrar" onClick={cadastrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SingUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:COLORS.primaryLight,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
    marginTop:150,
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 250,
    margin: 5,
    position: 'absolute',
    backgroundSize: 'cover',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: 'blue',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: 'grey',
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
  },
});
