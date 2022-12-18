// import React, {useState,useEffect } from 'react';
// import {createContext} from 'react';
// import firestore from '@react-native-firebase/firestore';

// export const FirebaseContext = createContext({});

// export const FirebaseProvider = ({children}) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribeUsers = getUsers();
//     return () => {
//       unsubscribeUsers;
//     };
//   }, []);


//   const getUsers = async () => {
//     const unsubscribe = firestore()
//       .collection('notas')
//       .onSnapshot(
//         (querySnapshot) => {
//           let d = [];
//           console.log("vagner")
//           console.log(querySnapshot);
//           querySnapshot.forEach(doc => {
//             const valor = {
//               id: doc.id,
//               nome: doc.data().nome,
//             };
//             d.push(valor);
//           });
//           setUsers(d);
//           // setData(d);
//           console.log(d);
//         },
//         error => {
//           console.log('Usuarios, getUsers:' + error);
//         },
//       );

//     return unsubscribe;
//   };

//   return (
//     <FirebaseContext.Provider value={{users, getUsers}}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };
