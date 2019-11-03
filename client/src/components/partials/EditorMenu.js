import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditorMenu extends Component {

  render() {
    return (
      <div>
        <div className="nav-scroller bg-white box-shadow">
            <div className="container">
              <nav className="nav nav-underline">
                { this.props.location.pathname === "/my-posts" ? <Link className="nav-link active" to="/my-posts">My Posts</Link> : <Link className="nav-link" to="/my-posts">My Posts</Link> }
                { this.props.location.pathname === "/add-post" ? <Link className="nav-link active" to="/add-post">Add Post</Link> : <Link className="nav-link" to="/add-post">Add Post</Link> }
                { this.props.location.pathname === "/pending-posts" ? <Link className="nav-link active" to="/pending-posts">Pending Posts</Link> : <Link className="nav-link" to="/pending-posts">Pending Posts</Link> }
              </nav>
            </div>
        </div>
      </div>
    );
  }
}

export default EditorMenu;
