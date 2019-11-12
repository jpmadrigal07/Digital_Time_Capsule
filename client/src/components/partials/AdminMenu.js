import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminMenu extends Component {

  renderMyPost() {
    if(this.props.location.pathname === "/" || this.props.location.pathname === "/login" || this.props.location.pathname === "/my-posts") {
      return <Link className="nav-link active" to="/my-posts">My Posts</Link>
    } else {
      return <Link className="nav-link" to="/my-posts">My Posts</Link>
    }
  }

  render() {
    return (
      <div>
        <div className="nav-scroller bg-white box-shadow">
            <div className="container">
              <nav className="nav nav-underline">
                { this.renderMyPost() }
                { this.props.location.pathname === "/add-post" ? <Link className="nav-link active" to="/add-post">Add Post</Link> : <Link className="nav-link" to="/add-post">Add Post</Link> }
                { this.props.location.pathname === "/editors" ? <Link className="nav-link active" to="/editors">Editors</Link> : <Link className="nav-link" to="/editors">Editors</Link> }
                { this.props.location.pathname === "/add-editor" ? <Link className="nav-link active" to="/add-editor">Add Editor</Link> : <Link className="nav-link" to="/add-editor">Add Editor</Link> }
                { this.props.location.pathname === "/users-posts" ? <Link className="nav-link active" to="/users-posts">Users Posts</Link> : <Link className="nav-link" to="/users-posts">Users Posts</Link> }
              </nav>
            </div>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
