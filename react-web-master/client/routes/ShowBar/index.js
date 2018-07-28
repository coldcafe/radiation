import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import ShowBarVisual from './components';

let mapStateToProps = (state) => ({
  color: state.test.color
});

let mapDispatchToProps = (dispatch) => (bindActionCreators(
  {

  },
  dispatch
));

let ShowBar = connect(mapStateToProps, mapDispatchToProps)(ShowBarVisual);

export default ShowBar;