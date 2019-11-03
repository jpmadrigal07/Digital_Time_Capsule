import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavBar from './partials/MainNavBar';

class MyPosts extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      return <h3 className="text-center" style={{margin: '15rem auto 0px'}}>My Posts</h3>
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

export default connect(mapStateToProps)(MyPosts);
