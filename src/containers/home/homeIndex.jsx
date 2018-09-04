import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Row, Col, Card, Steps, Button, Message, message,Input, Modal, Carousel,Breadcrumb } from 'antd';
 import axios from 'axios';
const { TextArea } = Input;

//import styles from './style/home.less';
require('./style/home.less');
import Config from '../../config/index';

// 公共面包屑
import Bcrumb  from '../../component/bcrumb/bcrumb';
import BaseInfoComponent from './baseinfo';
import DataTable from './dataTable';
import LoginService from '../../services/loginService';
import MyCanvas from './mycanvas';
// import MyCanvas from './mycanvas';

const Step = Steps.Step;


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
             current: 0,
             previewVisible:false,
             width: 0,
             height: 0,
             imgStyle: {},
             isShowCanvas: false,
             currentUrl: '',
             pictures: [],
             result:'',
        };

        this.dataInfo = {}
    }
    componentWillMount() {
        this.dataInfo = JSON.parse(localStorage.getItem('tableObj'))   
        this.setState({
            result:this.dataInfo.result,
        });
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    getToken=()=>{
        console.log(Config.localKey.userToken);
        console.log('token'+Config.localItem(Config.localKey.userToken));
    }
    showImageModal(url){
        this.setState({
            previewVisible: true,
            currentUrl: url
        })
    }

    getAllPointPic() {
        LoginService.getListsketchmap(null,(response)=>{
            this.setState({
                pictures:response,
            });
          
        },(error)=>{
            console.log(error);
        })
    }

    cancelModal() {
        this.setState({
            previewVisible: false
        })
    }

    sketchMapApply = (val) => {
        this.dataInfo.sketchMap = val
        LoginService.updatereportslist(this.dataInfo,(response)=>{
            Message.success('替换点位示意图成功！')
            localStorage.setItem('tableObj', JSON.stringify(response))
        },(error)=>{
            console.log('error==='+ JSON.stringify(error));
            Message.error('替换点位示意图失败！')
            this.dataInfo = JSON.parse(localStorage.getItem('tableObj'))
        });
    }
    downLoadWordOffice=()=>{
        console.log('xxxxxxxxx');
        axios.get(Config.target+'/reports/export/'+this.dataInfo.id,{
            responseType:'blob',
            headers:{'Authorization':Config.localItem(Config.localKey.userToken)}
        })
        .then(function (response) {
         console.log(response);
         let url = window.URL.createObjectURL(new Blob([response.data]))
         let link = document.createElement('a')
         link.style.display = 'none'
         link.href = url
         link.setAttribute('download',' 测试.doc');
         document.body.appendChild(link)
         link.click()
        })
        .catch(function (error) {
            console.log(error);
        });
        // LoginService.downLoadWordOffice(this.dataInfo.id,(response)=>{
        //     console.log('chenggong');
        //     console.log(response);
        // },(error)=>{
        //     console.log('shibai');
        //     console.log(error);
        // });
    }
    //保存word 文档数据
    saveWordMessage=()=>{
         this.dataInfo.result=this.state.result;
         LoginService.updatereportslist(this.dataInfo,(response)=>{
            Message.success('结论保存成功');
            localStorage.setItem('tableObj',JSON.stringify(response));
         },(error)=>{
            Message.error('结论保存失败');
         });
    }
	render() { 
		return (
        <div className="home-container">
            {/* <Breadcrumb title="数据详情" historyroute="/List/list" historyTitle='数据展示'/>  */}
            <Bcrumb title="数据详情" historyTitle={'数据展示'} historyroute={'/List/list'}></Bcrumb>
            <Row>
            	<Col span={24}>
                    <Card  title="基本信息"  bordered={false} className="mg-top20">
                        <BaseInfoComponent  data={this.dataInfo}/>
                    </Card> 
                    <Card title="测量数据" bordered={true} className="mg-top20">
                       <DataTable data={this.dataInfo} ></DataTable>
                    </Card> 
                    <Card title="点位示意图" bordered={true} className="mg-top20">
                        <div className="point_pic">
                            <img src={this.dataInfo.sketchMap} alt="" style={{width: '300px', height: 'auto'}} onClick={()=>{this.showImageModal(this.dataInfo.sketchMap)}}/>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={() => {this.cancelModal()}}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.currentUrl} />
                            </Modal>
                        </div>
                        <div className="pic-wall-container">
                            <ul className="pic-container" style={{width: 215*this.dataInfo.pictures.length+'px'}}>
                                
                                {this.state.pictures.map( item => {
                                    return (
                                        <li className="pic-wall">
                                            <img src={item} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal(item)}}/>
                                            <Button className="point-btn" onClick={() => this.sketchMapApply(item)}>应用</Button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Card>
                    <Card title="照片" bordered={true} className="mg-top20">
                        <div className="pic-wall-container">
                            <ul className="pic-container" style={{width: 215*this.dataInfo.pictures.length+'px'}}>
                                
                                {this.dataInfo.pictures.map( item => {
                                    return (
                                        <li className="pic-wall">
                                            <img src={item} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal(item)}}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Card>
                    <Card title="结论总结" bordered={true} className="mg-top20">
                        <Input
                            type='textarea'
                            placeholder='请输入结论总结'
                            autosize={{ minRows: 12 }}
                            rows='6'
                            className="summary-content"
                            value={this.state.result}
                            onChange={(e)=>{this.setState({result:e.target.value})}}
                        />
                        <div className="summary-btn">
                            <Button className='' size='large' onClick={()=>{this.saveWordMessage()}}>保存数据</Button>
                            <Button className="word-btn" size="large" onClick={()=>{this.downLoadWordOffice()}}>生成word文档</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>	
		);
	}
}
export default Main;