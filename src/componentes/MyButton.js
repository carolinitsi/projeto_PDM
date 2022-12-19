import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const MyButton = (props) => {
  //console.log(props);
  
  return (
    <TouchableHighlight onPress={() => props.onClick()} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{props.texto}</Text>
    </TouchableHighlight>
  );
};
export default MyButton;

const styles = StyleSheet.create({
  primaryButton: {
    width: 100,
    height: 40,
    backgroundColor:'#257A91',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 20,
    marginTop:20,
    marginBottom:20,
  },
  primaryButtonText:{
    color: 'white',
    fontWeight: 'bold',
  }
});