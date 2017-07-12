"use strict";

import React, { PropTypes } from 'react';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import signup from '../actions/signupActions';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: { 
                email: '', 
                password: '', 
                confirmPassword: '', 
                username: '' 
            },
            errors:{},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        return this.setState({ user: user });
    }

    onSave(event) {
        event.preventDefault();
        this.props.signup(this.state.user)
        .then(() => {
            browserHistory.push(`/`);
        }, (err) => {
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
            <div className="wrapper col-md-4 col-md-offset-4">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Sign Up</h2>
                    {errors && errors.msg && <div className="alert alert-danger">{errors.msg}</div>}
                    <TextInput
                        name="username"
                        label="User Name"
                        type="text"
                        value={this.state.user.username}
                        placeholder="User Name"
                        error={errors.username && errors.username.msg}
                        onChange={this.onChange} />

                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        value={this.state.user.email}
                        placeholder="Eg rob@gmail.com"
                        error={errors.email && errors.email.msg}
                        onChange={this.onChange} />

                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.user.password}
                        placeholder="Password"
                        error={errors.password && errors.password.msg}
                        onChange={this.onChange} />

                    <TextInput
                        name="confirmPassword"
                        label="confirmPassword"
                        type="password"
                        value={this.state.user.confirmPassword}
                        placeholder="Confirm Password"
                        error={errors.confirmPassword && errors.confirmPassword.msg}
                        onChange={this.onChange} />

                    <input
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onSave} />
                    {" "}
                    
                    <div className="signin-link">
                        <Link to="signin">Sign In</Link>
                    </div>

                </form>
            </div>
        );
    }
}

export default connect(null, { signup })(SignUpPage);
