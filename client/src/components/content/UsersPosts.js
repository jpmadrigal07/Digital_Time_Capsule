import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { getPosts, editPostStatus, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import SinglePost from '../partials/SinglePost';
import LoadingSpinner from '../partials/LoadingSpinner';
import MessageWithIcon from '../partials/MessageWithIcon';

class PendingPosts extends Component {

    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getPosts("All");
    };

    onChangeStatusClick = (id, status) => {
        this.props.editPostStatus(id, status);
    };

    renderPosts() {
        if(!this.props.post.loading && this.props.post.posts.length > 0) {
            const { posts } = this.props.post;
            return  <div>
                        {posts.map((post, index) => (
                            <div key={post._id} className="my-3 p-3 bg-white rounded box-shadow">
                                <SinglePost user={post.userId} post={post} type={'Uploaded'} />
                                {typeof post.approvedAt !== 'undefined' ? <span className="badge badge-success" style={{marginBottom: '10px'}}>Approved</span> : <span className="badge badge-warning" style={{marginBottom: '10px'}}>Pending</span>}
                                {this.renderAction(post._id, post.approvedAt, post.disapprovedAt)}
                            </div>
                        ))}
                    </div>
        } else if(!this.props.post.loading && this.props.post.posts.length === 0) {
            return <MessageWithIcon icon={'alert-circle'} logoColor={'text-danger'} message={'No record to display.'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderAction = (id, approved, disapproved) => {
        if(typeof approved !== 'undefined' && typeof disapproved === 'undefined') {
            return <button className="btn btn-warning btn-block" onClick={this.onChangeStatusClick.bind(this, id, "Disapprove")}>Mark as Pending</button>
        } else if(typeof approved === 'undefined' && typeof disapproved !== 'undefined') {
            return <button className="btn btn-success btn-block" onClick={this.onChangeStatusClick.bind(this, id, "Approve")}>Approve</button>
        } else {
            return <button className="btn btn-success btn-block" onClick={this.onChangeStatusClick.bind(this, id, "Approve")}>Approve</button>
        }
    };

    render() {
        return (
            <div>
                <main role="main" className="container">
                    {this.renderPosts()}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, editPostStatus, deletePost }
)(PendingPosts);

