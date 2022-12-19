import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../src/screens/Home/index';
import Usuarios from '../../src/screens/Usuarios/Usuarios';
import Usuario from '../../src/screens/Usuario/Usuario';
import Dados from '../../src/screens/Dados/Dados';
import Semana from '../../src/screens/Semana/Semana';
import OutraHome from '../../src/screens/OutraHome';
import Preload from '../../src/screens/Preload';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../src/assets/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const AppStackRoutes = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name="favorite-outline" color={COLORS.green} size={30} />
          ),
        }}
        name="Home"
        component={Home}
      />
       {/* <Tab.Screen
        options={{
          tabBarLabel: 'Semana',
          tabBarIcon: () => (
            <Icon name="create" color={COLORS.green} size={30} />
          ),
        }}
        name="Semana"
        component={Semana}
      /> */}
      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Icon name="settings" color={COLORS.green} size={30} />
          ),
        }}
        name="OutraHome"
        component={OutraHome}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notas',
          tabBarIcon: () => (
            <Icon name="auto-stories" color={COLORS.green} size={35} />
          ),
        }}
        name="Usuarios"
        component={Usuarios}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Nova nota',
          tabBarIcon: () => (
            <Icon name="create" color={COLORS.green} size={30} />
          ),
        }}
        name="Usuario"
        component={Usuario}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Api',
          tabBarIcon: () => (
            <Icon name="create" color={COLORS.green} size={30} />
          ),
        }}
        name="Dados"
        component={Dados}
      />
    </Tab.Navigator>
  );
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AppStackRoutes" component={AppStackRoutes} />
      </Stack.Navigator>
  );
};

export default AppStack;
