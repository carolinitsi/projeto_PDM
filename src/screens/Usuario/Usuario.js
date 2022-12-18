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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../assets/colors';


const Usuario = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const {saveNota} = useContext(UsuariosContext);
  const {deleteNota} = useContext(UsuariosContext);

  useEffect(() => {
    // console.log(route.params.notas);
    setNome('');
    setId('');
    if (route.params.notas) {
      setNome(route.params.notas.nome);
      setId(route.params.notas.id);
    }
  }, [route]);

  const salvar = async () => {
    if (nome) {
      let nota = {};
      nota.id = id;
      nota.nome = nome;
      setLoading(true);
      await saveNota(nota);
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
          await deleteNota(id);
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
        <View style={styles.container}>
          <Text style={styles.titulo}> <Icon name="create" color={COLORS.green} size={30} />Nova nota:</Text>
          <TextInput 
            style={styles.texto}
            placeholder="Nova nota"
            keyboardType="nome-address"
            returnKeyType="next"
            onChangeText={t => setNome(t)}
            value={nome}
          />
          <MyButton texto="Salvar" onClick={salvar} />
          {id ? <MyButton texto="Excluir" onClick={excluir} /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  container:{
    width: 300,
    marginTop:200,
    marginLeft:50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom:10,
    color:'#257A91',
  },
  texto: {
    fontSize: 18,
    padding: 30,
    backgroundColor: 'white',
    borderRadius:20,
  },
});
