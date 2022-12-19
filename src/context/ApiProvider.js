import React, {useState} from 'react';
import {createContext} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apilocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/pdmapp-f87c4/databases/(default)/documents',
              header: {Athorization: 'Bearer ' + idToken},
            });
            console.log('API');
            console.log(apilocal);
            apilocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            setApi(apilocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi');
        });
    }
  };

  return (
    <ApiContext.Provider value={{api, getApi}}>{children}</ApiContext.Provider>
  );
};
