import React,{Component} from 'react';
import {Table,Row,Col} from 'antd';



export default class DataTable extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data||[],
        }
    }
    getmeasureData=(type,data)=>{  //type  0代表测量位置 1代表展示的数据 
        var array=[];
        for(var i=0;i<10;i++){
            array.push(<Col className="measure-10">{i}</Col>);
        }
        return(
            <Row>
                {array}
            </Row> 
        )
    }
    render(){
        return(
            <div>
                <Row className="table-row">
                    <Col span={2}>
                        <text>测量位置</text>
                    </Col>
                    <Col span={20}>测量位置1</Col>
                    <Col span={2}>
                        <text>操作</text>
                    </Col>
                </Row>
                <Row className="table-row">
                    <Col span={2} className="col-empty-2"></Col>
                    <Col span={20} className="col-empty-20">
                        {this.getmeasureData(0)}
                        {this.getmeasureData(0)}  
                    </Col>
                    <Col span={2} className="col-empty-2 table-edit">
                        <a href="#">编辑</a>
                    </Col>
                </Row>
                <Row className="table-row">
                    <Col span={4}>数据处理</Col>
                    <Col span={2}>均值R</Col>
                    <Col span={4}></Col>
                    <Col span={2}>标准差</Col>
                    <Col span={4}></Col>
                    <Col span={2}>结果D</Col>
                    <Col span={4}></Col>
                    <Col span={2} className="table-operate"></Col>
                </Row>
            </div>
        )
    }
}