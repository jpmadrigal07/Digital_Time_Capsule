import React, { Component } from 'react';
import {
  Form,
  NavLink,
  Container
} from 'reactstrap';

const formSignin = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: '15rem auto 0px'
};
const textDarkYellow = {
  color: '#b69535'
};

class Login extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#1a1a1a';
  }

  render() {
    return (
        <Container>
          <Form style={formSignin}>
              <h1 className="h3 mb-3 font-weight-normal text-white text-center">Please sign in using Google or Facebook</h1>
              <NavLink className="btn btn-lg btn-danger btn-block" href="/auth/google">Sign in with Google</NavLink>
              <NavLink className="btn btn-lg btn-primary btn-block" href="/auth/facebook">Sign in with Facebook</NavLink>
              <p className="mt-5 mb-3 text-center" style={textDarkYellow}>&copy; 2019-2020</p>
          </Form>
        </Container>
    );
  }
}

export default Login;
