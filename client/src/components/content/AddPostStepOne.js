import React, {
    Component
} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { withRouter } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import $ from 'jquery';

class AddPost extends Component {

    state = {
        file: '',
        isImage: true,
        message: '',
        dateYear: '',
        dateMonth: '',
        dateDay: ''
    }

    componentDidMount() {
        $(document).ready( function() {
            $(document).on('change', '.btn-file :file', function() {
                $('#img-upload-div').show();
                var input = $(this),
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [label]);
            });
    
            $('.btn-file :file').on('fileselect', function(event, label) {
                $('#img-upload-div').show();
                var input = $(this).parents('.input-group').find(':text'),
                    log = label;
                
                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }
            
            });
            function readURL(input) {
                if (input.files && input.files[0]) {
                    if(input.files[0].type !== "video/mp4") {
                        var reader = new FileReader();
                        
                        reader.onload = function (e) {
                            $('#img-upload').attr('src', e.target.result);
                        }
                        
                        reader.readAsDataURL(input.files[0]);
                    } else {
                        $('#img-upload').attr('src', '/images/video-placeholder.png');
                    }
                }
            }
    
            $("#imgInp").change(function(){
                readURL(this);
            }); 	
        });
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
            let isImage = true;
            if(files[0].type === 'video/mp4') {
                isImage = false;
            }
            this.setState({
                file: files,
                isImage: isImage
            })

        }
    }

    onSubmit = e => {
        e.preventDefault();

        let state = {
            message: this.state.message !== '' ? this.state.message : this.props.currentState.message,
            dateYear: this.state.dateYear !== '' ? this.state.dateYear : this.props.currentState.dateYear,
            dateMonth: this.state.dateMonth !== '' ? this.state.dateMonth : this.props.currentState.dateMonth,
            dateDay: this.state.dateDay !== '' ? this.state.dateDay : this.props.currentState.dateDay,
            isImage: this.state.isImage !== '' ? this.state.isImage : this.props.currentState.isImage,
            file: this.state.file !== '' ? this.state.file : this.props.currentState.file,
            step: '2'
        }; 

        this.props.onClickButton(state)

    };

    setImagePreviewURL = files => {
        if (files && this.state.file === '') {
            if(files.type !== "video/mp4") {
                var reader = new FileReader();       
                reader.onload = function (e) {
                    $('#img-upload').attr('src', e.target.result);
                }
                reader.readAsDataURL(files);
            } else {
                var reader = new FileReader();      
                reader.onload = function (e) {
                    $('#img-upload').attr('src', '/images/video-placeholder.png');
                }
                reader.readAsDataURL(files);
            }
        }
        
    }
    
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <h4>Step 1: Create Post</h4>
                        <p className="font-italic text-muted">All inputs that has <span className="text-danger">*</span> is required.</p>
                        <hr/>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label><FeatherIcon icon="edit-2" size="18" /> Message <span className="text-danger">*</span></label>
                                <textarea className="form-control" name="message" rows="3" placeholder={'What\'s on your mind, '+this.props.auth.user.firstName+'?'} onChange={this.onChangeField} defaultValue={this.props.currentState.message !== '' ? this.props.currentState.message : ''} required ></textarea>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <span className="input-group-btn">
                                                <span className="btn btn-primary btn-file">
                                                <FeatherIcon icon="camera" size="18" /> Browse<input type="file" id="imgInp" onChange={this.onChangeHandler} />
                                                </span>
                                            </span>
                                            <input type="text" defaultValue={this.props.currentState.file !== '' ? this.props.currentState.file[0].name : ''} className="form-control" disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-4 offset-md-4" id='img-upload-div' style={{display: 'block', marginTop: '15px'}}>
                                        {this.props.currentState.file !== '' ? this.setImagePreviewURL(this.props.currentState.file[0]) : ''} 
                                        <img className="img-responsive" id='img-upload'/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label><FeatherIcon icon="calendar" size="18" /> What year did this happen? <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" defaultValue={this.props.currentState.dateYear !== '' ? this.props.currentState.dateYear : ''} name="dateYear" min="1969" max="2019" onChange={this.onChangeField} required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label><FeatherIcon icon="calendar" size="18" /> Month</label>
                                    <select name="dateMonth" className="form-control" onChange={this.onChangeField} >
                                        <option value={this.props.currentState.dateMonth === 'January' ? 'selected' : ''}>{this.props.currentState.dateMonth !== '' ? this.props.currentState.dateMonth : ''}</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>s
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label><FeatherIcon icon="calendar" size="18" /> Day</label>
                                    <input type="number" defaultValue={this.props.currentState.dateDay !== '' ? this.props.currentState.dateDay : ''} className="form-control" name="dateDay" min="1" max="31" onChange={this.onChangeField} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary float-right">Next <FeatherIcon icon="arrow-right" size="18" /></button>
                                </div>
                            </div>
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