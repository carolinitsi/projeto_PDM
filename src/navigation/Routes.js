import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthUserContext} from '../context/AuthUserProvider';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      authUser ? setUser(authUser) : setUser(null);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
