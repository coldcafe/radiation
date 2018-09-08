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
             previewVisible:false,      //展示点位示意图的modal
             showbaseInfoVisible:false,   //展示修改baseinfo 的modal
             currentUrl: '',   
             data:[],       //测量数据
             sketchMap:'',  // 点位示意图
             pictures: [],    //图片数据
             result:'',    //结果数据
             baseInfo:{},  //base 数据
             sketchPictures:[],  //点位示意图的模版数组

        };

        this.dataInfo = {}   //这个是总数据 ，
    }
    componentWillMount() {
        this.dataInfo = JSON.parse(localStorage.getItem('tableObj'))   
        this.changeAllDataWithJson();
        this.getAllPointPic()
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
        this.dataInfo.pic = val
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

    //获取baseinfo
    getBaseInfo=()=>{
        var json={...this.dataInfo}||{};
        delete json.data;
        delete json.result;
        delete json.sketchMap;
        delete json.pictures;
        console.log(json);
        return json;
    }
    //改变baseinfo
    changeBaseInfo=(baseinfo,success,fail)=>{
        LoginService.updatereportslist(baseinfo,response=>{
            console.log(response);
            this.dataInfo=response;
            this.changeAllDataWithJson();
            success();
        },error=>{
            fail();
        });
    }

    changeAllDataWithJson=()=>{
        var baseInfo=this.getBaseInfo();
        this.setState({
            sketchMap:this.dataInfo.sketchMap,
            data:this.dataInfo.data,
            pictures:this.dataInfo.pictures,
            baseInfo:baseInfo,
            result:this.dataInfo.result,
        });
    }


    // 添加measureData 的数据，删除 ，修改  删除 type ==0 ，修改 type==1
    changemeasureData=(json,type,index)=>{
        if(type===0){
            // 是0 的话就是删除
            var arr=this.state.data;
            arr.splice(index,1);
            var data={id:this.dataInfo.id, data:arr};
            LoginService.updatereportslist(data,response=>{
                message.success('删除数据成功');
                this.dataInfo=response;
                this.changeAllDataWithJson();
            },error=>{
                message.error('删除数据失败');
            });
        }else if(type==1){
            //如果是1的话那么就是修改数据
            var arr=this.state.data;
            json.id=arr[index].id
            arr[index]=json;
            var data={id:this.dataInfo.id, data:arr};
            LoginService.updatereportslist(data,response=>{
                console.log(response);
                message.success('修改数据成功');
                this.dataInfo=response;
                this.changeAllDataWithJson();
            },error=>{
                message.error('修改数据失败');
            });
        }else if(type==2){
            // 等于2就是新增加数据
            var arr=this.state.data;
            arr.push(json);
            var data={id:this.dataInfo.id, data:arr};
            LoginService.updatereportslist(data,response=>{
                message.success('添加数据成功');
                this.dataInfo=response;
                this.changeAllDataWithJson();
            },error=>{
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
                        extra={<Button onClick={()=>{
                            this.refs.BaseInfoComponent.showModal();
                        }}>编辑</Button>}
                    >
                        <BaseInfoComponent  
                            ref='BaseInfoComponent'
                            data={this.state.baseInfo}
                            changeBaseInfo={(baseInfo,success,error)=>{this.changeBaseInfo(baseInfo,success,error)}}
                        />
                    </Card> 
                    <Card title="测量数据" bordered={true} className="mg-top20">
                        <DataTable 
                            data={this.state.data} 
                            changemeasureData={this.changemeasureData}
                        ></DataTable>
                    </Card> 

                    <Card title="点位示意图" bordered={true} className="mg-top20">
                        <div className="point_pic">
                            <img src={this.state.sketchMap} alt="" style={{width: '300px', height: 'auto'}} onClick={()=>{this.showImageModal(this.dataInfo.sketchMap)}}/>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={() => {this.cancelModal()}}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.currentUrl} />
                            </Modal>
                        </div>
                        <div className="pic-wall-container">
                            <ul className="pic-container" style={{width: 215*this.state.pictures.length+'px'}}>
                                {this.state.pictures.map( item => {
                                    return (
                                        <li className="pic-wall">
                                            <img src={item.pic} alt="" style={{width: '200px', height: 'auto'}} onClick={()=>{this.showImageModal(item.pic)}}/>
                                            <Button className="point-btn" onClick={() => this.sketchMapApply(item.pic)}>应用</Button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Card>
                    <Card title="照片" bordered={true} className="mg-top20">
                        <div className="pic-wall-container">
                            <ul className="pic-container" style={{width: 215*this.state.pictures.length+'px'}}>
                                
                                {this.state.pictures.map( item => {
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