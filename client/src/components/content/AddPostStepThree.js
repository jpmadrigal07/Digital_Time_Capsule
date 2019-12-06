import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost } from '../../actions/postActions';
import LoadingSpinner from '../partials/LoadingSpinner';
import MessageWithIcon from '../partials/MessageWithIcon';
import $ from 'jquery';

class AddPostStepThree extends Component {

    componentDidMount() {
        const { history } = this.props;

        const data = new FormData();

        data.append('file', this.props.currentState.file[0])
        data.append('isImage', this.props.currentState.isImage)
        data.append('userId', this.props.auth.user._id)
        data.append('message', this.props.currentState.message)
        data.append('dateYear', this.props.currentState.dateYear)
        data.append('dateMonth', this.props.currentState.dateMonth)
        data.append('dateDay', this.props.currentState.dateDay)

        this.props.addPost(data, this.props.currentState.isImage, history);
    }

    renderContent = e => {
        if(!this.props.post.loading) {
            const check = 'check-circle';
            const message = 'Upload successful!';
            // Bootstrap class name color
            const logoColor = 'text-success';
            return <MessageWithIcon icon={check} logoColor={logoColor} message={message} />
        } else {
            return <LoadingSpinner message={'Please wait. Do not close this tab or this browser.'} />
        }
    }
    
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="img-fluid" src="/images/add-post-step-3.png" />
                            </div>
                        </div>
                        <hr/>
                        {console.log(this.props)}
                        {this.renderContent()} 
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { addPost })(withRouter(AddPostStepThree));