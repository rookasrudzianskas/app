import React, { createContext, useContext, useState } from "react";

type MyBooksContextType = {
    isBookSaved: (book: Book) => boolean;
    onToggleSaved: (book: Book) => void;
    savedBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
    isBookSaved: () => false,
    onToggleSaved: () => {},
    savedBooks: [],
})
