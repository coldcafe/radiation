import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Row, Col, Card, Steps, Button, message,Input, Modal, Carousel } from 'antd';
const { TextArea } = Input;
//import styles from './style/home.less';
require('./style/home.less');
import Config from '../../config/index';

// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import BaseInfoComponent from './baseinfo';
import DataTable from './dataTable';
import MyCanvas from './mycanvas';

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
             currentUrl: ''
        };

        this.dataInfo = {}
    }
    componentWillMount() {
        this.dataInfo = JSON.parse(localStorage.getItem('tableObj'))
        console.log(this.dataInfo);
        
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

    cancelModal() {
        this.setState({
            previewVisible: false
        })
    }

    setCanvas = () => {
        let flag = !this.state.isShowCanvas
        this.setState({
            isShowCanvas: flag
        })
    }
    

	render() { 
        let linkHtml = '<link href="/antd/dist/app.css" rel="stylesheet" />';
        const steps = [{
          title: '下载',
          content: '<p>$&nbsp;&nbsp;&nbsp;git clone</p><p>$&nbsp;&nbsp;&nbsp;git clone https://github.com/sosout/react-antd.git</p><p>$&nbsp;&nbsp;&nbsp;cd react-antd</p>',
        }, {
          title: '安装',
          content: '<p>// 安装前请先确保已安装node和npm</p><p>// 安装成功后,再安装依赖，如果之前有用npm安装过，请先删掉node_modules</p><p>$&nbsp;&nbsp;&nbsp;yarn install</p>',
        }, {
          title: '运行',
          content: '<p>$&nbsp;&nbsp;&nbsp;yarn run dev （正常编译模式，注意：index.html里必须手动引用app.css，<link href="/antd/dist/app.css" rel="stylesheet" />，否则没有样式）</p><p>$&nbsp;&nbsp;&nbsp;yarn run hot （热替换编译模式，注意：热替换模式下index.html里去掉引用app.css）</p><p>$&nbsp;&nbsp;&nbsp;yarn run dist （发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件）</p>',
        }];
        const { current } = this.state;
		return (
        <div className="home-container">
            <Bcrumb title="快速入门" />
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
                            <img src={require("../../image/girl.jpg")} alt="" style={{width: '300px', height: 'auto'}} onClick={()=>{this.showImageModal(require("../../image/girl.jpg"))}}/>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={() => {this.cancelModal()}}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.currentUrl} />
                            </Modal>
                        </div>
                        <div>
                            <Button onClick={this.setCanvas}>编辑</Button>
                        </div>
                    </Card>
                    <Card style={{display: this.state.isShowCanvas?'block':'none'}}>
                        <MyCanvas/>
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
                        />
                        <div className="summary-btn">
                            <Button className="word-btn" size="large">生成word文档</Button>
                        </div>
                    </Card>
                    {/* <Card title="项目上手" className="mg-top20">
                        <Steps current={current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content" dangerouslySetInnerHTML={{__html: steps[this.state.current].content}}></div>
                        <div className="steps-action">
                          {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>下一步</Button>
                          }
                          {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('恭喜您，大牛!')}>完成</Button>
                          }
                          {
                            this.state.current > 0
                            &&
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                              上一步
                            </Button>
                          }
                        </div>
                    </Card> 
                    <Card title="访问" className="mg-top20">
                        <p>在浏览器地址栏输入http://127.0.0.1:8888</p>
                    </Card> 
                    <Card title="项目说明" className="mg-top20">
                        <p>此项目是本人空余时间搭建的。希望大家提供宝贵的意见和建议，谢谢。</p>
                    </Card>  */}
                </Col>
            </Row>
        </div>	
		);
	}
}
export default Main;