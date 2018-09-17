import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Row, Col, Card, Steps, Button, Message, message, Input, Modal, Carousel, Breadcrumb, Upload, Select } from 'antd';
import axios from 'axios';
import WordItem from './wordItem';
const { TextArea } = Input;

//import styles from './style/home.less';
require('./style/home.less');
import Config from '../../config/index';

// 公共面包屑
import Bcrumb from '../../component/bcrumb/bcrumb';
import BaseInfoComponent from './baseinfo';
import DataTable from './dataTable';
import LoginService from '../../services/loginService';
const Step = Steps.Step;

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteimg: false,
        }
    }
    render() {
        var { item, showImageModal, deletePicture } = this.props;
        return (
            <li className="pic-wall"
                onMouseMove={() => { this.setState({ showDeleteimg: true }) }}
                onMouseLeave={() => { this.setState({ showDeleteimg: false }) }}
            >
                <img src={Config.downimgUrl + item} alt="" style={{ width: '200px', height: 'auto' }}
                    onClick={() => { showImageModal(item) }} />
                {
                    this.state.showDeleteimg === true ?
                        <Button
                            style={{
                                position: 'absolute', top: 10, right: 10,
                                display: 'flex', alignItems: 'center',
                                backgroundColor: 'transparent', fontSize: 20, color: 'white', borderColor: 'transparent'
                            }}
                            onClick={(e) => { e.stopPropagation(); deletePicture(item) }}
                            icon={'delete'}
                        >
                        </Button>
                        : null
                }
            </li>
        )
    }
}



