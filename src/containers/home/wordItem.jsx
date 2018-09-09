import React,{ Component } from 'react';
import {Button} from 'antd';

export default class WordItem extends Component{
    constructor(props){
        super(props);
    }
    clickBtn=()=>{
        var json={id:this.props.data.id}
        this.props.chooseWordItem(json);
    }
    render(){
        const {data}=this.props;
        return(
            <div>
                <div>
                    <text>监测站</text>
                    <text>{data.title}</text>
                </div>
                <div>
                    <text>地址</text>
                    <text>{data.address}</text>
                </div>
                <div>
                    <text>电话</text>
                    <text>{data.tel}</text>
                </div>
                <div>
                    <text>传真</text>
                    <text>{data.facsimile}</text>
                </div>
                <div>
                    <text>邮编</text>
                    <text>{data.email}</text>
                </div>
                <Button onClick={()=>{this.clickBtn()}}>应用</Button>
            </div>
        )
    }

}