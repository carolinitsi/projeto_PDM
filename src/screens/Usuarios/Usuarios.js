import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {Container, FlatList} from './styles';
import Item from './Item';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';
import {UsuariosContext} from '../../context/UsuariosProvider';



const Usuarios = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const {users} = useContext(UsuariosContext);

  useEffect(() => {
    setData(users);
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

  const routeAddUser = () =>{
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: null},
      }),
    ); 
  }

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <Container>
      <Text>Minha lista:</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* {loading && <Loading/>}    */}
      <AddFloatButton onClick={routeAddUser}/>
    </Container>
  );
};

export default Usuarios;
