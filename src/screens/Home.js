import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../componentes/MyButton';

const Home = () => {
  return (
    <View>
      <Text style={styles.titulo}>Olá Mundo testeeee😍</Text>
      <Text style={styles.texto}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
      <MyButton/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    marginTop: 32,
    padding: 30,
  },
  texto: {
    fontSize: 18,
    padding: 30,
  },
});
