"use strict";

import React from 'react';
const BookMark = (props) => {
    const { url, title } = props.item;
    const tags = props.item.tags.slice().join(',');
    const data = formatDate(props.item.createdAt);

    return (<div className="list-group">
        <div className="list-group-item">
            <h3 className="list-group-item-heading">{title}
            <span className="glyphicon glyphicon-trash pull-right font-13 m-r-2 cursor-pointer" onClick={() => props.deleteBookMark(props.item)}></span>
            <span className="glyphicon glyphicon-pencil pull-right font-13 m-r-2 cursor-pointer" onClick={() => props.editBookMark(props.item)}></span>

            </h3>
            <a href={url}>{url}</a>
            <p>Tags: <small>{tags}</small></p>
            <p>Created At: {data}</p>
        </div>
    </div>);
}

//Move to utils
const formatDate = (d) => {
    d = new Date(d);
    const dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

     return dformat;
}

export default BookMark;