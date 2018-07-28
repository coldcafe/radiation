import React from 'react';

export default class ShowBar extends React.Component {

  render () {

    let divStyle = {
      width: '200px',
      height: '200px',
      backgroundColor: this.props.color || 'blue'
    };

    console.log(divStyle);

    return (
      <div style={divStyle}></div>
    );
  }
}