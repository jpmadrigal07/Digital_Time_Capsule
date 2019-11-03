import React, { Component } from 'react';
import Login from './components/auth/Login';
import MyPosts from './components/MyPosts';
import AddPost from './components/AddPost';
import Editors from './components/Editors';
import AddEditor from './components/AddEditor';
import PendingPosts from './components/PendingPosts';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions/authActions';
import Loading from './components/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderComponent = (component, isExact, props) => {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      if(isExact) {
        return <MyPosts {...props} title="CCP - My Posts" />
      }
      return component
    } else if(this.props.auth.isLoading && !this.props.auth.user) {
      return <Loading {...props} title="Loading..." />
    } else {
      return <Login {...props} title="CCP - Login" />
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={(props) => this.renderComponent(<Login {...props} title="CCP - Login" />, true, props) } />
          <Route path="/my-posts" render={(props) => this.renderComponent(<MyPosts {...props} title="CCP - My Posts" />, false, props) } />
          <Route path="/add-post" render={(props) => this.renderComponent(<AddPost {...props} title="CCP - My Posts" />, false, props) } />
          <Route path="/editors" render={(props) => this.renderComponent(<Editors {...props} title="CCP - Editors" />, false, props) } />
          <Route path="/add-editor" render={(props) => this.renderComponent(<AddEditor {...props} title="CCP - Add Editor" />, false, props) } />
          <Route path="/pending-posts" render={(props) => this.renderComponent(<PendingPosts {...props} title="CCP - Pending Posts" />, false, props) } />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) { 
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
