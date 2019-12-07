import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
  } from 'reactstrap';
import { getPosts, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import SinglePost from '../partials/SinglePost';
import MessageWithIcon from '../partials/MessageWithIcon';
import LoadingSpinner from '../partials/LoadingSpinner';

class MyPosts extends Component {

    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getPosts(this.props.auth.user._id);
    };

    state = {
        modal: false,
        message: '',
        postId: '',
        postCount: 0
    };

    toggle = (message, postId, postCount) => {
        this.setState({
          modal: !this.state.modal,
          message: message,
          postId: postId,
          postCount: postCount
        });
    };   

    onDeleteClick = id => {
        this.props.deletePost(id);
    };

    renderPosts() {
        if(!this.props.post.loading && this.props.post.posts.length > 0) {
            const { posts } = this.props.post;
            return  <div>
                        {posts.map((post, index) => (
                            <div key={post._id} className="my-3 p-3 bg-white rounded box-shadow">
                                <SinglePost user={this.props.auth.user} post={post} type={'Uploaded'} />
                                {typeof post.approvedAt !== 'undefined' ? <span className="badge badge-success" style={{marginBottom: '10px'}}>Approved</span> : <span className="badge badge-warning" style={{marginBottom: '10px'}}>Pending</span>}
                                <button className="btn btn-danger btn-block" onClick={() => this.toggle('Are you sure you want to delete this?', post._id, posts.length)}>Delete</button>
                            </div>
                        ))}
                    </div>
        } else if(!this.props.post.loading && this.props.post.posts.length === 0) {
            return <MessageWithIcon icon={'alert-circle'} logoColor={'text-danger'} message={'No record to display.'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderModalBody() {
        if(this.props.post.posts.length === this.state.postCount && !this.props.post.loading) {
            return this.state.message
        } else if(this.props.post.posts.length !== this.state.postCount && !this.props.post.loading) {
            return <MessageWithIcon icon={'check-circle'} logoColor={'text-success'} message={'Deleted successful!'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderModalFooter() {
        return  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggle('Are you sure you want to delete this?', this.state.postId._id, this.state.postCount)}>Close</Button>{' '}
                    <Button color="danger" onClick={() => this.onDeleteClick(this.state.postId)}>Yes</Button>
                </ModalFooter>
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <main role="main" className="container">
                    {this.renderPosts()}
                </main>

                <Modal size="sm" isOpen={this.state.modal} toggle={this.toggle.bind(this, this.state.message)}>
                    <ModalHeader toggle={this.toggle.bind(this, this.state.message)}>Message</ModalHeader>
                    <ModalBody>
                        {this.renderModalBody()}
                    </ModalBody>
                    {this.props.post.posts.length === this.state.postCount ? this.renderModalFooter() : '' }
                </Modal>
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
  { getPosts, deletePost }
)(MyPosts);

