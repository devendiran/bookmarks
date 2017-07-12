"use strict";

import React from 'react';
import BookMark from './BookMark';
import SearchBox from './SearchBox';
import { connect } from 'react-redux';
import { fetchBookMarks, deleteBookMark } from '../actions/bookmarkActions';
import BookMarkDialog from './BookMarkDialog';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this.toggleDialog = this.toggleDialog.bind(this);
        this.editBookMark = this.editBookMark.bind(this);
        this.removeBookMark = this.removeBookMark.bind(this);
        
    }

    componentWillMount() {
        this.props.fetchBookMarks();
    }

    toggleDialog() {
        this.setState({
            showDialog: !this.state.showDialog,
            selectedBookMark:{}
        });
    }

    editBookMark(bookmark) {
        this.setState({
            showDialog: !this.state.showDialog,
            selectedBookMark: bookmark
        });
    }

    removeBookMark(bookmark) {
        bookmark.isDeleted = !bookmark.isDeleted;
        this.props.deleteBookMark(bookmark);
    }

    render() {
        let bookmarks = this.props.bookMarks.map((item) => {
            return <BookMark item={item} editBookMark={this.editBookMark} key={item._id} deleteBookMark={this.removeBookMark}/>;
        });
        if (!bookmarks.length) {
            bookmarks = <h3>No BookMarks Available.Pls Click "Add BookMark" to Create New</h3>;
        }
        return (
            <div className="col-md-8 col-md-offset-2">
                <h2> 
                    BookMarks
                </h2>
                <div className="filter-container">
                    <SearchBox/>
                    <button type="button" className="btn btn-primary add-bookmark-btn" onClick={this.toggleDialog}>Add BookMark</button>
                </div>
                {bookmarks}
                {this.state.showDialog ? <BookMarkDialog toggleDialog={this.toggleDialog} bookmark={this.state.selectedBookMark} /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookMarks: state.bookmarks
    };
};

export default connect(mapStateToProps, {
    fetchBookMarks,
    deleteBookMark
})(Dashboard);
