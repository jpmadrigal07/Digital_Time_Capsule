import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEditor } from '../../actions/editorActions';
import { withRouter } from 'react-router-dom';

class AddEditor extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'Editor'
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { history } = this.props;

        const newEditor = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role
        };

        // Add item via addItem action
        this.props.addEditor(newEditor, history);
        console.log(this.props);
    };

    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Username</label>
                                    <input type="text" className="form-control" name="username" placeholder="" onChange={this.onChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="" onChange={this.onChange} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="" onChange={this.onChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="" onChange={this.onChange} required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  editor: state.editor,
});

export default connect(
  mapStateToProps,
  { addEditor }
)(withRouter(AddEditor));
