// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TextInput,
//   View,
//   Text,
//   Alert,
//   ImageBackground,
// } from 'react-native';
// import MyButton from '../componentes/MyButton';
// import auth from '@react-native-firebase/auth';
// import {CommonActions} from '@react-navigation/native';
// import EncryptedStorage from 'react-native-encrypted-storage';

// const SingIn = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(true);

//   async function storeUserSession(localUser) {
//     try {
//       await EncryptedStorage.setItem('user_session', JSON.stringify(localUser));
//     } catch (error) {
//       console.error('SingIn, storeUserSession: ' + error);
//     }
//   }

//   // const cadastrar = () =>{
//   //   navigation.dispatch(
//   //     CommonActions.reset({
//   //       index: 0,
//   //       routes: [{name: 'SignUp'}],
//   //     }),
//   //   );
//   // };

//   const entrar = () => {
//     if (email !== '' && password !== '') {
//       auth()
//         .signInWithEmailAndPassword(email, password)
//         .then(() => {
//           if (!auth().currentUser.emailVerified) {
//             Alert.alert(
//               'Informação',
//               'Você deve verificar o seu email para prosseguir!',
//             );
//             return;
//           }
//           navigation.dispatch(
//             CommonActions.reset({
//               index: 0,
//               routes: [{name: 'AppStack'}],
//             }),
//           );
//           storeUserSession({
//             email,
//             password,
//           });
//         })
//         // navigation.navigate('AppStack');
//         .catch(error => {
//           console.error('SignIn, entrar: ' + error);
//           switch (error.code) {
//             case 'auth/user-not-found':
//               Alert.alert('Erro', 'Usuário não cadastrado.');
//               break;
//             case 'auth/wrong-password':
//               Alert.alert('Erro', 'Erro na senha.');
//               break;
//             case 'auth/invalid-email':
//               Alert.alert('Erro', 'Email inválido.');
//               break;
//             case 'auth/user-disabled':
//               Alert.alert('Erro', 'Usuário desabilitado.');
//               break;
//           }
//         });
//     } else {
//       Alert.alert('Atenção', 'Você deve preencher todos os campos.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.divSuperior}>
//           {/* <Image
//             style={styles.background}
//             source={require('../assets/imagens/login-image.png')}
//             accessibilityLabel="logo do app"
//           /> */}
//           {/* <Image
//             style={styles.image}
//             source={require('../assets/imagens/logo.png')}
//             accessibilityLabel="logo do app"
//           /> */}
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             keyboardType="email-address"
//             returnKeyType="next"
//             onChangeText={t => setEmail(t)}
//           />
//           <TextInput
//             style={styles.input}
//             secureTextEntry={showPass}
//             placeholder="Senha"
//             keyboardType="default"
//             returnKeyType="go"
//             onChangeText={t => setPassword(t)}
//           />
//           <Text
//             style={styles.textEsqueceuSenha}
//             onPress={() => navigation.navigate('RecuperarSenha')}>
//             Esqueceu sua senha?
//           </Text>
//           <MyButton texto="ENTRAR" onClick={entrar} />
//         </View>
//         <View style={styles.divInferior}>
//           <View style={styles.divOuHr}>
//             <View style={styles.divHr} />
//             <Text style={styles.textOu}>OU</Text>
//             <View style={styles.divHr} />
//           </View>
//           <View style={styles.divCadastrarSe}>
//             <Text style={styles.textNormal}>Não tem uma conta?</Text>
//             <Text
//               style={styles.textCadastrarSe}
//               onPress={() => navigation.navigate('SignUp')}>
//               Cadastre-se
//             </Text>
//           </View>
//           <ImageBackground
//             source={require('../assets/imagens/login-image.png')}
//             style={{
//               width: 400,
//               height: 600,
//               flex: 1,
//               resizeMode: 'cover',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           />
//           {/* {loading && <Loading />} */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default SingIn;

// const styles = StyleSheet.create({
//   background: {
//     width: 500,
//     height: 700,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // padding: 20,
//   },
//   divSuperior: {
//     flex: 5,
//     alignItems: 'center',
//   },
//   divInferior: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     margin: 5,
//   },
//   input: {
//     width: '95%',
//     height: 50,
//     borderBottomColor: 'grey',
//     borderBottomWidth: 2,
//     fontSize: 16,
//     paddingLeft: 2,
//     paddingBottom: 1,
//   },
//   textEsqueceuSenha: {
//     fontSize: 15,
//     color: 'blue',
//     alignSelf: 'flex-end',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   divOuHr: {
//     width: '100%',
//     height: 30,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   divHr: {
//     width: '30%',
//     height: 1,
//     borderBottomColor: 'grey',
//     borderBottomWidth: 2,
//   },
//   textOu: {
//     marginLeft: 20,
//     marginRight: 20,
//     fontSize: 20,
//     color: 'grey',
//   },
//   divCadastrarSe: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   textNormal: {
//     fontSize: 18,
//   },
//   textCadastrarSe: {
//     fontSize: 16,
//     color: 'blue',
//     marginLeft: 5,
//   },
// });
