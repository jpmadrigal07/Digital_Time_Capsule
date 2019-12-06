import React from 'react';

const SinglePost = ({user, post}) => {
    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <img src={ user.profilePicture } width="50" height="50" className="rounded-circle float-left" style={{marginRight: '10px'}} /><span className="float-left" style={{lineHeight: '1.2', marginTop: '5px'}}> { user.firstName } { user.lastName }<br/> <span className="text-muted">25 mins</span> </span>
                    <div style={{ clear: 'both'}}></div>
                    <p style={{ marginTop: '15px'}}>{ post.message }</p>
                    <div style={{backgroundColor: '#F8F9FA'}} > 
                        <span id="media">
                        </span>
                    </div>
                </div>
            </div>
            <div className="row mb-3"> 
                <div className="col-md-12">
                    <h4 className="font-italic text-center">{post.dateMonth !== '' ? post.dateMonth+' ' : ''}{post.dateDay !== '' ? post.dateDay+', ' : ''}{post.dateYear}</h4>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;