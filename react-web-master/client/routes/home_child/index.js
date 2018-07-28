import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetch_server_data } from './models/reducer';


@connect(
  state => ({
    server_data: state.home_child.server_data
  }), {
    fetch_server_data: fetch_server_data
  }
)
export class HomeChild extends React.Component {
  
  getData = async () => {
    this.props.fetch_server_data();
  }

  render() {
    console.log(this.props.server_data);
    return (
      <div>
        <button onClick={() => this.getData()}>get data</button>
       
      </div>
    );
  }
}