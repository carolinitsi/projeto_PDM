import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../src/screens/SignIn/index';
import SignUp from '../../src/screens/SignUp';
import RecuperarSenha from '../../src/screens/RecuperarSenha';
import Preload from '../../src/screens/Preload';
import Cadastro from '../../src/screens/Cadastro';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Preload" component={Preload} /> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />  
        </Stack.Navigator>
  );
};

export default AuthStack;