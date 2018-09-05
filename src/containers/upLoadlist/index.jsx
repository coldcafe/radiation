import React, {Component} from 'react';
import {Button,Card,Modal,Form,Input,Col,Row,Upload,Icon,message} from 'antd';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import Basis from './ basis';
import UpLoadTable from './upLoadTable';
import LoginService from '../../services/loginService';
require('../home/style/home.less');
const FormItem = Form.Item
export default class UploadList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            isShowListModel:false,
            currentRow:['','','','','','','','','','','','',''],
            address:'',//  测量位置
            sketchMap:'',// 点位示意图的url
            pictures:[],  //拍照的url
            down:false,
        }
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
    pushDataTodata=()=>{
        var json={K:'0',measurePoint:this.state.address,values:this.state.currentRow.join(",")};
        var newdata=this.state.data;
        var row=this.state.data.data ?this.state.data.data:[];
        row.push(json);
        newdata.data=row;
        this.setState({
            data:newdata,
            isShowListModel:false,
            currentRow:['','','','','','','','','','','','','',],
            previewVisible:false,
        });
    }
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
    handleChange=(info,type)=>{
        if(type==1){  //如果是1 那么就是上传的是点位示意图
            if(info.file.status=='done'){
                console.log(2);
                this.setState({
                    sketchMap:'http://coldcofe.cn:7000/api/'+info.file.response,
                });
            }
        }else{
            if(info.file.status=='done'){
                console.log(1);

                this.setState({
                    pictures:this.state.pictures.concat('http://coldcofe.cn:7000/api/'+info.file.response),
                });
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
        var upJson={...baseInfo,...this.state.data,pictures:this.state.pictures,sketchMap:this.state.sketchMap};
        LoginService.creatreportslist(upJson,(response)=>{
           message.success('上传数据成功');
           this.setState({
               down:false,
           })
        },(error)=>{
            message.error('上传数据失败');
        });
    }
    render(){
        return(
            <div>
                <LevelBcrumb title="数据展示"/>
                <Card title="基本信息"  bordered={false}>
                    <Basis ref="basisInfo" />
                </Card >
                <Card title="测量数据"  bordered={false} className="mg-top20">
                    <UpLoadTable  data={this.state.data}/>
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
                            action="http://coldcofe.cn:7000/upload"
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
                            action="http://coldcofe.cn:7000/upload"
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
                            <Row>
                                <text>测量位置</text>
                                <Input
                                    value={this.state.address}
                                    onChange={(e)=>{this.setState({address:e.target.value})}}
                                />
                            </Row>
                            <Row gutter={24}>
                                {this.state.currentRow.slice(0, 10).map((item, index) => {
                                    return (
                                        <Col span={8} key={index} style={{ border: 0 }}>
                                            <FormItem label={index + 1}>
                                                <Input placeholder="placeholder" style={{ width: '90px' }} value={this.state.currentRow[index]} onChange={(e) => this.changeInput(e, index)}></Input>
                                            </FormItem>
                                        </Col>
                                    )
                                })}
                            </Row>
                            <Row>
                                <Col span={8} key={10} style={{ border: 0 }}>
                                    <FormItem label="均值R">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} value={this.state.currentRow[10]} onChange={(e) => this.changeInput(e, 10)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={11} style={{ border: 0 }}>
                                    <FormItem label="标准差">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} value={this.state.currentRow[11]} onChange={(e) => this.changeInput(e, 11)}></Input>
                                    </FormItem>
                                </Col>
                                <Col span={8} key={12} style={{ border: 0 }}>
                                    <FormItem label="结果D">
                                        <Input placeholder="placeholder" style={{ width: '90px' }} value={this.state.currentRow[12]} onChange={(e) => this.changeInput(e, 12)}></Input>
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




