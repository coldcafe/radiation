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
                 <text>点位示意图模版</text>
             </view>
        );
    }
}

export default ImageManage;