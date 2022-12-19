import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {Container, FlatList} from './styles';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';
import {UsuariosContext} from '../../context/UsuariosProvider';
import {ApiContext} from '../../context/ApiProvider';

const Usuarios = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const {users} = useContext(UsuariosContext);
  const {getApi} = useContext(ApiContext);

  useEffect(() => {
    setData(users);
    getApi();
  }, [users]);

  const routeUser = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {notas: item},
      }),
    );
  };

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <>
      <Image
        source={require('../../assets/imagens/background-title.png')}
        style={styles.background}
      />
      <Container>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* {loading && <Loading/>}    */}
        <AddFloatButton onClick={routeAddUser} />
      </Container>
    </>
  );
};

export default Usuarios;

const styles = StyleSheet.create({
  background: {
    width: 500,
    height: 800,
  },
});
