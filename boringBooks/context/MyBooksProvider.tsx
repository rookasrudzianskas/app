import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    onToggleSaved: (book: Book) => void;
    savedBooks: Book[];
};

type Props = {
    children: React.ReactNode;
};

const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    onToggleSaved: () => {},
    savedBooks: [],
});


const MyBooksProvider = ({ children }: Props) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadData();
    }, []); // load the data, then component mounts

    useEffect(() => {
        if (loaded) {
            persistData();
        }
    }, [savedBooks]);

    const areBooksTheSame = (a: Book, b: Book) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    const isBookSaved = (book: Book) => {
        // Better to implement stringified objects to be sure compared by the value, not the objects reference
        return savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
    }

    const onToggleSaved = (book: Book) => {
        if (isBookSaved(book)) {
            // From the books we already have in state, we are going to filter the ones which are not the current book (pressed one);
            // This filters out the book from the savedBooks array
            setSavedBooks((books) => books.filter((savedBooks) => !areBooksTheSame(savedBooks, book)));
        } else {
            setSavedBooks((books) => [book, ...books]);
        }
    }

    const persistData = async () => {
        await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
    }

    const loadData = async () => {
        const dataString = await AsyncStorage.getItem("booksData");
        if(dataString) {
            const items = JSON.parse(dataString);
            setSavedBooks(items);
        }
        setLoaded(true);
    }

    return (
        // @ts-ignore
        <MyBooksContext.Provider value={{ isBookSaved, onToggleSaved, savedBooks }}>
            {children}
        </MyBooksContext.Provider>
    )
}

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