/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            previewVisible: false,      //展示点位示意图的modal
            showbaseInfoVisible: false,   //展示修改baseinfo 的modal
            currentUrl: '',
            data: [],       //测量数据
            sketchMap: '',  // 点位示意图
            pictures: [],    //图片数据
            result: '',    //结果数据
            baseInfo: {},  //base 数据
            sketchPictures: [],  //点位示意图的模版数组
            ShowSketchPictures: false,  //显示模版
            showSketchLocal: false,      //显示本地上传
            showPictureLocal: false,  //照片展示本地上传
            itemDisable:true,   //项目名称开始不可以编辑
            danweiDisable:true, //委托单位开始不可以编辑
            wenjianDisable:true,  //文件编号开是不可以编辑
            allWordItem:[],
            name:'',              // 项目名称
            docTempId:0     //模版



        };
        this.dataInfo = {}   //这个是总数据 ，
        
    }
    componentWillMount() {
        this.dataInfo = JSON.parse(localStorage.getItem('tableObj'))
        console.log(this.dataInfo);
        this.changeAllDataWithJson();
        this.getAllPointPic();
        this.getAllWordItem();
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    getToken = () => {
        console.log(Config.localKey.userToken);
        console.log('token' + Config.localItem(Config.localKey.userToken));
    }
    showImageModal(url) {
        this.setState({
            previewVisible: true,
            currentUrl: url
        })
    }
    getAllPointPic() {
        LoginService.getListsketchmap(null, (response) => {
            console.log(response);
            this.setState({
                sketchPictures: response,
            });

        }, (error) => {
            console.log(error);
        })
    }

    getAllWordItem(){
        LoginService.getAllWordItem(null,(response)=>{
            this.setState({
                allWordItem:response,
            })
        },(error)=>{
            console.log(error);
        });
    }

    cancelModal() {
        this.setState({
            previewVisible: false
        })
    }

    //替换点位示意图
    sketchMapApply = (val) => {
        this.dataInfo.pic = val
        var data = { id: this.dataInfo.id, sketchMap: val };
        LoginService.updatereportslist(data, (response) => {
            Message.success('替换点位示意图成功');
            this.dataInfo = response;
            this.changeAllDataWithJson();
        }, (error) => {
            Message.error('替换点位示意图失败！')
        });
    }

    // 下载文件
    downLoadWordOffice = () => {
        console.log('xxxxxxxxx');
        axios.get(Config.downDoc + this.dataInfo.id, {
            responseType: 'blob',
            headers: { 'Authorization': Config.localItem(Config.localKey.userToken) }
        })
            .then(function (response) {
                console.log(response);
                let url = window.URL.createObjectURL(new Blob([response.data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', ' 测试.doc');
                document.body.appendChild(link)
                link.click()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //保存word 文档数据
    saveWordMessage = () => {

        if(!this.state.name){
            message.error('请填写项目名称');
            return;
        }
        if(this.state.docTempId===0){
            message.error('请选择项目模版');
        }
        if(!this.state.result){
            message.error('请填写结论');
            return;
        }

        var data = { id: this.dataInfo.id, result: this.state.result,name:this.state.name}
        LoginService.updatereportslist(data, (response) => {
            Message.success('结论保存成功');
            this.dataInfo = response;
            this.changeAllDataWithJson();
        }, (error) => {
            Message.error('结论保存失败');
        });
    }

    //获取baseinfo
    getBaseInfo = () => {
        var json = { ...this.dataInfo } || {};
        delete json.data;
        delete json.result;
        delete json.sketchMap;
        delete json.pictures;
        console.log(json);
        return json;
    }

    //修改所有的显示数据
    changeAllDataWithJson = () => {
        var baseInfo = this.getBaseInfo();
        localStorage.setItem('tableObj', JSON.stringify(this.dataInfo));
        console.log(baseInfo);
        this.setState({
            sketchMap: this.dataInfo.sketchMap,
            data: this.dataInfo.data,
            pictures: this.dataInfo.pictures,
            baseInfo: baseInfo,
            result: this.dataInfo.result,
            name:this.dataInfo.name,
            docTempId:this.dataInfo.docTempId,
        });
    }
    //改变baseinfo
    changeBaseInfo = (baseinfo, success, fail) => {
        LoginService.updatereportslist(baseinfo, response => {
            console.log(response);
            this.dataInfo = response;
            this.changeAllDataWithJson();
            success();
        }, error => {
            fail();
        });
    }

    //改变 sketmap和pictures，上传点位示意图
    handleChange = (info, type) => {
        if (type == 1) {  //如果是1 那么就是上传的是点位示意图
            if (info.file.status == 'done') {
                var data = { id: this.dataInfo.id, sketchMap: info.file.response };
                LoginService.updatereportslist(data, response => {
                    Message.success('上传点位示意图成功');
                    this.dataInfo = response;
                    this.changeAllDataWithJson();
                }, error => {
                    Message.error('上传点位示意图失败');
                });
            }
        } else {
            if (info.file.status == 'done') {
                var arr = this.dataInfo.pictures || [];
                arr.push(info.file.response);
                var data = { id: this.dataInfo.id, pictures: arr };
                LoginService.updatereportslist(data, response => {
                    Message.success('上传照片成功');
                    this.dataInfo = response;
                    console.log(response);
                    this.changeAllDataWithJson();
                }, error => {
                    Message.error('上传照片失败');
                });

            }
        }
    }
    // 删除拍照的图片
    deletePicture = (item) => {
        var arr = this.state.pictures;
        arr.map((arritem, index) => {
            if (arritem === item) {
                arr.splice(index, 1)
            }
        });
        var data = { id: this.dataInfo.id, pictures: arr };
        LoginService.updatereportslist(data, response => {
            message.success('删除照片成功');
            this.dataInfo = response;
            this.changeAllDataWithJson();
        }, error => {
            message.error('删除照片失败');
        })
    }

    //选择word 模版
    choosewordItem=(json)=>{
        var data = { id: this.dataInfo.id, docTempId:json.id};
        LoginService.updatereportslist(data,response=>{
            message.success('修改模版成功');
            this.dataInfo = response;
            this.changeAllDataWithJson();
        },error=>{
            message.success('修改模版失败');
        })
    }
    // 添加measureData 的数据，删除 ，修改  删除 type ==0 ，修改 type==1
    changemeasureData = (json, type, index) => {
        if (type === 0) {
            // 是0 的话就是删除
            var arr = this.state.data;
            arr.splice(index, 1);
            var data = { id: this.dataInfo.id, data: arr };
            LoginService.updatereportslist(data, response => {
                message.success('删除数据成功');
                this.dataInfo = response;
                this.changeAllDataWithJson();
            }, error => {
                message.error('删除数据失败');
            });
        } else if (type == 1) {
            //如果是1的话那么就是修改数据
            var arr = this.state.data;
            json.id = arr[index].id
            arr[index] = json;
            var data = { id: this.dataInfo.id, data: arr };
            LoginService.updatereportslist(data, response => {
                console.log(response);
                message.success('修改数据成功');
                this.dataInfo = response;
                this.changeAllDataWithJson();
            }, error => {
                message.error('修改数据失败');
            });
        } else if (type == 2) {
            // 等于2就是新增加数据
            var arr = this.state.data;
            arr.push(json);
            var data = { id: this.dataInfo.id, data: arr };
            LoginService.updatereportslist(data, response => {
                message.success('添加数据成功');
                this.dataInfo = response;
                this.changeAllDataWithJson();
            }, error => {
                message.error('添加数据失败');
            });
        }
    }
    render() {
        return (
            <div className="home-container">
                <Bcrumb title="数据详情" historyTitle={'数据展示'} historyroute={'/List/list'}></Bcrumb>
                <Row>
                    <Col span={24}>
                        <Card
                            title="基本信息"
                            bordered={false}
                            className="mg-top20"
                            extra={<Button onClick={() => {
                                this.refs.BaseInfoComponent.showModal();
                            }}>编辑</Button>}
                        >
                            <BaseInfoComponent
                                ref='BaseInfoComponent'
                                data={this.state.baseInfo}
                                changeBaseInfo={(baseInfo, success, error) => { this.changeBaseInfo(baseInfo, success, error) }}
                            />
                        </Card>
                        <Card title="测量数据" bordered={true} className="mg-top20">
                            <DataTable
                                data={this.state.data}
                                changemeasureData={this.changemeasureData}
                            ></DataTable>
                        </Card>
                        <Card
                            title="点位示意图"
                            bordered={true}
                            className="mg-top20"
                            extra={
                                <div style={{ display: 'flex', width: 200, height: 47, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button
                                        onClick={() => {
                                            this.setState({
                                                showSketchLocal: !this.state.showSketchLocal,
                                                ShowSketchPictures: false,
                                            })
                                        }}
                                    >{this.state.showSketchLocal ? '隐藏本地上传' : '展开本地上传'}</Button>
                                    <Button
                                        onClick={() => {
                                            this.setState({
                                                ShowSketchPictures: !this.state.ShowSketchPictures,
                                                showSketchLocal: false,
                                            })
                                        }}
                                    >{this.state.ShowSketchPictures === true ? '收起模版' : '展开模版'}</Button>
                                </div>
                            }
                        >
                            {
                                this.state.sketchMap ?
                                    <div className="point_pic">
                                        <img src={Config.downimgUrl + this.state.sketchMap} alt="" style={{ width: '300px', height: 'auto' }} onClick={() => { this.showImageModal(this.dataInfo.sketchMap) }} />
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={() => { this.cancelModal() }}>
                                            <img alt="example" style={{ width: '100%' }} src={Config.downimgUrl + this.state.currentUrl} />
                                        </Modal>
                                    </div>
                                    :
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'cneter' }}>
                                        <Icon
                                            type='frown'
                                            style={{ fontSize: 20, color: '' }}
                                        />
                                        <text style={{ textAlign: 'center', marginTop: 10 }}>暂无点位示意图</text>
                                    </div>
                            }
                            {
                                this.state.showSketchLocal ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <text
                                            style={{ display: 'inline-block', width: '150px', marginBottom: 10, fontSize: 13 }}
                                        >本地上传点位示意图</text>
                                        <Upload
                                            accept='image/*'
                                            action={Config.uploadimgUrl}
                                            listType="picture-card"
                                            onPreview={this.handlePreview}
                                            onChange={(info) => { this.handleChange(info, 1) }}
                                            onRemove={false}
                                        >
                                            <div>
                                                <Icon type="plus" />
                                                <div className="ant-upload-text">Upload</div>
                                            </div>
                                        </Upload>
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.state.ShowSketchPictures === true ?
                                    <div className="pic-wall-container">
                                        <ul className="pic-container" style={{ width: 215 * this.state.pictures.length + 'px' }}>
                                            {this.state.sketchPictures.map((item, index) => {
                                                return (
                                                    <li className="pic-wall" key={index}>
                                                        <img src={Config.downimgUrl + item.pic} alt="" style={{ width: '200px', height: 'auto' }} onClick={() => { this.showImageModal(item.pic) }} />
                                                        <Button className="point-btn" onClick={() => this.sketchMapApply(item.pic)}>应用</Button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    : null
                            }
                        </Card>
                        <Card title="照片" bordered={true} className="mg-top20"
                            extra={
                                <Button
                                    onClick={() => {
                                        this.setState({ showPictureLocal: !this.state.showPictureLocal });
                                    }}
                                >{this.state.showPictureLocal ? '隐藏本地上传' : '展示本地上传'}</Button>}
                        >
                            {
                                this.state.pictures.length > 0 ?
                                    <div className="pic-wall-container">
                                        <ul className="pic-container" style={{ width: 215 * this.state.pictures.length + 'px' }}>

                                            {this.state.pictures.map((item, index) => {
                                                return (
                                                    <ImageItem
                                                        key={index}
                                                        item={item}
                                                        deletePicture={(item) => { this.deletePicture(item) }}
                                                        showImageModal={(item) => { this.showImageModal(item) }}
                                                    />
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    :
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'cneter' }}>
                                        <Icon
                                            type='frown'
                                            style={{ fontSize: 20, color: '' }}
                                        />
                                        <text style={{ textAlign: 'center', marginTop: 10 }}>暂无照片</text>
                                    </div>

                            }

                            {
                                this.state.showPictureLocal ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <text
                                            style={{ display: 'inline-block', width: '150px', marginBottom: 10, fontSize: 13 }}
                                        >上传拍照图片</text>
                                        <Upload
                                            accept='image/*'
                                            action={Config.uploadimgUrl}
                                            listType="picture-card"
                                            onPreview={this.handlePreview}
                                            onChange={(info) => { this.handleChange(info, 2) }}
                                            onRemove={false}
                                        >
                                            <div>
                                                <Icon type="plus" />
                                                <div className="ant-upload-text">Upload</div>
                                            </div>
                                        </Upload>
                                    </div>
                                    : null
                            }
                        </Card>
                        <Card title="结论总结" bordered={true} className="mg-top20">
                            <div className="title-edit">
                                <div className="title-edit-row">
                                    <text>项目名称</text>
                                    <Input
                                        disabled={this.state.itemDisable}
                                        value={this.state.name}
                                        onChange={(e)=>{this.setState({
                                            name:e.target.value,
                                        })}}
                                    />
                                    <Button className="title-edit-rowbtn"
                                        onClick={()=>{this.setState({itemDisable:false})}}
                                    >编辑</Button>
                                </div>
                                {/* <div className="title-edit-row">
                                    <text>委托单位</text>
                                    <Input
                                        disabled={this.state.danweiDisable}
                                        value='华东交通大学机械学院'
                                    />
                                    <Button className="title-edit-rowbtn"
                                        onClick={()=>{this.setState({danweiDisable:false})}}
                                    >编辑</Button>
                                </div>
                                <div className="title-edit-row">
                                    <text>文件编号</text>
                                    <Input
                                        disabled={this.state.wenjianDisable}
                                        value='华东交通大学机械学院'
                                    />
                                    <Button className="title-edit-rowbtn"
                                        onClick={()=>{this.setState({wenjianDisable:false})}}
                                    >编辑</Button>
                                </div> */}
                                <div className="title-edit-row-word">
                                    <text>请选择生成结果的word模版</text>
                                    <div className="word-myitem">
                                    <ul className="word-container" style={{ width:210*this.state.allWordItem.length}}>
                                            {this.state.allWordItem.map((item, index) => {
                                                return (
                                                    <li className="word-wall" key={index} 
                                                    style={{backgroundColor: this.state.docTempId===item.id? '#FFDEAD':'#e7e7e7'}}
                                                    >
                                                        <WordItem  
                                                            data={item}
                                                            choosewordItem={(json)=>{this.choosewordItem(json)}}  
                    
                                                        />
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Input
                                type='textarea'
                                placeholder='请输入结论总结'
                                autosize={{ minRows: 12 }}
                                rows='6'
                                className="summary-content"
                                value={this.state.result}
                                onChange={(e) => { this.setState({ result: e.target.value }) }}
                            />
                            <div className="summary-btn">
                                <div style={{ display: 'flex', flexDirection: "row", marginTop: 10, alignItems: 'center' }}>
                                    <Icon
                                        type='info-circle'
                                        style={{ size: 10, }}
                                    />
                                    <text
                                        style={{ size: 10, marginLeft: 10 }}
                                    >结论输入完成后，请按保存数据按钮将结论进行保存，然后下载文档</text>
                                </div>
                                <div
                                    style={{
                                        display: 'flex', flexDirection: 'row-reverse',
                                        marginBottom: 30, alignItems: 'center', marginTop: 20
                                    }}>
                                    <Button
                                        className="word-btn"
                                        size="large"
                                        onClick={() => { this.downLoadWordOffice() }}
                                    >生成word文档</Button>
                                    <Button

                                        className='save_result_btn'
                                        size='large'
                                        onClick={() => { this.saveWordMessage() }}

                                    >保存数据</Button>

                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Main;