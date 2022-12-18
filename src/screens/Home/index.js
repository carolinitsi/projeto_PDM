import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {COLORS} from '../assets/colors';

const Home = () => {
  return (
    <View>
      <Text style={styles.titulo}>Bloco de notas 📃 </Text>
      <Text style={styles.texto}>
        Tenha suas tarefas listadas na palma da sua mão e TE ORGANIZA!
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
    padding: 30,
    color:'#FCBF65',
  },
  texto: {
    fontSize: 18,
    padding: 30,
  },
});
