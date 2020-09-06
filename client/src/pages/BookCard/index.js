import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import * as style from './BookCard.module.scss'



import { getBookCoverByOLID } from "../../BooksApi";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 130,
        maxHeight: 200,
        padding: 0,
        margin: "20px 8px auto",
        boxShadow: "1px 1px 5px",
        transition: "all 1s",
        padding: "5px",
        display: "inline-block",
        '&:hover': {
            boxShadow: "3px 3px 3px",
            transform: "scale(1.05)",
            cursor: "pointer",
        }

    },
    title: {
        textAlign: "left",
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

export const BookCard = ({ books }) => {

    const red = "#ff0000";
    const gray = "#808080";

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [color, setColor] = useState(gray);
    const [isChecked, setIsChecked] = useState();


    const favBook = localStorage.hasOwnProperty('favArr')
        ? JSON.parse(localStorage.getItem('favArr'))
        : []


    useEffect(() => {
        var currentColor = localStorage.getItem('isFav');
        setColor(currentColor)

        var isChecked = localStorage.getItem('readied');
        setIsChecked(isChecked)

    })

    const addRemoveFavBook = (book, index) => {
        if (color === red) {
            favBook.push(book)
            localStorage.setItem("favArr", JSON.stringify(favBook))

        } else {
            favBook.splice(index, 1)
            localStorage.setItem("favArr", JSON.stringify(favBook))
        }

        changeColor();
    }

    const changeColor = () => {
        const newColor = color === gray ? red : gray;
        setColor(newColor);
        localStorage.setItem("isFav", newColor)
        return false;
    }

    const checkBoxHandler = (e) => {
        localStorage.setItem('readied', e.target.checked)
    }


    const handleExpandClick = (e) => {
        e.preventDefault()
        setExpanded(!expanded);
    };
    return (
        <div className={style.showBooks}>
            {books.map((book, index) => (
                <Card key={index} className={classes.root} >

                    <Typography className={classes.title} variant="body2" component="h4">
                        {book.title}
                    </Typography>
                    <p className={style.author_name}>Publish Year: {book.first_publish_year}</p>

                    <CardMedia
                        className={classes.media}
                        image={getBookCoverByOLID(book.cover_edition_key)}
                        alt="book image"
                    />
                    <p className={style.author_name}>Author Name: {book.author_name}</p>



                    <CardActions className={style.icons} disableSpacing>

                        <IconButton onClick={() => { addRemoveFavBook(book, index) }} aria-label="add to favorites">
                            <FavoriteIcon style={{ color: color }} />
                        </IconButton>

                        <Checkbox
                            defaultChecked={isChecked}
                            onClick={() => checkBoxHandler}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />

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