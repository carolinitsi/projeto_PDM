import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../assets/colors';

export const LoadingArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default () => {
  return (
    <LoadingArea>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </LoadingArea>
  );
};
