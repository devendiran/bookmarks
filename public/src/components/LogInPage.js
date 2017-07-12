"use strict";

import React, { PropTypes } from 'react';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login } from '../actions/authActions';

class LogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(event) {
        const credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;
        return this.setState({ credentials: credentials });
    }

    onSave(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        this.props.login(this.state.credentials)
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

                <form className="form-signin" onSubmit={this.onSave}>
                    <h2 className="form-signin-heading">Sign In</h2>
                    {errors && errors.msg && <div className="alert alert-danger">{errors.msg}</div>}
                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        value={this.state.credentials.email}
                        error={errors.email && errors.email.msg}
                        placeholder="Eg rob@gmail.com"
                        onChange={this.onChange} />

                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.credentials.password}
                        placeholder="Password"
                        error={errors.password && errors.password.msg}
                        onChange={this.onChange} />

                    <input
                        type="submit"
                        className="btn btn-lg btn-primary btn-block" />
                    {" "}
                    <div className="signup-link">
                        <Link to="signup">Sign Up</Link>
                    </div>

                </form>
            </div>
        );
    }
}

export default connect(null, { login })(LogInPage);
