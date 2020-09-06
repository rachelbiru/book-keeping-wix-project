import React, { useEffect, useState } from "react";
import * as style from "./Collections.module.scss";
import { getBookCoverByOLID } from "../../BooksApi";



export const Collections = () => {


  const favBooks = JSON.parse(localStorage.getItem("favArr"));

  const removeBookFromThisCollection = (index) => {
    favBooks.splice(index, 1);
    localStorage.setItem("favArr", JSON.stringify(favBooks))
    window.location.reload(false);

  }


  return (
    <section>
      <input type="text" />
      <button>Add Collection</button>
      <table class="table table-dark" >
        <thead>
          <tr>
            <th scope="col">First</th>
          </tr>
        </thead>
        <tbody>
          {favBooks.map((book, index) => (
            <tr key={index}>
              <td className={style.table}>
                <i onClick={() => { removeBookFromThisCollection(index) }} class="fas fa-trash-alt"></i>
                <p>title: {book.title}</p>
                <p>author: {book.author_name}</p>
                <img src={getBookCoverByOLID(book.cover_edition_key)} />
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </section>
  );
};
