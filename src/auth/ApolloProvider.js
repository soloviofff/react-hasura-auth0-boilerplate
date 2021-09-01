import React, { useEffect, useState } from 'react';

import { ApolloClient, ApolloProvider as BaseApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { AuthContext } from './AuthProvider';

import { getConfig } from "../config";
const config = getConfig();


const ApolloProvider = ({ children }) => {
  const auth = React.useContext(AuthContext);
  const [client, setClient] = useState(undefined)
 
  const createApolloClient = (authToken) => {
    return new ApolloClient({
      link: new WebSocketLink({
        uri: config.wssEndpoint,
        options: {
          reconnect: true,
          connectionParams: {
             headers: {
               Authorization: `Bearer ${authToken}`
             }
          }
        }
      }),
      cache: new InMemoryCache(),
    });
  };

  useEffect(() => {
    if (auth.isReady && auth.isAuthenticated) {
      auth.user.jwt().then(jwtToken => setClient(createApolloClient(jwtToken)));
    }
  }, [auth]);

  if (!client) {
    return <h1>Loading...</h1>
  }

  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
};

export default ApolloProvider;
