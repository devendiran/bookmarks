"use strict";

import React from 'react';
import { connect } from 'react-redux';
import { fetchBookMarks, fetchBookMarksByTag } from '../actions/bookmarkActions';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            search: ''
        }
    }

    onChange(event) {
        const state = {};
        const field = event.target.name;
        state[field] = event.target.value;
        return this.setState(state);
    }
    
    onClick() {
        this.props.fetchBookMarksByTag(this.state.search)
    }

    render() {
        return (<div className="search-field" id="searchform">
            <input type="text" id="searchterm" name="search" placeholder="Search By Tag" onChange={this.onChange}/>
            <button type="button" id="search" className="btn-primary" onClick={this.onClick}>Search</button>
        </div>);
    }
}

export default connect(null, {
    fetchBookMarks,
    fetchBookMarksByTag
})(SearchBox);
