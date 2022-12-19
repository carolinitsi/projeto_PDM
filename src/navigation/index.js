import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {UsuariosProvider} from '../context/UsuariosProvider';
import {DadoProvider} from '../context/DadoProvider';
import {SemanaProvider} from '../context/SemanaProvider';
import {ApiProvider} from '../context/ApiProvider';

import Routes from './Routes';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <DadoProvider>
          <SemanaProvider>
            <UsuariosProvider>
              <Routes />
            </UsuariosProvider>
          </SemanaProvider>
        </DadoProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
