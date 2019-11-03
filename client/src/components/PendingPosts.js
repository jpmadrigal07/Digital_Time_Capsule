import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavBar from './partials/MainNavBar';
import PageNotFound from './PageNotFound';
import PendingPostsContent from './content/PendingPosts';

class PendingPosts extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      if(this.props.auth.user.role === "User") {
        return <PageNotFound />
      } else {
        return <PendingPostsContent />
      }
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

export default connect(mapStateToProps)(PendingPosts);
