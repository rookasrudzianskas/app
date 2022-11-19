import React, { createContext, useContext, useState } from "react";

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

    const isBookSaved = (book: Book) => {
        return savedBooks.some((savedBook) => JSON.stringify(savedBook) === JSON.stringify(book));
    }

    const onToggleSaved = (book: Book) => {
        if (isBookSaved(book)) {
            // This filters out the book from the savedBooks array
            setSavedBooks((books) => books.filter((item) => item !== book));
        } else {
            setSavedBooks((books) => [book, ...books]);
        }
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
