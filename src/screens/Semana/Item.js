import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  background-color: #fff2;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextName = styled.Text`
  font-size: 20px;
  color: ${COLORS.green};
`;

const TextEmail = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const Home = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextName> {item.nome}</TextName>
      </>
    </Button>
  );
};

export default Home;
