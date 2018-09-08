import React, { Component } from 'react';
import { Row, Col, Modal, Input, DatePicker, TimePicker ,message} from 'antd';
import monent from 'moment';
import styles from './style/home.less';

class BaseInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || {},
            visible: false,
            visibleData: {},
            DatePicker:'',
            TimePicker:"",
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            data: props.data || {},
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
            visibleData: this.props.data,
            TimePicker: monent(this.getTimePicker(this.props.data.measuredAt),'HH:mm:ss'),
            DatePicker: monent(this.getDatePicke(this.props.data.measuredAt),'YYYY-MM-DD'),
        });
    }
    // 获取年月日。十分秒
     date_format=(val)=>{
        if (!val) {
            return ''
        }
        let date = new Date(val * 1000);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        let newTime = year + '-' +
            (month < 10 ? '0' + month : month) + '-' +
            (day < 10 ? '0' + day : day) + ' ' +
            (hour < 10 ? '0' + hour : hour) + ':' +
            (min < 10 ? '0' + min : min) + ':' +
            (sec < 10 ? '0' + sec : sec);

        return newTime;
    }
    
    //获取年月日
    getDatePicke=(val)=>{
        if (!val) {
            return ''
        }
        let date = new Date(val * 1000);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate();
        let newTime = year + '-' +
            (month < 10 ? '0' + month : month) + '-' +
            (day < 10 ? '0' + day : day)
            return newTime;
    }


    //获取十分钟秒
    getTimePicker=(val)=>{
        if (!val) {
            return ''
        }
        let date = new Date(val * 1000);
        let hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        let newTime = 
            (hour < 10 ? '0' + hour : hour) + ':' +
            (min < 10 ? '0' + min : min) + ':' +
            (sec < 10 ? '0' + sec : sec);
            console.log(newTime);
        return newTime;
    }

    changeBaseInfo=()=>{
        var date= this.state.DatePicker.format('YYYY-MM-DD');
        var time =this.state.TimePicker.format('HH:mm:ss');
        var newTime=date+' '+time;
        var newDate= Date.parse(new Date(newTime))/1000;
        var json={...this.state.visibleData,measuredAt:newDate};
        this.props.changeBaseInfo(json,response=>{
            message.success('修改数据成功');
            this.setState({
                visible:false,
            });
        },error=>{
            message.error('修改数据失败');
        }); 
    }

    componentWillReceiveProps(props){
        this.setState({
            data:props.data,
        });
    }

    render() {
        const { data } = this.state;
        
        console.log(data);
        return (
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
                        <Col span={14}>{this.date_format(data.measuredAt)}</Col>
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
                        <Col span={10}>被检测单位:</Col>
                        <Col span={14}>{data.contactPerson}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人:</Col>
                        <Col span={14}>{data.contactPerson}</Col>
                    </Col>
                    <Col span={12}>
                        <Col span={10}>被检测单位联系人电话:</Col>
                        <Col span={14}>{data.contactPersonTel}</Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={10}>GPS地址:</Col>
                        <Col span={14}>{data.GPS}</Col>
                    </Col>
                </Row>

                <Modal
                    visible={this.state.visible}
                    onCancel={() => { this.setState({ visible: false }) }}
                    onOk={() => {this.changeBaseInfo()}}
                    title={'基本信息'}
                    className='baseInfo_modal'
                    width={700}
                >
                    <Row>
                        <Col span={12}>
                            <Col span={10}>测量人:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.measurePerson}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, measurePerson: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={10}>仪器型号和编号:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.machineNO}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, machineNO: e.target.value }
                                        })
                                    }}
                                   
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={10}>任务编号:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.taskNO}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, taskNO: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={10}>测量时间:</Col>
                            <Col span={14}  className='basetime_body'>
                                <DatePicker
                                    value={this.state.DatePicker}
                                    onChange={(date,dateString)=>{
                                        this.setState({
                                            DatePicker:date,
                                        })
                                    }}
                                />
                                <TimePicker
                                    value={ this.state.TimePicker}
                                    onChange={(date,dateString)=>{
                                        this.setState({
                                            TimePicker:date,
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={10}>检查类别:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.type}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, type: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={10}>天气状况:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.weather}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, weather: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={10}>测量地址:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.address}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, address: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={10}>被检测单位:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.unit}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, unit: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={10}>被检测单位联系人:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.contactPerson}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, contactPerson: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={10}>被检测单位联系人电话:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.contactPersonTel}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, contactPersonTel: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Col span={10}>GPS地址:</Col>
                            <Col span={14}>
                                <Input
                                    value={this.state.visibleData.GPS}
                                    onChange={(e) => {
                                        this.setState({
                                            visibleData: { ...this.state.visibleData, GPS: e.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export default BaseInfoComponent;