import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEY } from 'react-native-dotenv'; 

const httpLink = createHttpLink({
  uri: 'http://192.168.0.105:4500/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const storedField = await SecureStore.getItemAsync(SECURE_STORE_KEY);
  const jsonToken = JSON.parse(storedField);
  const token = jsonToken ? jsonToken.token : null;
  console.log('token: ', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});