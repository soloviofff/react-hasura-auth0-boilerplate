import React from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { AuthContext } from './AuthProvider';
import history from "../utils/history";
import { getConfig } from "../config";
const config = getConfig();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

export const Provider = Auth0Provider;
export const ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  redirectUri: window.location.origin,
  onRedirectCallback,
  cacheLocation: "localstorage"
}

const AuthConfigurations = ({ children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }

  const getJwt = async () => {
    if (isAuthenticated) {
      const token = await getIdTokenClaims()
      return token.__raw;
    }
    return new Promise((_, __) => '');
  }

  const auth = {
    loginWithRedirect: loginWithRedirect,
    logout: logout,
    isAuthenticated: isAuthenticated,
    isReady: !isLoading,
    user: {
      id: user?.sub,
      name: user?.name,
      email: user?.email,
      jwt: getJwt,
    }
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default AuthConfigurations;
