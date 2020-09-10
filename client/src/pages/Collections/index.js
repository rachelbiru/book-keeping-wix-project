import React, { useState, useRef, useReducer, useEffect } from "react";
import Input from '@material-ui/core/Input';
import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getBookCoverByOLID } from "../../BooksApi";

import './index.css'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export const Collections = ({ collectionsArr, deleteBook, addNewCollection, deleteCollection, editCollection, sendList }) => {
  const [list, setList] = useState(collectionsArr);
  const [newCollectionName, setNewCollectionName] = useState()

  const [dragging, setDragging] = useState(false);
  const [collEdit, setCollEdit] = useState()
  const [collIndex, setCollIndex] = useState(Number)

  const dragBook = useRef();
  const dragNode = useRef();


  useEffect(()=>{
    setList(collectionsArr)
  }, [])


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
        dragBook.current = params;
        sendList(newList)
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

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <input type="text" onChange={(e) => setNewCollectionName(e.target.value)} />
      <button onClick={() => {
        editCollection(newCollectionName, collEdit, collIndex);
        handleClose();
        setList(collectionsArr)
      }}>Edit Collection</button>
    </div>
  );


  return (
    <div>
      <div style={{ margin: "10px" }}>
        <Input type="text" onChange={(e) => {setNewCollectionName(e.target.value);}} />
        <ButtonBase
          style={{ border: "1px solid black" }}
          onClick={() => {
            addNewCollection(newCollectionName); 
          }} >ADD Collections</ButtonBase>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
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
                <i className="fas fa-backspace" onClick={() => {deleteCollection(indexColl);}}></i>
                <br></br>
                <i className="fas fa-edit" onClick={() => {
                  setCollEdit(collection);
                  setCollIndex(indexColl)
                  handleOpen()
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
                  <i className="far fa-trash-alt" onClick={() => {deleteBook(indexColl, indexBook)}}></i>
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

