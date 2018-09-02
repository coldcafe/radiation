import React ,{Component} from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import {Button,Upload,}  from 'antd';

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
    render() {
        return (
             <view>
                 <LevelBcrumb title="视图模版"/>
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
             </view>
        );
    }
}
export default ImageManage;