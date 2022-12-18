import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {UsuariosProvider} from '../context/UsuariosProvider';
import Routes from './Routes';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UsuariosProvider>
        <Routes/>
      </UsuariosProvider>
    </AuthUserProvider>
  );
}