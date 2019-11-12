import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEditors, editEditorStatus } from '../../actions/editorActions';
import moment from 'moment';
import PropTypes from 'prop-types';

class Editors extends Component {

    static propTypes = {
        getEditors: PropTypes.func.isRequired,
        editor: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getEditors();
    }

    onChangeStatusClick = (id, status) => {
        this.props.editEditorStatus(id, status);
    };

    renderAction = (id, blockedAt) => {
        if(typeof blockedAt !== 'undefined') {
            return <a href="#" onClick={this.onChangeStatusClick.bind(this, id, "Unblock")}>Unblock</a>
        } else {
            return <a href="#" onClick={this.onChangeStatusClick.bind(this, id, "Block")}>Block</a>
        }
    };

    render() {
        const { editors } = this.props.editor;
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
                                <th>Username</th>
                                <th>Date Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {editors.map(({ _id, firstName, lastName, username, blockedAt, createdAt }, index) => (
                                <tr key={_id}>
                                    <td>{index+1}</td>
                                    <td>{firstName} {lastName}</td>
                                    <td>{username}</td>
                                    <td>{moment(createdAt).format( 'MMM DD, YYYY hh:mm A')}</td>
                                    <td>Active</td>
                                    <td>{this.renderAction(_id, blockedAt)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
        );
    }
}

const mapStateToProps = state => ({
  editor: state.editor
});

export default connect(
  mapStateToProps,
  { getEditors, editEditorStatus }
)(Editors);

