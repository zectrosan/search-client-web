import React from 'react';
import './LoginPage.css';
import * as auth from '../service/auth';
import qs from 'query-string';
import { Alert } from 'reactstrap';

export default class LoginPage extends React.Component {

  state = {
    username: '',
    password: '',
    error: null,
    pending: false
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onLoginFormSubmit = (e) => {
    e.preventDefault();

    const query = qs.parse(this.props.location.search);
    const target = query.target || '/';

    this.setState({
      pending: true,
      error: null
    })

    auth.login(this.state.username, this.state.password)
      .then(() => this.props.history.push(target))
      .catch(err => {
        console.log(err);

        let error = 'Unknown error';

        if (err.code === 401) {
          error = 'Invalid username or password';
        }

        if (error.code === 500) {
          error = 'Internal server error';
        }

        this.setState({
          error
        });
      })
      .finally(() => this.setState({
        pending: false
      }));

  }

  render() {
    const { username, password, error, pending } = this.state;
    return (
      <div className="page loginPage">
        <form  onSubmit={this.onLoginFormSubmit} class="form-signin">
          {error &&
          <Alert color="danger">
            {error}
          </Alert>}
          <h1 class="h3 text-center mb-3 font-weight-normal">Sign in</h1>
          <label class="sr-only">Email address</label>
          <input value={username} onChange={this.onFieldChange} name="username" type="text" class="form-control" placeholder="Username" required autofocus />
          <label for="inputPassword" class="sr-only">Password</label>
          <input value={password} onChange={this.onFieldChange} name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
          {/* <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
          {pending ? 
          <button disabled class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fa fa-spin fa-circle-notch"></i> Signing in
          </button>
          : <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>}
        </form>
      </div>);
  }

}

