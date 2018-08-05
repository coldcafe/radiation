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
            <div className="baseinfo-container">
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={10}>测量人</Col>
                            <Col span={14}>data.measurePerson</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>仪器型号和编号:</Col>
                        <Col span={14}>data.machineNO</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>任务编号:</Col>
                        <Col span={14}>data.taskNO</Col>                    
                    </Col>
                    <Col span={12}>
                        <Col span={10}>测量时间:</Col>
                        <Col span={14}>data.measuredAt</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                         <Col span={10}>检查类别:</Col>
                        <Col span={14}>data.type</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>天气状况:</Col>
                        <Col span={14}>data.weather</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>测量地址:</Col>
                        <Col span={14}>data.address</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人:</Col>
                        <Col span={14}>data.contactPerson</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人电话:</Col>
                        <Col span={14}>data.contactPersonTel</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>GPS地址:</Col>
                        <Col span={14}>data.GPS</Col>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BaseInfoComponent;