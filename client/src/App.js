import React, { useEffect,useState } from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import { Collections } from './pages/Collections'
import { BooksSearch } from "./pages/BooksSearch";
import { Header } from "./components/Header";

const App = () => {
  const [collections, setCollections] = useState([]);

  let collectionState;
  useEffect(() => {
    collectionState = [
      { id: 0, name: "favorite", books: [] },
      { id: 1, name: "read", books: [] },
      { id: 2, name: "donate", books: [] }
    ]
    setCollections(collectionState);
  }, []);


  const addBookToCollection = (collection, i, book) => {
    let tmp = [...collections]
    const bookFind = tmp.find(collec => { return collec.id === collection.id; })

    if (bookFind !== undefined) {
      tmp[i].books.push(book)
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

    if (!collections.length) {
      // collection Array is empty
      id = 0
    } else {
      // collection Array is NOT empty
      id = collections[collections.length - 1].id + 1
    }
    const newCollection = { id, name, books: [] }

    let tmp = [...collections]
    tmp.push(newCollection)
    setCollections(tmp);
  }

  const deleteCollection = (index) => {
    let tmp = [...collections]
    tmp.splice(index, 1);
    setCollections(tmp)
  }

  const editCollection = (name, coll, i) => {
    let tmp = [...collections]
    const collec = tmp.find(collection => { return collection.id === coll.id });
    if (collec !== undefined) {
      tmp[i].name = name;
      setCollections(tmp)
    }
  }

  const sendList = (list) => {
    return setCollections(list)
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
              <BooksSearch collections={collections} addBookToCollection={addBookToCollection} />
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
                sendList={sendList}
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
