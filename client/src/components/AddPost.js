import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import MainNavBar from './partials/MainNavBar';
import AddPostStepOne from './content/AddPostStepOne';
import AddPostStepTwo from './content/AddPostStepTwo.js';
import AddPostStepThree from './content/AddPostStepThree.js';

class AddPost extends Component {

  state = {
    message: '',
    dateYear: '',
    dateMonth: '',
    dateDay: '',
    isImage: false,
    file: '',
    step: '1'
  };

  componentDidMount() {
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if (!this.props.auth.isLoading && this.props.auth.user) {
      if (this.state.step === '1') {
        return <AddPostStepOne onClickButton={(curentState) => this.setState(curentState)} currentState={this.state}/>
      } else if (this.state.step === '2') {
        return <AddPostStepTwo onClickButton={(curentState) => this.setState(curentState)} currentState={this.state}/>
      } else if (this.state.step === '3') {
        return <AddPostStepThree onClickButton={(curentState) => this.setState(curentState)} currentState={this.state}/>
      }
    } else {
      return <h3 className = "text-center" > ... </h3>
    }
  }

  render() {
    return ( 
      <div>
      <MainNavBar {...this.props} /> 
      {this.renderContent()} 
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(AddPost);