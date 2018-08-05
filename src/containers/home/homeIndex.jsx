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
             imgStyle: {}
        };
    }
    json={
        measurePerson:'小白',
        machineNO:'测试机器a',
        taskNO:'12345678',
        measuredAt:'18-01-18',
        type:'类型A',
        weather:'良好',
        address:'深圳市福田中心莲花一村',
        contactPerson:'深圳普瑞升科技有限公司',
        contactPersonTel:'15889563342',
        GPS:'154，188',
        details:'查看详情',
    }
    componentDidMount(){
        console.log()
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
    showImageModal(){
        this.setState({previewVisible: true})
    }

    cancelModal() {
        this.setState({
            previewVisible: false
        })
    }

    // setImgSize(){
    //     let newImage = document.createElement('img')
    //     newImage.src = this.currentImg

    //     let width,height
    //     width = newImage.width
    //     height = newImage.height

    //     if(width > height){
    //         this.setState.imgStyle({
    //             width: '100%',
    //             height: '300px'
    //         })
    //     }
    //     if(width < height){
    //         this.setState.imgStyle({
    //             width: '200px',
    //             height: '100%'
    //         })
    //     }

    // }
    

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
                        <BaseInfoComponent  data={this.json}/>
                    </Card> 
                    <Card title="测量数据" bordered={true} className="mg-top20">
                       <DataTable data={[]} ></DataTable>
                    </Card> 
                    <Card title="点位示意图" bordered={true} className="mg-top20">
                        <div className="point_pic">
                            <img src={require("../../image/girl.jpg")} alt="" style={{width: '300px', height: 'auto'}} onClick={()=>{this.showImageModal()}}/>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={() => {this.cancelModal()}}>
                                <img alt="example" style={{ width: '100%' }} src={require("../../image/girl.jpg")} />
                            </Modal>
                        </div>
                    </Card>
                    <Card title="照片" bordered={true} className="mg-top20">
                        <div className="pic-wall-container">
                            <div className="pic-wall">
                                <img src={require("../../image/girl.jpg")} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal()}}/>
                            </div>
                            <div className="pic-wall">
                                <img src={require("../../image/1.jpg")} alt="" onClick={()=>{this.showImageModal()}}/>
                            </div>
                            <div className="pic-wall">
                                <img src={require("../../image/2.jpg")} alt="" onClick={()=>{this.showImageModal()}}/>
                            </div>
                            <div className="pic-wall">
                                <img src={require("../../image/3.jpg")} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal()}}/>
                            </div>
                            <div className="pic-wall">
                                <img src={require("../../image/4.jpg")} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal()}}/>
                            </div>
                        </div>
                    </Card>
                    <Card title="结论总结" bordered={true} className="mg-top20">
                        <Input
                            type='textarea'
                            placeholder='textarea内容'
                            autosize={{ minRows: 12 }}
                     
                        />
                        <Button>生成word文档</Button>
                    </Card>
                    <Card>
                        <MyCanvas/>
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