import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';

class SinglePostNew extends Component {

  renderUploadedMedia() {
    if(this.props.type === "Uploaded") {
      if(this.props.post.isImage) {
        return <img className="img-fluid" src={this.props.post.mediaURL} alt="Photo" />
      } else {
        return <video className="embed-responsive video-center" height="568" controls autoplay loop><source src={this.props.post.mediaURL} type="video/mp4" /></video>
      }
    }
  }

  render() {
    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <img src={ this.props.user.profilePicture } width="50" height="50" className="rounded-circle float-left" style={{marginRight: '10px'}} /><span className="float-left" style={{lineHeight: '1.2', marginTop: '5px'}}> { this.props.user.firstName } { this.props.user.lastName }<br/> <span className="text-muted">25 mins</span> </span>
                    <div style={{ clear: 'both'}}></div>
                    <p style={{ marginTop: '15px'}}>{ this.props.post.message }</p>
                    <div style={{backgroundColor: '#F8F9FA'}} > 
                        {typeof this.props.post.mediaURL !== 'undefined' ? this.renderUploadedMedia() : <span id="media"></span> }
                    </div>
                </div>
            </div>
            <div className="row mb-3"> 
                <div className="col-md-12">
                    <h4 className="text-center"><span style={{fontWeight: '400'}}>This happened on</span> <span className="font-italic">{this.props.post.dateMonth !== '' ? this.props.post.dateMonth+' ' : ''}{this.props.post.dateDay !== '' ? this.props.post.dateDay+', ' : ''}{this.props.post.dateYear}.</span></h4>
                </div>
            </div>
        </div>
    );
  }
}

export default SinglePostNew;
