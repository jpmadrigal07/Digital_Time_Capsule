import React, {
    Component
} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import $ from 'jquery';

class AddPostStepOne extends Component {

    componentDidMount() {
        if (this.props.currentState.file) {
            if(this.props.currentState.file[0].type !== "video/mp4") {
                var reader = new FileReader();       
                reader.onload = function (e) {
                    // $('#img-upload').attr('src', e.target.result);
                    $('#media').html('<img class="img-fluid" id="img-upload" src="'+e.target.result+'" alt="Sample Photo" />')
                }
                reader.readAsDataURL(this.props.currentState.file[0]);
            } else {
                var reader = new FileReader();      
                reader.onload = function (e) {
                    // $('#img-upload').attr('src', '/images/video-placeholder.png');
                    $('#media').html('<video class="embed-responsive video-center" height="568" controls autoplay loop><source src="'+e.target.result+'" type="video/mp4"></video>')
                    console.log()
                }
                reader.readAsDataURL(this.props.currentState.file[0]);
            }
        }
    }

    onButtonClick = nextStep => {
        this.props.onClickButton({step: nextStep})
    }
    
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <h4>Step 2: Post Preview</h4>
                        <p className="font-italic text-muted">This step is the way for you to check if you are satisfied with your entry.</p>
                        <hr/>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <img src={this.props.auth.user.profilePicture} width="50" height="50" className="rounded-circle float-left" style={{marginRight: '10px'}} /><span className="float-left" style={{lineHeight: '1.2', marginTop: '5px'}}> { this.props.auth.user.firstName } { this.props.auth.user.lastName }<br/> <span className="text-muted">25 mins</span> </span>
                                <div style={{ clear: 'both'}}></div>
                                <p style={{ marginTop: '15px'}}>{this.props.currentState.message}</p>
                                <div style={{backgroundColor: '#F8F9FA'}} > <span id="media"></span></div>
                            </div>
                        </div>
                        <div className="row mb-3"> 
                            <div className="col-md-12">
                                <h4 className="font-italic text-center">{this.props.currentState.dateMonth !== '' ? this.props.currentState.dateMonth+' ' : ''}{this.props.currentState.dateDay !== '' ? this.props.currentState.dateDay+', ' : ''}{this.props.currentState.dateYear}</h4>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-md-6">
                                <button type="submit" onClick={() => this.onButtonClick('1')} className="btn btn-primary">Back <FeatherIcon icon="arrow-left" size="18" /></button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit" onClick={() => this.onButtonClick('3')}  className="btn btn-primary float-right">Submit <FeatherIcon icon="arrow-right" size="18" /></button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(AddPostStepOne));