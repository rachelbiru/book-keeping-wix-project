import React, { useState, useRef, useEffect } from "react";
// import * as style from "./Collections.module.scss";
import { getBookCoverByOLID } from "../../BooksApi";

import Input from '@material-ui/core/Input';
import { ButtonBase } from '@material-ui/core';

import './index.css'

export const Collections = ({ collectionsArr, deleteBook, addNewCollection, deleteCollection, editCollection }) => {
  const [list, setList] = useState(collectionsArr);
  const [newCollectionName, setNewCollectionName] = useState()
  const [dragging, setDragging] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [collIndex, setCollIndex] = useState(Number)

  useEffect(()=>{
    setList(list)
  })



  const dragBook = useRef();
  const dragNode = useRef();


  const handleDragStart = (e, params) => {
    console.log('drag starting ...', params);
    dragBook.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true);
    }, 0);

  }

  const handleDragEnter = (e, params) => {
    console.log('Entering drag', params);

    const currentBook = dragBook.current;
    if (e.target !== dragNode.current) {
      console.log('TARGET IS NOT THE SAME')
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.indexColl].books.splice(params.indexBook, 0, newList[currentBook.indexColl].books.splice(currentBook.indexBook, 1)[0]);
        dragBook.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    console.log('Ending drag');
    setDragging(false)
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragBook.current = null;
    dragNode.current = null;

  }

  const getStyles = (params) => {
    const currentBook = dragBook.current;
    if (currentBook.indexColl === params.indexColl && currentBook.indexBook === params.indexBook) {
      return 'current dnd-item'

    }
    return 'dnd-item'
  }


  return (
    <div>
      <div>
        <Input type="text" onChange={(e) => { setNewCollectionName(e.target.value) }} />
        {isUpdate ?
          <ButtonBase onClick={() => { editCollection(newCollectionName, collIndex) }}>UPdate</ButtonBase> :
          <ButtonBase onClick={() => { addNewCollection(newCollectionName) }} >ADD Collections</ButtonBase>}
      </div>
      <header className="header">


        <div className="drag-n-drop">
          {list.map((collection, indexColl) => (
            <div
              key={indexColl}
              className="dnd-group"
              onDragEnter={dragging && !collection.books.length ? (e) => { handleDragEnter(e, { indexColl, indexBook: 0 }) } : null}
            >

              <div className="group-title">
                <i class="fas fa-backspace" onClick={() => { deleteCollection(indexColl) }}></i>
                <i class="fas fa-edit" onClick={() => {
                  setCollIndex(indexColl)
                  setIsUpdate(true)
                }}></i>
                {collection.name}
              </div>


              {collection.books.map((book, indexBook) => (
                <div
                  draggable
                  onDragStart={(e) => { handleDragStart(e, { indexColl, indexBook }) }}
                  onDragEnter={dragging ? (e) => { handleDragEnter(e, { indexColl, indexBook }) } : null}
                  key={indexBook}
                  className={dragging ? getStyles({ indexColl, indexBook }) : "dnd-item"}
                >
                  <i class="far fa-trash-alt" onClick={() => { deleteBook(indexColl, indexBook) }}></i>
                  <h6>{book.title}</h6>
                  <p className="p">Publish Year: {book.first_publish_year}</p>

                  <img className="img" src={getBookCoverByOLID(book.cover_edition_key)} alt="bookImage" />

                  <p>Author Name: {book.author_name}</p>
                </div>

              ))}

            </div>
          ))}
        </div>
      </header>
    </div>

  );
}

