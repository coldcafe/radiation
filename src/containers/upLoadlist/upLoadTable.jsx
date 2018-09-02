import React, { Component } from 'react';
import { Table, Row, Col, Modal, Form, Button, Input, Message } from 'antd';
import LoginService from '../../services/loginService';
const FormItem = Form.Item
export default class upLoadTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || {},
            editModal: false,
            currentRow: [],
            currentIdx: 0,
            tmpData: []
        }
    }
    getmeasureData = (type, data) => {  //type  0代表测量位置 1代表展示的数据
        if (data) {
            let arrayData = []
            data.slice(0, 10).forEach(item => {
                arrayData.push(<Col className="measure-10">{item}</Col>)
            })

            return (
                <Row>
                    {arrayData}
                </Row>
            )
        }
        var array = [];
        for (var i = 1; i < 11; i++) {
            array.push(<Col className="measure-10">{i}</Col>);
        }
        return (
            <Row>
                {array}
            </Row>
        )
    }
    editData(data, index) {        
        this.setState({
            editModal: true,
            currentIdx: index,
            currentRow: data,
            tmpData: data
        })
        
    }
    cancelModal() {
        this.setState({
            editModal: false
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        
        var arrData = this.state.data.data
        
        var index = this.state.currentIdx

        arrData[index].values = this.state.currentRow.join(',')

        LoginService.updatereportslist(this.state.data,(response)=>{
            this.setState({
                data: response,
                editModal: false,
                currentRow: [],
                tmpData: []
            })
            Message.success('编辑测量数据成功！')
            localStorage.setItem('tableObj', JSON.stringify(response))
        },(error)=>{
            console.log('error==='+ JSON.stringify(error));
            Message.error('编辑测量数据失败！')
            let data = JSON.parse(localStorage.getItem('tableObj'))
            this.setState({
                data: data,
                editModal: false,
                currentRow: [],
                tmpData: []
            })

        });
        // console.log(this.state.data,this.state.tmpData);
    }
    handleReset = () => {
        this.setState({
            editModal: false,
            currentRow: [],
            tmpData: []
        })
        
    }
    changeInput = (e, index) => {
        let arrData = this.state.currentRow
        arrData.splice(index, 1, e.target.value)        
        this.setState({
            currentRow: arrData
        })

    }
    render() {
        const dataArrList = this.state.data.data?this.state.data.data:[];
        return (
            <div>
                {
                    dataArrList.map((item, idx) => {
                        const dataArr = item.values.split(',')
                        return (
                            <div>
                                <Row className="table-row">
                                    <Col span={2}>
                                        <text>测量位置</text>
                                    </Col>
                                    <Col span={20}>测量位置{idx + 1}</Col>
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
                                        <a onClick={() => this.editData(dataArr, idx)}>编辑</a>
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
                            </div>
                        )
                    })
                }
                <Modal visible={this.state.editModal} title="编辑" width={600} footer={null} onCancel={() => { this.cancelModal() }}>
                    <div style={{ padding: '20px 5px' }}>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={(e) => this.handleSubmit(e)}
                            layout="inline"
                        >
                            <Row gutter={24}>
                                {this.state.currentRow.slice(0, 10).map((item, index) => {
                                    return (
                                        <Col span={8} key={index} style={{ border: 0 }}>
                                            <FormItem label={index + 1}>
                                                <Input placeholder="placeholder" style={{ width: '90px' }} defaultValue={this.state.currentRow[index]} onChange={(e) => this.changeInput(e, index)}></Input>
                                            </FormItem>
                                        </Col>
                                    )
                                })}
                            </Row>

                            <Row>
                                <Col span={8} key={10} style={{ border: 0 }}>
                                    <FormItem label="均值R">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} defaultValue={this.state.currentRow[10]} onChange={(e) => this.changeInput(e, 10)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={11} style={{ border: 0 }}>
                                    <FormItem label="标准差">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} defaultValue={this.state.currentRow[11]} onChange={(e) => this.changeInput(e, 11)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={12} style={{ border: 0 }}>
                                    <FormItem label="结果D">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} defaultValue={this.state.currentRow[12]} onChange={(e) => this.changeInput(e, 12)}></Input>
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                        取消
                            </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}