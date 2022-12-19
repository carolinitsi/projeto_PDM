import React, {useContext, useEffect} from 'react';
import {Container, FlatList} from './styles';
import Item from './Item';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import AddFloatButton from '../../componentes/AddFloatButton';

import {DadoContext} from '../../context/DadoProvider';

const Dados = ({navigation, route}) => {
  const {getDados, dados} = useContext(DadoContext);

  const fetchData = async () => {
    await getDados();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {user: null},
      }),
    );
  };

  const routeUser = item => {
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {notas: item},
      }),
    );
  };

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <>
      <Image
        source={require('../../assets/imagens/background-title.png')}
        style={styles.background}
      />
      <Container>
        <Text>(API)</Text>
        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <AddFloatButton onClick={routeAddUser} />
      </Container>
    </>
  );
};

export default Dados;

const styles = StyleSheet.create({
  background: {
    width: 500,
    height: 800,
  },
});
