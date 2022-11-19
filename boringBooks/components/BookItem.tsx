//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {useMyBooks} from "../context/MyBooksProvider";

type BookItemProps = {
    book: Book;
};

const BookItem = ({ book }: BookItemProps) => {
    const { onToggleSaved, isBookSaved } = useMyBooks();
    const saved = isBookSaved(book);

    return (
        <TouchableOpacity
            activeOpacity={0.7} className="mx-3" style={styles.container}>
            <Image source={{ uri: (book.image ? book.image : 'https://cdn.dribbble.com/users/4179244/screenshots/7430038/media/34d6717bbdde1e753889d3625fb16e29.gif') }} style={styles.image} />
            <View style={styles.contentContainer}>
                <View>
                    <Text className="text-xl" style={styles.title}>{book.title}</Text>
                    <Text className="italic font-extralight">by {book.authors?.join(", ")}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => onToggleSaved(book)}
                    activeOpacity={0.7} className={`${saved ? "bg-red-600/80" : "bg-green-600/80"} mt-4 max-w-[140px] py-2 px-3 rounded flex-row justify-between items-center`}>
                    <Text className="text-white font-semibold border-l">{saved ? "Remove" : "Down to Read"}</Text>
                    {saved ? (
                        <Entypo name="cross" size={18} color="white" />
                    ) : (
                        <Entypo name="chevron-down" size={18} color="white" />
                    )}
                </TouchableOpacity>
                <View className="flex-row items-center mt-4 mb-3">
                    <Text className="text-gray-600 italic mr-1">Rate this book</Text>
                    {Array(5).fill(0).map((_, index) => (
                        <Entypo key={index} name="star" size={14} color="gray" />
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
    },
    image: {
        flex: 1,
        aspectRatio: 2 / 3,
        marginRight: 10,
    },
    contentContainer: {
        flex: 4,
        borderColor: "lightgray",
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default BookItem;
