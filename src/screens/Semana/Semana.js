import React, {useContext, useEffect} from 'react';
import {Container, FlatList} from './styles';
import Item from './Item';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import AddFloatButton from '../../componentes/AddFloatButton';

import {SemanaContext} from '../../context/SemanaProvider';

const Semana = ({navigation, route}) => {
  const {getDados, dados} = useContext(SemanaContext);

  const fetchData = async () => {
    await getDados();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const routeAddUser = () =>{
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: null},
      }),
    ); 
  }

  const routeUser = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {notas: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item}  onPress={() => routeUser(item)}/>
  );

  return (
    <Container> 
        <Text>Tarefas Semana:</Text>
        <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    <AddFloatButton onClick={routeAddUser}/>
    </Container>
  );
};

export default Semana;
