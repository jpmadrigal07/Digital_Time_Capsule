import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavBar from './partials/MainNavBar';
import AddPostContent from './content/AddPost';

class AddPost extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      return <AddPostContent />
    } else {
      return <h3 className="text-center" href="#">...</h3>
    }
  }


  render() {
    return (
      <div>
        <MainNavBar {...this.props} />
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) { 
  return { auth };
}

export default connect(mapStateToProps)(AddPost);
