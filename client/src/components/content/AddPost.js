import React, {
    Component
} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class AddPost extends Component {

    state = {
        selectedFile: null,
        message: '',
        year: '',
        month: '',
        day: '',
        loaded: 0
    }

    onChangeField = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = []
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err[x] = files[x].type + ' is not a supported format\n';
            }
        };
        for (var z = 0; z < err.length; z++) { // if message not same old that mean has error 
            // discard selected file
            console.log(err[z])
            event.target.value = null
        }
        return true;
    }

    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null
            console.log(msg)
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size = 100000000000;
        let err = [];
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        for (var z = 0; z < err.length; z++) { // if message not same old that mean has error 
            // discard selected file
            console.log(err[z]);
            event.target.value = null;
        }
        return true;
    }
    
    onChangeHandler = event => {
        let files = event.target.files;
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            // if return true allow to setState
            this.setState({
                selectedFile: files,
                loaded: 0
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { history } = this.props;

        const data = new FormData();
        for(var x = 0; x < this.state.selectedFile.length; x++) {
          data.append('file', this.state.selectedFile[x])
        }

        data.append('userId', this.props.auth.user._id)
        data.append('message', this.state.message)
        data.append('dateYear', this.state.year)
        data.append('dateMonth', this.state.month)
        data.append('dateDay', this.state.day)

        this.props.addPost(data, history);
        console.log(this.props.post)
    };
    
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Example file input</label>
                                <input type="file" className="form-control-file" onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea className="form-control" name="message" rows="3" placeholder="Write here..." onChange={this.onChangeField} required ></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>What year this is?</label>
                                    <input type="number" className="form-control" name="year" min="1969" max="2019" onChange={this.onChangeField} required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Month (optional)</label>
                                    <select name="month" className="form-control" onChange={this.onChangeField} required >
                                        <option value=""></option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Day (optional)</label>
                                    <input type="number" className="form-control" name="day" min="1" max="31" onChange={this.onChangeField} required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(AddPost));