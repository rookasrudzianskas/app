// @ts-nocheck
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar} from "expo-status-bar";
import {gql, useQuery} from "@apollo/client";
import {ActivityIndicator, FlatList} from "react-native";
import BookItem from "../components/BookItem";

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
      <View className="flex-1 bg-white pt-12">
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
