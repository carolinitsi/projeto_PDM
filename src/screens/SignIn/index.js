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
  ImageBackground,
} from 'react-native';
import MyButton from '../../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
// import {Fundo} from './style';

const SingIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  async function storeUserSession(localUser) {
    try {
      await EncryptedStorage.setItem('user_session', JSON.stringify(localUser));
    } catch (error) {
      console.error('SingIn, storeUserSession: ' + error);
    }
  }

  const entrar = () => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (!auth().currentUser.emailVerified) {
            Alert.alert(
              'Informação',
              'Você deve verificar o seu email para prosseguir!',
            );
            return;
          }
          // navigation.dispatch(
          //   CommonActions.navigate({
          //     name: 'Home',
          //   }),
          // );
          storeUserSession({
            email,
            password,
          });
        })
        // navigation.navigate('AppStack');
        .catch(error => {
          console.error('SignIn, entrar: ' + error);
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
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            source={require('../../assets/imagens/login-image.png')}
            style={styles.background}
          />
          {/* <Fundo> */}
        </View>
        <View style={styles.divInferior}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={showPass}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          <Text
            style={styles.textEsqueceuSenha}
            onPress={() => navigation.navigate('RecuperarSenha')}>
            Esqueceu sua senha?
          </Text>
          <MyButton texto="ENTRAR" onClick={entrar} />
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text
              style={styles.textCadastrarSe}
              onPress={() => navigation.navigate('SignUp')}>
              Cadastre-se
            </Text>
          </View>
          {/* {loading && <Loading />} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SingIn;

const styles = StyleSheet.create({
  background: {
    width: 500,
    height: 700,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    alignItems: 'center',
    marginTop: 150,
    position: 'absolute',
    marginLeft:30,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
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
    fontWeight: 'bold',
    color: '#257A91',
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
    fontWeight: 'bold',
    color: '#257A91',
    marginLeft: 5,
  },
});
