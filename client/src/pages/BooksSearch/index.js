import React, { useState } from "react";
import { searchBooks } from "../../BooksApi";

import {  BookCard } from "../BookCard";




export const BooksSearch = () => {

  const [book, setBook] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);



  const searchBooksByName = () => {
    searchBooks(book)
      .then((res) => {
        setBooks(res.docs);
        console.log(res.docs)
      })
      .catch(() => { console.log('some error') })
  }

  return (
    <section>
      <h1>Search books</h1>
      <input type="search" onChange={(e) => setBook(e.target.value)} />
      <button onClick={() => { searchBooksByName() }}>search</button>

      <BookCard books={books}/>

    </section>
  );
};
