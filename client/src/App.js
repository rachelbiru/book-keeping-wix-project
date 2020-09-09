import React, { useEffect } from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import { Collections } from './pages/Collections'
import { BooksSearch } from "./pages/BooksSearch";
import { Header } from "./components/Header";

const App = () => {
  const [favBooks, setFavBooks] = React.useState([]);
  const [collections, setCollections] = React.useState([]);

  let collectionState;

  useEffect(() => {
    collectionState = [
      { id: 0, name: "favorite", books: [] },
      { id: 1, name: "read", books: [] },
      { id: 2, name: "donate", books: [] }
    ]
    setCollections(collectionState);
  }, []);


  const addToCollection = (collection, book) => {
    const tmp = [...collections]
    const bookIndex = tmp.findIndex(collec => { return collec.id === collection.id; })
    if (bookIndex !== -1) {
      tmp[collection.id].books.push(book)
      setCollections(tmp);

    }
  }

  const deleteBook = (i, index) => {
    let tmp = [...collections]
    tmp[i].books.splice(index, 1);
    setCollections(tmp);
  }

  const addNewCollection = (name) => {
    let id;

    if (collections.length === 0) {
      // collection Array is empty
      id = 0
    } else {
      // collection Array is NOT empty
      id = collections[collections.length - 1].id + 1
    }
    const newCollection = { id: id, name: name, books: [] }

    let tmp = [...collections]
    tmp.push(newCollection)
    setCollections(tmp)
  }

  const deleteCollection = (index) => {
    let tmp = [...collections]
    tmp.splice(index, 1);
    setCollections(tmp)
  }

  const editCollection = (name, index) => {
    let tmp = [...collections]
    const bookIndex = tmp.findIndex(collection => { return collection.id === index });
    if (bookIndex !== -1) {

      tmp[index].name = name;
      setCollections(tmp)

    }

  }


  return (
    <div className={style.app}>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/search"
            render={(props) => (
              <BooksSearch collections={collections} addToCollection={addToCollection} />
            )}
          />
          <Route
            exact
            path="/collections"
            render={(props) => (
              <Collections
                collectionsArr={collections}
                deleteBook={deleteBook}
                addNewCollection={addNewCollection}
                deleteCollection={deleteCollection}
                editCollection={editCollection}
              />)}
          />
          <Route
            path="/"
            render={(props) => (
              <BooksSearch {...props} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
