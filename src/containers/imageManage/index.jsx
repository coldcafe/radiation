import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
<<<<<<< Updated upstream
import {Button,Upload,message}  from 'antd';
require('./style/index.less');
import LoginService from '../../services/loginService';
import { resolve } from 'url';

=======
import {Button,Upload,}  from 'antd';

require('./style/index.less')
>>>>>>> Stashed changes

 class ImageManage extends Component{
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< Updated upstream
            pictures: [],
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
=======
            pictures: []
>>>>>>> Stashed changes
        }
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
                <div className="pic-wall-container">
                    <ul className="pic-container">
                        {this.state.pictures.map((item, index) => {
                            return (
                                <li className="pic-wall" key={item.id}>
                                    <img src={item.pic} alt=""/>
                                </li>
                            )
                        })}
                    </ul>
                </div>
             </view>
        );
    }
}
export default ImageManage;