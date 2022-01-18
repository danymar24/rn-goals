import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';

import Dashboard from './pages/Dashboard';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'https://us-central1-bbred-b99f1.cloudfunctions.net/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})



export default function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

