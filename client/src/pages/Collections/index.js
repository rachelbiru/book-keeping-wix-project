import React, { useEffect, useState } from "react";
import * as style from "./Collections.module.scss";
import { getBookCoverByOLID } from "../../BooksApi";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import { ButtonBase } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    width: "40%",
    maxHeight: "40%",
    paddingTop: '56.25%', // 16:9
  },
}));

export const Collections = ({ collectionsArr, deleteBook, addNewCollection, deleteCollection, editCollection }) => {
  const [spacing, setSpacing] = React.useState(2);
  const [newCollectionName, setNewCollectionName] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [indexColl, setIndexColl] = useState(Number)

  const classes = useStyles();


  return (

    <Grid container className={classes.root} spacing={2}>
      <Input type="text" onChange={(e) => { setNewCollectionName(e.target.value) }} />
      {isUpdate ?
        <ButtonBase onClick={() => { editCollection(newCollectionName, indexColl) }}>UPdate</ButtonBase> :
        <ButtonBase onClick={() => { addNewCollection(newCollectionName) }} >ADD Collections</ButtonBase>}

      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {collectionsArr.map((collection, collectionIndex) => (
            <Grid key={collectionIndex} item>
              <i class="fas fa-backspace" onClick={() => { deleteCollection(collectionIndex) }}></i>
              <i class="fas fa-edit" onClick={() => {
                setIndexColl(collectionIndex)
                setIsUpdate(true)
              }}></i>
              {collection.name}
              {collection.books.map((book, bookIndex) => (
                <Paper key={bookIndex} className={classes.paper}>
                  <i class="far fa-trash-alt" onClick={() => { deleteBook(collectionIndex, bookIndex) }}></i>
                  <p>{book.title}</p>
                  <CardMedia
                    className={classes.media}
                    image={getBookCoverByOLID(book.cover_edition_key)}
                    alt="book image"
                  />
                </Paper>

              ))}

            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

