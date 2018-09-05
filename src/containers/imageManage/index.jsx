import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import {Button,Upload,message,Modal}  from 'antd';
require('./style/index.less');
import LoginService from '../../services/loginService';
import { resolve } from 'url';


 class ImageManage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            pictures: [],
            previewVisible: false,
            currentUrl: ''
        }
    }
    getUploadSuccess=(info)=>{
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            //上传成功
           LoginService.upLoadsketchmap({pic:'http://coldcofe.cn:7000/api/'+info.file.response,},(response)=>{
                message.success('图片上传成功');
                this.getsketchmap();
           },(error)=>{
                message.error('图片上传失败');

           });
        } else if (info.file.status === 'error') {
            message.error('图片上传失败');
        }
    }
    cancelModal = () => {
        this.setState({
            previewVisible: false
        })
    }
    setCurrentUrl = (val) => {
        this.setState({
            currentUrl: val,
            previewVisible: true
        })
    }
    getsketchmap=()=>{
        LoginService.getListsketchmap(null,(response)=>{
            this.setState({
                pictures:response,
            });
          
        },(error)=>{

            console.log(error);
        })
    }
    componentDidMount(){
        this.getsketchmap();
    }
    render() {
        return (
             <view>
                 <LevelBcrumb title="视图模版"/>
                <div>
                    <Upload 
                        accept='image/*'
                        action='http://coldcofe.cn:7000/upload'
                        onChange={(info)=>{
                            this.getUploadSuccess(info)
                        }}     
                    >
                        <Button type="upload">上传点位示意图</Button>
                    </Upload>
                </div>
                <div>
                    <ul className="pic-container">
                        {this.state.pictures.map((item, index) => {
                            return (
                                <li className="pic-wall large-view" key={item.id} onClick={() => {this.setCurrentUrl(item.pic)}}>
                                    <img src={item.pic} alt="" style={{width: '200px', height: 'auto'}}/>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <Modal visible={this.state.previewVisible} footer={null} onCancel={() => {this.cancelModal()}}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.currentUrl} />
                </Modal>
             </view>
        );
    }
}
export default ImageManage;