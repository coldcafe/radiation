import React, { Component } from 'react';
import { Button, Input, Modal, Card, message } from 'antd';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import LoginService from '../../services/loginService';
import Config from '../../config';
require('./style/wordmanage.less');
class WordItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, chooseDeleteItem } = this.props;
        return (
            <div className="word-item">
                <div>
                    <text className="word-item-title">监测站</text>
                    <text className="word-item-message">{data.title}</text>
                </div>
                <div>
                    <text className="word-item-title">地址</text>
                    <text className="word-item-message">{data.address}</text>
                </div>
                <div>
                    <text className="word-item-title">电话</text>
                    <text className="word-item-message">{data.tel}</text>
                </div>
                <div>
                    <text className="word-item-title">传真</text>
                    <text className="word-item-message">{data.facsimile}</text>
                </div>
                <div>
                    <text className="word-item-title">邮编</text>
                    <text className="word-item-message">{data.email}</text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={() => { chooseDeleteItem(data) }}>删除模版</Button>
                </div>

            </div>
        )
    }
}
export default class WordManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            changeInfo: { title: '', address: '', tel: '', facsimile: '', email: '' },
            type: 0,   //类型 0 代表没有 ，1添加  2修改
            deleteVisible: false,
            deleteChoose: {},
        }
    }
    componentDidMount() {
        this.getallDataFromServer();
    }
    getAllItem = () => {
        var arr = [];
        this.state.data.map((item, index) => {
            arr.push(
                <WordItem
                    key={index}
                    data={item}
                    chooseDeleteItem={(data) => { this.chooseDeleteItem(data) }}

                />);
        });
        return arr;
    }
    getallDataFromServer = () => {
        LoginService.getAllWordItem(null, respone => {
            this.setState({
                data: respone,
            })
        }, errpr => {

        });
    }
    onOK = () => {

        if (!this.state.changeInfo.title) {
            message.error('请填写监测站');
            return;
        }
        if (!this.state.changeInfo.address) {
            message.error('请填写地址');
            return;
        }
        if (!this.state.changeInfo.tel) {
            message.error('请填写电话');
            return;
        }
        if (!this.state.changeInfo.facsimile) {
            message.error('请填写传真');
            return;
        }
        if (!this.state.changeInfo.email) {
            message.error('请填写邮箱')
            return;
        }
        if (this.state.type === 1) {
            //添加数据

            LoginService.addWordItem(this.state.changeInfo, respone => {
                this.setState({
                    visible: false,
                    changeInfo: { title: '', address: '', tel: '', facsimile: '', email: '' },

                })
                this.getallDataFromServer();
            }, error => {
                message.error('添加数据失败');
                this.setState({
                    visible: false,
                    changeInfo: { title: '', address: '', tel: '', facsimile: '', email: '' },

                });
            });
        } else if (this.state.type === 2) {
            //修改数据
        }

    }
    chooseDeleteItem = (data) => {
        this.setState({
            deleteVisible: true,
            deleteChoose: data,
        })
    }

    deleteItem = () => {
        LoginService.deleteWordItem(this.state.deleteChoose.id, respone => {
            message.success('删除模版成功');
            this.setState({
                deleteVisible: false,
            });
            this.getallDataFromServer();
        }, error => {
            message.error('删除模版失败');
            this.setState({
                deleteVisible: false,
            });
        });
    }
    render() {
        return (
            <div className="word-container">
                <LevelBcrumb title="视图模版" />
                <Button className='add-wordmodal'
                    onClick={() => {
                        this.setState({
                            visible: true,
                            type: 1,
                            changeInfo: {
                                title: '', address: '', tel: '',
                                facsimile: '', email: ''
                            },
                        });
                    }}
                >添加word模版</Button>
                <div className="word-body">
                    {this.getAllItem()}
                </div>
                <Modal
                    visible={this.state.visible}
                    onCancel={() => { this.setState({ visible: false }) }}
                    onOk={() => { this.onOK() }}
                    title="添加数据模版"
                >
                    <div className="word-edit-modal">
                        <div className="word-edit-modal-row">
                            <text>监测站</text>
                            <Input
                                value={this.state.changeInfo.title}
                                onChange={(e) => {
                                    this.setState({
                                        changeInfo: { ...this.state.changeInfo, title: e.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div className="word-edit-modal-row">
                            <text>地址</text>
                            <Input
                                value={this.state.changeInfo.address}
                                onChange={(e) => {
                                    this.setState({
                                        changeInfo: { ...this.state.changeInfo, address: e.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div className="word-edit-modal-row">
                            <text>电话</text>
                            <Input
                                value={this.state.changeInfo.tel}
                                onChange={(e) => {
                                    this.setState({
                                        changeInfo: { ...this.state.changeInfo, tel: e.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div className="word-edit-modal-row">
                            <text>传真</text>
                            <Input
                                value={this.state.changeInfo.facsimile}
                                onChange={(e) => {
                                    this.setState({
                                        changeInfo: { ...this.state.changeInfo, facsimile: e.target.value }
                                    })
                                }}

                            />
                        </div>
                        <div className="word-edit-modal-row">
                            <text>邮编</text>
                            <Input
                                value={this.state.changeInfo.email}
                                onChange={(e) => {
                                    this.setState({
                                        changeInfo: { ...this.state.changeInfo, email: e.target.value }
                                    })
                                }}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    visible={this.state.deleteVisible}
                    onCancel={() => { this.setState({ deleteVisible: false }) }}
                    onOk={() => { this.deleteItem() }}
                    title='删除模版'
                >
                    <div style={{display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
                        <text style={{color:'black',fontWeight:'600',}}> 确定要删除模版</text>
                        <text>{this.state.deleteChoose.title}</text>
                    </div>
                </Modal>
            </div>
        )
    }
}