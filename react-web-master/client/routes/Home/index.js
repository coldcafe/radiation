import React from 'react';
import Button from '../Button';
import ShowBar from '../ShowBar';
import { Link } from 'react-router';

import './index.scss';
import myImg from './Joker.jpg';
import { Row, Col } from 'antd';

export default class Home extends React.Component {
  render() {
    const html = this.props.children ? this.props.children : <div>
      <ShowBar />
      <div>
        <Button buttonText="变黑" /><Button buttonText="变绿" />
      </div>
      <div>
        <button className="a">1</button>
        <button className="a">2</button>
      </div>
      <img src={myImg}/>
      <div><Link to={'/home_child'}>home_child</Link></div>
      <div><Link to={'/login'}>home_child</Link></div>
      <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    </div>
    return html;
  }
}