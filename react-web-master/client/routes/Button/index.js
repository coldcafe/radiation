import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import ButtonVisual from './components';

import { changeColor } from '../../redux/test';

let mapStateToProps = (state) => {
  return {
    
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeColor: changeColor
    },
    dispatch
  );
};

let Button = connect(mapStateToProps, mapDispatchToProps)(ButtonVisual);

export default Button;