import React,{Component} from 'react';
import {Table,Row,Col,Modal} from 'antd';
import LoginService from '../../services/loginService';



export default class DataTable extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data||{},
            editModal: false
        }
    }
    getmeasureData=(type,data)=>{  //type  0代表测量位置 1代表展示的数据
        if(data){
            let arrayData = []
            data.slice(0,10).forEach( item => {
                arrayData.push(<Col className="measure-10">{item}</Col>)
            })
            
            return (
                <Row>
                    {arrayData}
                </Row>
            )
        } 
        var array=[];
        for(var i=1;i<11;i++){
            array.push(<Col className="measure-10">{i}</Col>);
        }
        return(
            <Row>
                {array}
            </Row> 
        )
    }
    editData = () => {

    }
    cancelModal() {
        this.setState({
            editModal: false
        })
    }
    render(){
        const dataArr = this.state.data.data[0].values.split(',')
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
                        {this.getmeasureData(0, dataArr)}  
                    </Col>
                    <Col span={2} className="col-empty-2 table-edit">
                        <a onClick={this.editData}>编辑</a>
                    </Col>
                </Row>
                <Row className="table-row">
                    <Col span={4}>数据处理</Col>
                    <Col span={2}>均值R</Col>
                    <Col span={4}>{dataArr[10]}</Col>
                    <Col span={2}>标准差</Col>
                    <Col span={4}>{dataArr[11]}</Col>
                    <Col span={2}>结果D</Col>
                    <Col span={4}>{dataArr[12]}</Col>
                    <Col span={2} className="table-operate"></Col>
                </Row>

                <Modal visible={this.state.editModal} footer={null} onCancel={() => {this.cancelModal()}}>
                    <div>
                        编辑弹窗
                    </div>
                </Modal>
            </div>
        )
    }
}