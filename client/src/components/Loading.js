import React, { Component } from 'react';

class Loading extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#1a1a1a';
  }

  render() {
    return (
      <div>
          <h3 className="text-center text-white" style={{margin: '15rem auto 0px'}}>Loading...</h3>
      </div>
    );
  }
}

export default Loading;
