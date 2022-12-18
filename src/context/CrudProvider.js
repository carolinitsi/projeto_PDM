import React, {useState, useEffect } from 'react';
import {createContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';

export const CrudContext = createContext({});

export const CrudProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nota, setNota] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const unsubscribeUsers = salvar();
    return () => {
      unsubscribeUsers;
    };
  }, []);


  const salvar = () => {
    firestore()
      .collection('notas')
      .doc(uid)
      .set(
        {
          nome: nota,
        },
        {merge: true},
      )
      .then(() => {
        setNota('');
        setUid('');
        showToast('Dados salvos');
        // navigation.goBack();
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Usuarios',
          }),
        );
      })
      .catch(error => {
        console.log('User, salvar:' + error);
      });
  };

  return (
    <CrudContext.Provider value={{users, salvar}}>
      {children}
    </CrudContext.Provider>
  );
};
