// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MyBooksProvider from "./context/MyBooksProvider";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const API_KEY = "saltillo::stepzen.net+1000::c5e3ef401778df7e594c5ffa46283fea6ed840d5a4b5f489e81d8ced13cbe9bf";

  const client = new ApolloClient({
    // This is globally available in the browser
    uri: "https://saltillo.stepzen.net/api/left-llama/__graphql",
    headers: {
      Authorization: `Apikey ${API_KEY}`,
    },
    // This will cache the results of your queries in case you need to
    cache: new InMemoryCache(),
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <ApolloProvider client={client} >
            <MyBooksProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </MyBooksProvider>
          </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
