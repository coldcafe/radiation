import React, {Component} from 'react';
import {BUtton,Col,Row,Input,DatePicker,TimePicker,message} from 'antd';
import { ENFILE } from 'constants';
require('./style/basis.less')

export default class Basis extends Component{
    constructor(props){
        super(props);
        this.state={
            measurePerson:'',
            machineNO:'',
            taskNO:'',
            measuredAt:'',
            type:'',
            weather:'',
            address:'',
            unit:'',
            contactPerson:'',
            contactPersonTel:'',
            GPS:'', 
        }
        this.datepicker='';
        this.timePicker='';
    }

    getBaseInfo=()=>{
        var json={};
        json.measurePerson=this.state.measurePerson;
        json.machineNO=this.state.machineNO;
        json.taskNO=this.state.taskNO;
        json.type=this.state.type;
        json.weather=this.state.weather;
        json.address=this.state.address;
        json.unit=this.state.unit;
        json.contactPerson=this.state.contactPerson;
        json.contactPersonTel=this.state.contactPersonTel;
        json.GPS=this.state.GPS;
        // 计算测量时间
        if(this.datepicker&&this.timePicker){
            var time=this.datepicker+' '+this.timePicker;
            var newdate=new Date(time)/1000;
            json.measuredAt=newdate;
            console.log(newdate);
        }else{
            message.error('请输入测量时间');
            return null;
        }
        return json;

    }
    cleaninfo=()=>{
        this.datepicker='';
        this.timePicker='';
        this.setState({
            measurePerson:'',
            machineNO:'',
            taskNO:'',
            measuredAt:'',
            type:'',
            weather:'',
            address:'',
            unit:'',
            contactPerson:'',
            contactPersonTel:'',
            GPS:'', 
        });

    }
    onchangeDatePicker=(info,dataString)=>{
        this.datepicker=dataString;
    }
    onchangeTimePicker=(info,timeString)=>{
       this.timePicker=timeString;
    }

    render() {
        return (
             <div className="edit-basicInfo">
                 <Row>
                    <Col span={12} style={{marginTop:0}}>
                        <Col span={8}>测量人:</Col>
                            <Col span={12}>
                                <Input 
                                    value={this.state.measurePerson}
                                    onChange={(e)=>{this.setState({measurePerson:e.target.value})}}
                                />
                            </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={8}>仪器型号和编号:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.machineNO}
                                onChange={(e)=>{this.setState({machineNO:e.target.value})}}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={8}>任务编号:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.taskNO}
                                onChange={(e)=>{this.setState({taskNO:e.target.value})}}
                            />
                        </Col>                    
                    </Col>
                    <Col span={12}>
                        <Col span={8}>测量时间:</Col>
                        <Col span={12} style={{display:'flex'}}>
                            <DatePicker
                                onChange={this.onchangeDatePicker}
                            />
                            <TimePicker
                                onChange={this.onchangeTimePicker}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                         <Col span={8}>检查类别:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.type}
                                onChange={(e)=>{this.setState({type:e.target.value})}}
                            />
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={8}>天气状况:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.weather}
                                onChange={(e)=>{this.setState({weather:e.target.value})}}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={8}>测量地址:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.address}
                                onChange={(e)=>{this.setState({address:e.target.value})}}
                            />
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={8}>被检测单位:</Col>
                        <Col span={12}>
                            <Input 
                                 value={this.state.unit}
                                 onChange={(e)=>{this.setState({unit:e.target.value})}}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={8}>被检测单位联系人电话:</Col>
                        <Col span={12}>
                            <Input 
                                 value={this.state.contactPersonTel}
                                 onChange={(e)=>{this.setState({contactPersonTel:e.target.value})}}
                            />
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={8}>被检测单位联系人:</Col>
                        <Col span={12}>
                            <Input 
                                value={this.state.contactPerson}
                                onChange={(e)=>{this.setState({contactPerson:e.target.value})}}
                            />
                        </Col>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span={12}>
                        <Col span={8}>GPS地址:</Col>
                        <Col span={12}>
                            <Input 
                                 value={this.state.GPS}
                                 onChange={(e)=>{this.setState({GPS:e.target.value})}}
                            />
                        </Col>
                    </Col>
                </Row>
             </div>
        );
    }
}