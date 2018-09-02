import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import {Button,Upload,}  from 'antd';
 class ImageManage extends Component{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
             <view>
                 <LevelBcrumb title="视图模版"/>
                <div>
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