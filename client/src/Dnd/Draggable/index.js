import React from 'react';
import {PropTypes} from 'prop-types';


export const Draggable = ({ children , id, style})  => {

    const drag = (e) => {
        e.preventDefault();
         e.dataTransfer.setData('transfer', e.target.id)
    }

    const noAllowDrop = (e) => {
        e.stopPropagation();

    }


    return (
        <div id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop} style={style} >
            {children}

        </div>
    );
}


Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
}