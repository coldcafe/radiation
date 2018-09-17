import React,{ Component } from 'react';
import {Button} from 'antd';

export default class WordItem extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
        }
    }
    clickBtn=()=>{
        var json=this.props.data;
        console.log(json);
        this.props.choosewordItem(json);
    }

    componentWillReceiveProps(props){
        this.setState({
            data:props.data,
        });
    }
    //  chooseItem  当前被选择的模版
    render(){
        const {data,chooseItem}=this.state;
        return(
            <div className="word-wall-container" >
                <div className="word-wall-body">
                    <text className="word-wall-title">监测站</text>
                    <text className="word-wall-message">{data.title}</text>
                </div>
                <div className="word-wall-body">
                    <text className="word-wall-title">地址</text>
                    <text className="word-wall-message">{data.address}</text>
                </div>
                <div className="word-wall-body">
                    <text className="word-wall-title">电话</text>
                    <text className="word-wall-message">{data.tel}</text>
                </div>
                <div className="word-wall-body">
                    <text className="word-wall-title">传真</text>
                    <text className="word-wall-message">{data.facsimile}</text>
                </div>
                <div className="word-wall-body">
                    <text className="word-wall-title">邮编</text>
                    <text className="word-wall-message">{data.email}</text>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Button onClick={()=>{this.clickBtn()}}
                        style={{color:'white',backgroundColor:'#1478e3',width:70,height:30,}}
                    >应用</Button>
                </div>
                
            </div>
        )
    }

}