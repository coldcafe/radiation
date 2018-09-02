import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import {Button,Upload,message}  from 'antd';
 class ImageManage extends Component{
    constructor(props) {
        super(props)
        this.state = {
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
                    <text>图片展示</text>
                </div>
             </view>
        );
    }
}
export default ImageManage;