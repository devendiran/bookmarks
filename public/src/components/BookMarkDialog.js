"use strict";

import React from 'react';
import Dialog from './Dialog';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { createBookMark, updateBookMark } from '../actions/bookmarkActions';

class BookMarkDialog extends React.Component {
    constructor(props) {
        super(props);
        this.editMode = Object.keys(this.props.bookmark).length;

        let bookmark = {
            title: '',
            url: '',
            tags: ''
        };
        bookmark = Object.assign(bookmark, this.props.bookmark);
        bookmark.tags = this.editMode ? bookmark.tags.slice().join(',') : bookmark.tags;
        this.state = {
            bookmark,
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const bookmark = this.state.bookmark;
        bookmark[event.target.name] = event.target.value;
        return this.setState({ bookmark: bookmark });
    }

    onSave(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.props[this.editMode ? 'updateBookMark' : 'createBookMark'](this.state.bookmark)
            .then(this.props.toggleDialog, (err) => {
                if (err.response.data) {
                    if (typeof err.response.data.err === 'string') {
                        this.setState({ errors: err.response.data, isLoading: false });
                    } else {
                        this.setState({ errors: err.response.data.err, isLoading: false });
                    }
                }
            });
        return false;
    }

    render() {
        const { errors, email, password, isLoading } = this.state;

        return (
            <Dialog>
                <div className="wrapper min-wid-400">

                    <form className="form-signin" onSubmit={this.onSave}>
                        <h2 className="form-signin-heading">{this.editMode ? 'Update ' : 'Add '}BookMark</h2>
                        {errors && errors.msg && <div className="alert alert-danger">{errors.msg}</div>}
                        <TextInput
                            name="title"
                            label="Title"
                            type="text"
                            value={this.state.bookmark.title}
                            error={errors.title && errors.title.msg}
                            placeholder="Eg: Google API"
                            onChange={this.onChange} />

                        <TextInput
                            name="url"
                            label="Url"
                            type="text"
                            value={this.state.bookmark.url}
                            placeholder="http://google.com/api"
                            error={errors.url && errors.url.msg}
                            onChange={this.onChange} />

                        <TextInput
                            name="tags"
                            label="Tags"
                            type="text"
                            value={this.state.bookmark.tags}
                            placeholder="js, java"
                            error={errors.tags && errors.tags.msg}
                            onChange={this.onChange} />
                        <button
                            type="button"
                            className="btn pull-right" onClick={this.props.toggleDialog}>Cancel</button>
                        <button
                            type="submit"
                            className="btn btn-primary m-r-10 pull-right">Save</button>


                    </form>
                </div>
            </Dialog>
        );
    }
}
console.log(updateBookMark)
export default connect(null, {
    createBookMark,
    updateBookMark
})(BookMarkDialog);