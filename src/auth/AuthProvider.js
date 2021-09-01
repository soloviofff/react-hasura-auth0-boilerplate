import React from 'react';
import AuthConfigurations, { Provider, ProviderOptions } from './Auth0';

export const AuthContext = React.createContext(undefined);

const AuthProvider = ({ children }) => {
  return (
    <Provider {...ProviderOptions}>
      <AuthConfigurations>
        {children}
      </AuthConfigurations>
    </Provider>
  );
};

export default AuthProvider;
