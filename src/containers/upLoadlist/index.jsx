import React, {Component} from 'react';
import {Button,Card,Modal,Form,Input,Col,Row,Upload,Icon,message} from 'antd';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import Basis from './ basis';
import UpLoadTable from './upLoadTable';
import LoginService from '../../services/loginService';
import Config from '../../config';
require('../home/style/home.less');
const FormItem = Form.Item

// 逻辑是这样的 。 this.data   //总的数据合并在这里
//  address：'' 当前输入的测量位置
//pictures ：//  拍照的url 
// currentRow ；// 当前的输入测量位置
//
// sketchMap；  //点位示意图的url
// pictures ： //拍照的url

// measureData :  // 测量的数据数组

export default class UploadList extends Component{
    constructor(props){
        super(props);
        this.state={
            isShowListModel:false,
            currentRow:['','','','','','','','','','','','',''],
            address:'',//  测量位置
            down:false,
            measureData:[],
        }
        this.data={};
        this.sketchMap='';// 点位示意图的url
        this.pictures=[];  //拍照的url
    }
    addUpLoadList=()=>{
        this.setState({
            isShowListModel:true,
            currentRow:['','','','','','','','','','','','',''],
            address:'',
        });
    }
    cancelModal=()=>{
        this.setState({
            isShowListModel:false,
        })
    }

    // 添加measureData
    pushDataTodata=()=>{
        var json={K:'0',measurePoint:this.state.address,values:this.state.currentRow.join(",")};
        this.setState({
            measureData:this.state.measureData.concat(json),
            isShowListModel:false,
            currentRow:['','','','','','','','','','','','','',],
        });
    }

    // 修改 currentRow的数据
    changeInput=(e,index)=>{
        var arr=[];
          this.state.currentRow.map((item,index)=>{
              arr.push(item);
          })
        arr[index]=e.target.value;
        this.setState({
            currentRow:arr,
        });
    }

    //点位示意图的modal隐藏按钮
    handleCancel=()=>{
        this.setState({
            previewVisible:false,
        })
    }
    //点位示意图的modal 的
    handlePreview=(file)=>{

        this.setState({
            previewVisible:true,
            previewImage:file.thumbUrl,
        })
    }
    //改变 sketmap和pictures
    handleChange=(info,type)=>{
        if(type==1){  //如果是1 那么就是上传的是点位示意图
            if(info.file.status=='done'){
                console.log(2);
                this.sketchMap=Config.target+'/file/files'+info.file.response;
            }
        }else{
            if(info.file.status=='done'){
                console.log(1);
                this.pictures=this.pictures.concat(Config.target+'/file/files'+info.file.response);
            }
        }
    }
    //上传消息的按钮
    upLoadListMessage=()=>{
        this.setState({
            down:true,
        })
        var baseInfo=this.refs.basisInfo.getBaseInfo();
        if(!baseInfo){
            return;
        }
        this.data={...baseInfo,pictures:this.pictures,sketchMap:this.sketchMap,data:this.state.measureData};
        LoginService.creatreportslist(this.data,(response)=>{
            message.success('上传数据成功');
            location.reload();
        },(error)=>{
            this.setState({
                down:false,
            })
            message.error('上传数据失败');
        });
    }
    // 添加measureData 的数据，删除 ，修改  删除 type ==0 ，修改 type==1
    changemeasureData=(json,type,index)=>{
        if(type===0){
            // 是0 的话就是删除
            var arr=this.state.measureData;
            arr.splice(index,1);
            this.setState({
                measureData:arr,
            });
        }else if(type==1){
            //如果是1的话那么就是修改数据
            var arr=this.state.measureData;
            arr[index]=json;
            this.setState({
                measureData:arr
            });
        }
    }

    render(){
        return(
            <div>
                <LevelBcrumb title="数据展示"/>
                <Card title="基本信息"  bordered={false}>
                    <Basis ref="basisInfo" />
                </Card >
                <Card title="测量数据"  bordered={false} className="mg-top20">
                    <UpLoadTable  
                        data={this.state.measureData}
                        changemeasureData={this.changemeasureData}
                    />
                    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                    <Button  type="primary" size="large" onClick={()=>{this.addUpLoadList()}}
                        style={{marginTop:20}}
                    >添加测量数据</Button>
                    </div>
                    
                </Card>
                <Card title="上传照片"  bordered={false} className="mg-top20">
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <text 
                            style={{display: 'inline-block', width: '150px',marginBottom:10,fontSize:13}}
                        >上传点位示意图</text>
                        <Upload
                            accept='image/*'
                            action= {Config.target+"/file/upload/"}
                            listType="picture-card"
                            onPreview={this.handlePreview}
                            onChange={(info)=>{this.handleChange(info,1)}}
                            onRemove={false}
                        >
                            <div>
                                <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}> 
                        <text 
                            style={{display: 'inline-block', width: '150px',marginBottom:10,fontSize:13}}
                        >上传拍照图片</text>
                        <Upload
                            accept='image/*'
                            action={Config.target+"/file/upload"}
                            listType="picture-card"
                            onPreview={this.handlePreview}
                            onChange={(info)=>{this.handleChange(info,2)}}
                            onRemove={false}
                        >
                        <div>
                            <Icon type="plus" />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                        </Upload>
                    </div>
                    <div>
                        
                    </div>
                </Card>
                <Card className="mg-top20" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                    <Button  type="primary" size="large"  onClick={()=>{this.upLoadListMessage()}} loading={this.state.down}>上传数据</Button>
                </Card>
                <div style={{height:50}}></div>
                <Modal visible={this.state.isShowListModel} title="编辑" width={600} 
                    //footer={null} 
                    onCancel={() => { this.cancelModal() }}
                    onOk={()=>{this.pushDataTodata()}}
                >
                    <div style={{ padding: '20px 5px' }}>
                        <Form
                            className="ant-advanced-search-form"
                            layout="inline"
                        >
                            <Row style={{display:'flex',flexDirection:'row',marginBottom:20}}>
                                <div 
                                    style={{ flexDirection:'row',display:'flex',marginLeft:0,alignItems:'center'}}
                                >
                                    <text >测量位置:</text>
                                </div>
                                <Input
                                    value={this.state.address}
                                    onChange={(e)=>{this.setState({address:e.target.value})}}
                                    style={{width:435,marginLeft:10,display:'block'}}
                                />
                            </Row>
                            <Row gutter={24}>
                                {this.state.currentRow.slice(0, 10).map((item, index) => {
                                    return (
                                        <Col span={8} key={index} style={{ border: 0 }}>
                                            <FormItem label={index + 1}>
                                                <Input  style={{ width: '90px' }} value={this.state.currentRow[index]} onChange={(e) => this.changeInput(e, index)}></Input>
                                            </FormItem>
                                        </Col>
                                    )
                                })}
                            </Row>
                            <Row>
                                <Col span={8} key={10} style={{ border: 0 }}>
                                    <FormItem label="均值R">
                                        <Input  style={{ width: '90px' }} value={this.state.currentRow[10]} onChange={(e) => this.changeInput(e, 10)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={11} style={{ border: 0 }}>
                                    <FormItem label="标准差">
                                        <Input  style={{ width: '90px' }} value={this.state.currentRow[11]} onChange={(e) => this.changeInput(e, 11)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={12} style={{ border: 0 }}>
                                    <FormItem label="结果D">
                                        <Input  style={{ width: '90px' }} value={this.state.currentRow[12]} onChange={(e) => this.changeInput(e, 12)}></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}




