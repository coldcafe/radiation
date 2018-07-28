import React from 'react';

let st = require('./index.css');

export default class Button extends React.Component {

  handleButtonClick(buttonText) {
    let text = buttonText;
    if (text == '变黑') {
      this.props.changeColor('black');
      console.log('black');
    } else if (text == '变绿') {
      this.props.changeColor('green');
      console.log('green');
    } else {
      return;
    }
  }

  render() {
    return (
      <button className={st.a} onClick={() => this.handleButtonClick(this.props.buttonText)}>{this.props.buttonText}</button>
    );
  }
}