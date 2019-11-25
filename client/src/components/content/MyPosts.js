import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody
  } from 'reactstrap';
import { getPosts, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import moment from 'moment';

class MyPosts extends Component {

    state = {
        modal: false,
        message: ''
    };

    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    };

    toggle = message => {
        this.setState({
          modal: !this.state.modal,
          message: message
        });
    };   

    componentDidMount() {
        this.props.getPosts(this.props.auth.user._id);
    };

    onDeleteClick = id => {
        this.props.deletePost(id);
    };

    renderStatus = (approved, disapproved) => {
        if(typeof approved !== 'undefined' && typeof disapproved === 'undefined') {
            return <span>Approved</span>
        } else if(typeof approved === 'undefined' && typeof disapproved !== 'undefined') {
            return <span>Disapproved</span>
        } else {
            return <span>Pending</span>
        }
    };

    renderAction = (id, blockedAt) => {
        if(typeof blockedAt !== 'undefined') {
            return <a href="#" onClick={this.onChangeStatusClick.bind(this, id, "Unblock")}>Unblock</a>
        } else {
            return <a href="#" onClick={this.onChangeStatusClick.bind(this, id, "Block")}>Block</a>
        }
    };

    render() {
        const { posts } = this.props.post;
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Message</th>
                                        <th>Media</th>
                                        <th>Date</th>
                                        <th>Date Posted</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.reverse().map(({ _id, userId, message, mediaURL, dateYear, dateMonth, dateDay, approvedAt, disapprovedAt, createdAt }, index) => (
                                        <tr key={_id}>
                                            <td>{index+1}</td>
                                            <td>{userId.firstName} {userId.lastName}</td>
                                            <td><a href="javascript:void(0)" onClick={this.toggle.bind(this, message)}>View Message</a></td>
                                            <td><a target="_blank" href={mediaURL}>View Media</a></td>
                                            <td>{dateYear} {dateMonth} {dateDay}</td>
                                            <td>{moment(createdAt).format( 'MMM DD, YYYY hh:mm A')}</td>
                                            <td>{this.renderStatus(approvedAt, disapprovedAt)}</td>
                                            <td><a href="#" onClick={this.onDeleteClick.bind(this, _id)}>Delete</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this, this.state.message)}>
                    <ModalHeader toggle={this.toggle.bind(this, this.state.message)}>Message</ModalHeader>
                    <ModalBody>
                        <p>{this.state.message}</p>
                    </ModalBody>
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

