import React,{Component} from 'react';
import { Row, Col } from 'antd';
import styles from './style/home.less';
class BaseInfoComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data||{},
        }
    }
    render(){       
        const {data}=this.state;
        return(
            <div>
                <Row>
                    <Col span={12}>
                        <text>测量人:</text>
                        <text>data.measurePerson</text>
                    </Col>
                    <Col span={12}>
                        <text>仪器型号和编号:</text>
                        <text>data.machineNO</text>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <text>任务编号:</text>
                        <text>data.taskNO</text>
                    </Col>
                    <Col span={12}>
                        <text>测量时间:</text>
                        <text>data.measuredAt</text>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <text>检查类别:</text>
                        <text>data.type</text>
                    </Col>
                    <Col span={12}>
                        <text>天气状况:</text>
                        <text>data.weather</text>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <text>测量地址:</text>
                        <text>data.address</text>
                    </Col>
                    <Col span={12}>
                        <text>被检测单位联系人:</text>
                        <text>data.contactPerson</text>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <text>被检测单位联系人电话:</text>
                        <text>data.contactPersonTel</text>
                    </Col>
                    <Col span={12}>
                        <text>GPS地址:</text>
                        <text>data.GPS</text>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BaseInfoComponent;