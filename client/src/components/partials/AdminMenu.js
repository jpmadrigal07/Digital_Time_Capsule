import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

class AdminMenu extends Component {

  renderMyPost() {
    if(this.props.location.pathname === "/" || this.props.location.pathname === "/login" || this.props.location.pathname === "/my-posts") {
      return <Link className="nav-link active" to="/my-posts"><FeatherIcon icon="menu" size="17" /> My Posts</Link>
    } else {
      return <Link className="nav-link" to="/my-posts"><FeatherIcon icon="menu" size="17" /> My Posts</Link>
    }
  }

  render() {
    return (
      <div>
        <div className="nav-scroller bg-white box-shadow" style={{position: 'fixed', width: '100%'}}>
            <div className="container">
              <nav className="nav nav-underline">
                { this.renderMyPost() }
                { this.props.location.pathname === "/add-post" ? <Link className="nav-link active" to="/add-post"><FeatherIcon icon="plus-circle" size="17" /> Add Post</Link> : <Link className="nav-link" to="/add-post"><FeatherIcon icon="plus-circle" size="17" />  Add Post</Link> }
                { this.props.location.pathname === "/editors" ? <Link className="nav-link active" to="/editors"><FeatherIcon icon="edit" size="17" /> Editors</Link> : <Link className="nav-link" to="/editors"><FeatherIcon icon="edit" size="17" /> Editors</Link> }
                { this.props.location.pathname === "/add-editor" ? <Link className="nav-link active" to="/add-editor"><FeatherIcon icon="plus-circle" size="17" /> Add Editor</Link> : <Link className="nav-link" to="/add-editor"><FeatherIcon icon="plus-circle" size="17" /> Add Editor</Link> }
                { this.props.location.pathname === "/users-posts" ? <Link className="nav-link active" to="/users-posts"><FeatherIcon icon="menu" size="17" /> Users Posts</Link> : <Link className="nav-link" to="/users-posts"><FeatherIcon icon="menu" size="17" /> Users Posts</Link> }
              </nav>
            </div>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
