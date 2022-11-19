import {FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useMyBooks } from '../context/MyBooksProvider';
import BookItem from "../components/BookItem";

export default function MyBooks() {
  const {savedBooks} = useMyBooks();
  return (
    <View style={styles.container}>
      <FlatList
          data={savedBooks}
          renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
