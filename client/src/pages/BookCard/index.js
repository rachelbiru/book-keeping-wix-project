import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import * as style from './BookCard.module.scss'
import Modal from '@material-ui/core/Modal';

import { getBookCoverByOLID } from "../../BooksApi";

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

    root: {
        maxWidth: "26%",
        padding: 0,
        margin: "20px 8px auto",
        boxShadow: "1px 1px 5px",
        transition: "all 1s",
        padding: "5px",
        '&:hover': {
            boxShadow: "3px 3px 3px",
            transform: "scale(1.05)",
            cursor: "pointer",
        }

    },
    title: {
        textAlign: "left",
        fontSize:"9px",
        fontWeight:400,
        minHeight:"45px",
        lineHeight:1,
    },

    media: {
        width: "100%",
        maxHeight: "40%",
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));




export const BookCard = ({ books, collections, addToCollection }) => {


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [favBook, setFavBook] = React.useState({});

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = (book) => {
        setOpen(true);
        setFavBook(book)
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    if(collections === undefined){
        return [];
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {collections.map((collection,i) => (
                <div key={i} onClick={()=>{addToCollection(collection, favBook)}}>
                    <h6 id="simple-modal-title">{collection.name}</h6>
                </div>

            ))}

        </div>
    );


    const handleExpandClick = (e) => {
        e.preventDefault()
        setExpanded(!expanded);
    };
    return (
        <div className={style.showBooks}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>


            {books.map((book, index) => (
                <Card key={index} className={classes.root} >

                    <Typography className={classes.title} variant="body2" component="h6">
                        {book.title}
                    </Typography>
                    <p className={style.author_name}>Publish Year: {book.first_publish_year}</p>

                    <CardMedia
                        className={classes.media}
                        image={getBookCoverByOLID(book.cover_edition_key)}
                        alt="book image"
                    />
                    <p className={style.author_name}>Author Name: {book.author_name}</p>

                    <CardActions className={style.cardMedia} disableSpacing>
                        <IconButton onClick={()=>{handleOpen(book)}}>
                            <AddIcon />
                        </IconButton>


                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}


        </div>
    );
};