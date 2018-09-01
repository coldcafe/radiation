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
        function date_format(val){
            if(!val){
                return '--'
            }
            let date = new Date(val * 1000)
            let year = date.getFullYear(),
                month = date.getMonth()+1,//月份是从0开始的
                day = date.getDate(),
                hour = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds();
            let newTime = year + '-' +
                        (month < 10? '0' + month : month) + '-' +
                        (day < 10? '0' + day : day) + ' ' +
                        (hour < 10? '0' + hour : hour) + ':' +
                        (min < 10? '0' + min : min) + ':' +
                        (sec < 10? '0' + sec : sec);

            return newTime;
        }
        return(
            <div className="baseinfo-container">
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={10}>测量人:</Col>
                            <Col span={14}>{data.measurePerson}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>仪器型号和编号:</Col>
                        <Col span={14}>{data.machineNO}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>任务编号:</Col>
                        <Col span={14}>{data.taskNO}</Col>                    
                    </Col>
                    <Col span={12}>
                        <Col span={10}>测量时间:</Col>
                        <Col span={14}>{date_format(data.measuredAt)}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                         <Col span={10}>检查类别:</Col>
                        <Col span={14}>{data.type}</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>天气状况:</Col>
                        <Col span={14}>{data.weather}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>测量地址:</Col>
                        <Col span={14}>{data.address}</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人:</Col>
                        <Col span={14}>{data.contactPerson}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人电话:</Col>
                        <Col span={14}>{data.contactPersonTel}</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>GPS地址:</Col>
                        <Col span={14}>{data.GPS}</Col>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BaseInfoComponent;