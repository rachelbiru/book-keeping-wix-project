import React, { useState } from "react";
import { searchBooks } from "../../BooksApi";
import { BookCard } from "../BookCard";

import * as style from "./BooksSearch.module.scss";

export const BooksSearch = ({ collections, addBookToCollection }) => {

  const [book, setBook] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooksByName = () => {
    setLoading(true)
    searchBooks(book)
      .then((res) => {
        setLoading(false)
        setBooks(res.docs);
      })
      .catch(() => { console.log('some error') })
  }

  return (
    <section>
      <h1>Search books</h1>
      <input type="search" onChange={(e) => setBook(e.target.value)} />
      <button onClick={() => { searchBooksByName() }}>search</button>
      <div>
        {loading ? <  img className={style.loadingImg} src="loading-icon-animated-gif-19.jpg" alt="loading_gif" /> : ''}
      </div>
      <BookCard books={books} collections={collections} addToCollection={addBookToCollection} />

    </section>
  );
};
