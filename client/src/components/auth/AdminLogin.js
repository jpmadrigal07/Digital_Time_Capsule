import React, { Component } from 'react';
import {
  Form,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/authActions';

const formSignin = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: '15rem auto 0px'
};
const textDarkYellow = {
  color: '#b69535'
};

class AdminLogin extends Component {

  state = {
      username: '',
      password: ''
  };

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();

      const loginCredentials = {
          username: this.state.username,
          password: this.state.password
      };

      // Add item via addItem action
      this.props.loginAdmin(loginCredentials);
  };

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#1a1a1a';
  }

  render() {
    return (
        
        <Container>
          <Form style={formSignin} onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-white text-center">Admin Login</h1>
            <input type="text" name="username" className="form-control mb-2" placeholder="Username" onChange={this.onChange} required autoFocus />
            <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={this.onChange} required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-center" style={textDarkYellow}>&copy; 2019-2020</p>
          </Form>
        </Container>
    );
  }
}

export default connect(
  null,
  { loginAdmin }
)(AdminLogin);
