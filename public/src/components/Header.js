"use strict";

import React from 'react';
const Header = (props) => {
    return (<nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Book Marks</a>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><a href="/">Home</a></li>
            </ul>
            <button type="button" className="btn btn-default btn-sm pull-right" style={ {'margin-top': '10px'}} onClick={props.logout}>
                <span className="glyphicon glyphicon-log-out"></span> Log out
           </button>
        </div>
    </nav>);
}

export default Header;