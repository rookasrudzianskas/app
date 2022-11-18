// @ts-nocheck
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar} from "expo-status-bar";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {ActivityIndicator, Button, FlatList, TextInput} from "react-native";
import BookItem from "../components/BookItem";
import {useState} from "react";

const query = gql`
    query SearchBooks($q: String) {
        googleBooksSearch(q: $q, country: "US") {
            items {
                id
                volumeInfo {
                    authors
                    averageRating
                    description
                    imageLinks {
                        thumbnail
                    }
                    title
                    subtitle
                    industryIdentifiers {
                        identifier
                        type
                    }
                }
            }
        }
        openLibrarySearch(q: $q) {
            docs {
                author_name
                title
                cover_edition_key
                isbn
            }
        }
    }
`;

const HomeScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
    const [search, setSearch] = useState('');
    const [runQuery, { data: dataFromText, loading: dataLoading, error: dataError }] = useLazyQuery(query);

    const { data, loading, error } = useQuery(query, {
        variables: {
            q: "React Native",
        }
    });




    if(loading) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    } else if(error) {
        return (
            <View className="h-screen items-center justify-center">
                <Text className="text-xl font-semibold text-red-500">{error.message}</Text>
            </View>
        )
    }

  return (
      <View className="flex-1 bg-white">
          <View className="flex-row px-4 pb-4 bg-gray-100 pt-16">
              <TextInput
                  className="flex-1 bg-gray-100 rounded-md border border-gray-300 py-2 px-4 mr-2"
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search..."
              />
              <Button
                  title="Search"
                  onPress={() => runQuery({ variables: { q: search } })}
              />
          </View>
        <FlatList
            data={data?.googleBooksSearch?.items || []}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <BookItem book={{
                    title: item?.volumeInfo?.title,
                    image: item?.volumeInfo?.imageLinks?.thumbnail,
                    authors: item?.volumeInfo?.authors,
                }} />
            )}
        />
        <StatusBar style="auto" />
      </View>
  );
}


export default HomeScreen;
