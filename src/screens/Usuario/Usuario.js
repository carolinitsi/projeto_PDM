import React, {useState, useEffect, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
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
import MyButton from '../../componentes/MyButton';
import Loading from '../../componentes/Loading';
import {UsuariosContext} from '../../context/UsuariosProvider';
import {DadoContext} from '../../context/DadoProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../assets/colors';

const Usuario = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const {saveNota} = useContext(UsuariosContext);
  const {deleteNota} = useContext(UsuariosContext);
  const {saveDado} = useContext(DadoContext);
  const {updateDado} = useContext(DadoContext);
  const {deleteDado} = useContext(DadoContext);

  useEffect(() => {
    // console.log(route.params.notas);
    setNome('');
    setId('');
    if (route.params.notas) {
      setNome(route.params.notas.nome);
      setId(route.params.notas.id);
    }
  }, [route]);

  // const salvar = async () => {
  //   if (nome) {
  //     let nota = {};
  //     nota.id = id;
  //     nota.nome = nome;
  //     setLoading(true);
  //     await saveNota(nota);
  //     setLoading(false);
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{name: 'Usuarios'}],
  //       }),
  //     );
  //   } else {
  //     Alert.alert('Atenção', 'Digite todos os campos!');
  //   }
  // };
  // const excluir = async () => {
  //   Alert.alert('Atenção:', 'Tem certeza que deseja excluir essa nota?', [
  //     {
  //       text: 'Não',
  //       onPress: () => {},
  //       styles: 'cancel',
  //     },
  //     {
  //       text: 'Sim',
  //       onPress: async () => {
  //         setLoading(true);
  //         await deleteNota(id);
  //         setLoading(false);
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{name: 'Usuarios'}],
  //           }),
  //         );
  //       },
  //     },
  //     ,
  //   ]);
  // };

  //API

  const salvar = async () => {
    if (nome) {
      let nota = {};
      nota.id = id;
      nota.nome = nome;
      setLoading(true);
      await saveDado(nota);
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Usuarios'}],
        }),
      );
    } else {
      Alert.alert('Atenção', 'Digite todos os campos!');
    }
  };

  const update = async () => {
    if (nome) {
      let nota = {};
      nota.id = id;
      nota.nome = nome;
      setLoading(true);
      await updateDado(nota);
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Usuarios'}],
        }),
      );
    } else {
      Alert.alert('Atenção', 'Digite todos os campos!');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção:', 'Tem certeza que deseja excluir essa nota?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteDado(id);
          setLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Usuarios'}],
            }),
          );
        },
      },
      ,
    ]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={require('../../assets/imagens/background-novaNota.png')}
          style={styles.background}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.texto}
            placeholder="Nova nota"
            keyboardType="nome-address"
            returnKeyType="next"
            onChangeText={t => setNome(t)}
            value={nome}
          />
          <View style={styles.containerButtons}>
            {!id ? <MyButton texto="Salvar ✅" onClick={salvar} /> : null}
            {id ? <MyButton texto="Deletar❌" onClick={excluir} /> : null}
            {id ? <MyButton texto="Salvar ✅" onClick={update} /> : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginTop: 150,
    marginLeft: 50,
    position: 'absolute',
  },
  background: {
    width: 500,
    height: 800,
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    backgroundColor: 'red',
  },
 
  texto: {
    fontSize: 18,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 100,
  },
});
