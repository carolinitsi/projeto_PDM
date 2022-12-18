import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loading from '../componentes/Loading';

export const UsuariosContext = createContext({});

export const UsuariosProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nota, setNota] = useState('');
  const [uid, setUid] = useState('');

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribeUsers = getUsers();
    return () => {
      unsubscribeUsers;
    };
  }, []);

  const getUsers = async () => {
    const unsubscribe = firestore()
      .collection('notas')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          console.log('vagner');
          console.log(querySnapshot);
          querySnapshot.forEach(doc => {
            const valor = {
              id: doc.id,
              nome: doc.data().nome,
            };
            d.push(valor);
          });
          setUsers(d);
          // setData(d);
          console.log(d);
        },
        error => {
          console.log('Usuarios, getUsers:' + error);
        },
      );

    return unsubscribe;
  };

  const saveNota = async val => {
    console.log(val);
    await firestore()
      .collection('notas')
      .doc(val.id)
      .set(
        {
          nome: val.nome,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        showToast('Dados salvos');
      })
      .catch(e => {
        console.error('CourseProvider, save:' + e);
      });
  };

  const deleteNota = async (val) => {
    console.log("teste");
    console.log(val);
    firestore()
      .collection('notas')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Nota deletada!');
      })
      .catch(e => {
        console.error('ERROR: deleteNota:' + e);
      });
  };;

  return (
    <UsuariosContext.Provider value={{users, getUsers, saveNota, deleteNota}}>
      {children}
    </UsuariosContext.Provider>
  );
};
