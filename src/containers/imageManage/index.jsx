import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import {Button,Upload,message}  from 'antd';
require('./style/index.less')

 class ImageManage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            pictures: [
                "http://og9yqjant.bkt.clouddn.com/first/1.jpg",
                "http://og9yqjant.bkt.clouddn.com/first/2.jpg", 
                "http://og9yqjant.bkt.clouddn.com/first/3.jpg",
                "http://og9yqjant.bkt.clouddn.com/first/1.jpg",
                "http://og9yqjant.bkt.clouddn.com/first/2.jpg", 
                "http://og9yqjant.bkt.clouddn.com/first/3.jpg"
            ]
        }
    }
    beforeUpload=(file)=>{
        const isJPG = file.type === 'image/*';
        if (!isJPG) {
          message.error('点位示意图只能是图片，请上传图片');
        }
        return isJPG;
      }
    render() {
        return (
             <view>
                 <LevelBcrumb title="视图模版"/>
                <div>
                    <Upload 
                        accept='image/*'
                        name='file'
                        action='http://coldcofe.cn:7000/api/15160922dddd52.png?type=UPLOAD_FILE'
                        // beforeUpload={this.beforeUpload}
                    >
                        <Button type="upload">上传点位示意图</Button>
                    </Upload>
                    <text>上传按钮</text>
                </div>
                <div>
                 <text>点位示意图模版</text>
                 <div className="pic-wall-container">
                    <ul className="pic-container">
                        {this.state.pictures.map( (item, index) => {
                            return (
                                <li className="pic-wall" key={index}>
                                    <img src={item} alt=""/>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
             </view>
        );
    }
}
export default ImageManage;