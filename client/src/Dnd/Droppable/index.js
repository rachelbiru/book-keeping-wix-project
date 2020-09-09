import React from 'react';
import PropTypes from 'prop-types';


export const Droppable =  ({ children , id, style}) =>  {

    const drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer')
        // e.target.appendChild(document.getElementById(data))
        var s = document.createElement('div'); // is the node
        s.innerHTML = document.getElementById(data).innerHTML;
        document.getElementById('layer1').appendChild(s);
    }

    const allowDrop = (e) => {
        e.preventDefault();

    }


    return (
        <div id='layer1' onDrop={drop} onDragOver={allowDrop} style={style} >
            {children}

        </div>
    );
}


Droppable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
}