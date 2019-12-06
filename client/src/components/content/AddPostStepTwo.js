import React, {
    Component
} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import SinglePost from '../partials/SinglePost';
import SinglePostNew from '../partials/SinglePostNew';
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
                        <div className="row">
                            <div className="col-md-12">
                                <img className="img-fluid" src="/images/add-post-step-2.png" />
                            </div>
                        </div>
                        <hr/>
                        <SinglePostNew user={this.props.auth.user} post={this.props.currentState} type={'Uploading'} />
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