"use strict";

import React from 'react';
const BookMark = (props) => {
    const { url, title } = props.item;
    const tags = props.item.tags.slice().join(',');
    return (<div className="list-group">
        <div className="list-group-item">
            <h3 className="list-group-item-heading">{title}
            <span className="glyphicon glyphicon-trash pull-right font-13 m-r-2" onClick={() => props.deleteBookMark(props.item)}></span>
            <span className="glyphicon glyphicon-pencil pull-right font-13 m-r-2" onClick={() => props.editBookMark(props.item)}></span>

            </h3>
            <a href={url}>{url}</a>
            <p>Tags: <small>{tags}</small></p>
        </div>
    </div>);
}

export default BookMark;