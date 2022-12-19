import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from '../context/ApiProvider';

export const SemanaContext = createContext({});

export const SemanaProvider = ({children}) => {
  const [dados, setDados] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getDados = async () => {
    try {
      const response = await api.get('/notas_semana');
      console.log('Notas semanas buscados vai API');
      console.log(response);
      console.log(response.data);
      console.log(response.data.documents);

      let data = [];
      response.data.documents.map((d)=>{
        let k = d.name.split('projects/pdmapp-f87c4/databases/(default)/documents/notas_semana/',
        );
        data.push({
          nome: d.fields.nome.stringValue,
          uid: k[1],
        })
      });
      data.sort((a,b)=> a.nome.localeCompare(b.nome));
      setDados(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Error ao buscar via api');
      console.log(response);
    }
  };

  const saveDado = async (val) => {
    try{
      await api.post('/notas/',{
        fields:{
          nome: {stringValue: val.nome},
        }
      });
      showToast('Dados salvos!');
      getDados();
    }catch(response){
      setErrorMessage(response);
      console.log('Error ao buscar via api');
      console.log(response);
    }
  };

  const updateDado = async (val) => {
    try{
      await api.patch('/notas_semana/' + val.id,{
        fields:{
          nome: {stringValue: val.nome},
        }
      });
      showToast('Dados salvos!');
      getDados();
    }catch(response){
      setErrorMessage(response);
      console.log('Error ao ediar via api');
      console.log(response);
    }
  };

  const deleteDado = async (val) => {
    try{
      await api.delete('/notas_semana/' + val);
      showToast('Dados Excluidos!');
      getDados();
    }catch(response){
      setErrorMessage(response);
      console.log('Error ao excluir via api');
      console.log(response);
    }
  };

  return (
    <SemanaContext.Provider
      value={{
        dados,
        getDados,
        saveDado,
        updateDado,
        deleteDado,
      }}>
      {children}
    </SemanaContext.Provider>
  );
};
