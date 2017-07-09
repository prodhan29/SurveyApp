import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signin, signinSuccess } from '../GeneralActions/auth.action';
import { push, replace } from 'react-router-redux';
import Store from '../store';

class Login extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                username: '',
                password: '',
                auth_token: ''
            }
        }

        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        onEnter = (e) => {
            if(e.charCode === 13) {
                signin(this.state, this.proceedSignin);
            }
        }
        proceedSignin =(data)=> {

            this.state.auth_token = data.accessToken;
            this.state.roleName = data.roleName;
            this.props.signinSuccess(this.state);
            Store.dispatch(replace('/projects'));            
        }
        render() {
            return (
                <div className="login-content-wrapper">
                    <div className="form" >
                        <div className="login-header header-primary text-center">
                            <img src="styles/img/logo-login.png" />
                            <h4>Welcome to ZuZu</h4>
                            <p>Sign In to continue</p>
                        </div>
                        <div className="content">
                            <div className="input-group">
                                <label>User</label>
                                <input type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={this.handleChange}
                                    onKeyPress={this.onEnter}
                                />
                            </div>
                            <button className="btn btn-primary btn-round" onClick={()=> signin(this.state, this.proceedSignin)}>Sign In</button>
                            <p className="login-form-switcher"><a href="">Or Sign In with your Social ID</a></p>
                        </div>
                    </div>
                </div>
            );
        }
    }

function mapStateToProps(state) {
    return {
        user: state.User,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        signinSuccess
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);