import React,{Component} from 'react';
import { Table,Spin ,Pagination,DatePicker,Input, Button} from 'antd';
import LoginService from '../../services/loginService';
import styles from './style/list.less';
import loginService from '../../services/loginService';
import moment from 'moment';
import { stringify } from 'querystring';
import { BrowerRouter as Router, Route, Link} from 'react-router'
const RangePicker = DatePicker.RangePicker;
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';



const dateFormat = 'YYYY/MM/DD';
class List extends Component{
    constructor(props){
        super(props);
        this.state={
            length:null,
            dataSource:{},
            loading:true,
            mesurePerson:null,
            address:null,

            
        }
        this.startTime=null;
        this.endTime=null;
        this.page=1;
        this.limit=10;
    }
    componentDidMount(){
        this.getListInfo();
    }
    searchMessageWithUser=(message)=>{
        
    }
    searchMessageWithData=()=>{
        
    }
    toDetail(data) {
        let obj = JSON.stringify(data)
        localStorage.setItem('tableObj', obj)
    }
    getListInfo=()=>{
        var json={};
        if(this.startTime){
            json.startTime=this.startTime;
        }
        if(this.endTime){
            json.endTime=this.endTime;
        }
        if(this.state.address){
            json.address=this.state.address;
        }
        if(this.state.mesurePerson){
            json.username=this.state.mesurePerson;
        }
        if(this.limit){
            json.limit=this.limit;
        }
        if(this.page){
            json.page=this.page;
        }
        LoginService.getreportslist(json,(response)=>{
            this.setState({
                dataSource:response,
                loading:false,
            })
        },(error)=>{
            console.log('error==='+ JSON.stringify(error));
            this.setState({
                loading:false,
            })

        });
    }
    onShowSizeChange=(current,size)=>{
        
    }
    //获取到时间
    onchangePicker=(message)=>{
        console.log(message);
        if(message.length>0){
            this.startTime=parseInt(message[0].valueOf()/1000);
            this.endTime=parseInt(message[1].valueOf()/1000) ;
            this.page=1;
        }else{
            this.startTime=null;
            this.endTime=null;
            this.page=1;
        }
       
    }
    //获取到测量人
    mesurePerson=(e)=>{
        console.log(e);
        this.page=1;
        this.setState({
            mesurePerson:e.target.value,
        });
    }    
    //获取到输入address
    getAddress=(e)=>{
        this.page=1;
        his.setState({
            address:e.target.value,
        });
    }
    onClickToSearch=()=>{
        this.getListInfo();
    }
    render(){
        let self = this
        const columns=[{
            title:'测量人',
            dataIndex:'measurePerson',
            align:'center',
        },{
            title:'仪器型号和编号',
            dataIndex:'machineNO',
            align:'center',
        },{
            title:'任务编号',
            dataIndex:'taskNO',
            align:'center',
        },{
            title:'测量时间',
            dataIndex:'measuredAt',
            align:'center',
        },{
            title:'检查类别',
            dataIndex:'type',
            align:'center',
        },{
            title:'天气状况',
            dataIndex:'weather',
            align:'center',
        },{
            title:'测量地址',
            dataIndex:'address',
            align:'center',
        },{
            title:'被检测单位联系人',
            dataIndex:'contactPerson',
            align:'center',
        },{
            title:'被检测单位联系人电话',
            dataIndex:'contactPersonTel',
            align:'center',
        },{
            title:'GPS地址',
            dataIndex:'GPS',
            align:'center',
        },{
            title:'详情',
            dataIndex:'details',
            render:(text, record, index)=><Link to="/home" onClick={() => self.toDetail(record)}>查看详情</Link>
        }]
        return(
            // icon="user"
            <div >
                <LevelBcrumb title="数据展示"/>
                <Spin 
                    size={'large'}
                    spinning={true}
                    tip="载入中..."
                    spinning={this.state.loading}
                >
                    <div className="search-body">
                        <div className="search-menu">
                            <span>时间</span>
                            <RangePicker 
                                className="search-input"  
                                onChange={(message)=>{this.onchangePicker(message)}}
                                />
                        </div>
                        <div  className="search-menu">
                            <span >测量人</span>
                            <Input 
                                className="search-input"
                                id={123}
                                value={this.state.mesurePerson}
                                onChange={(e)=>{this.mesurePerson(e)}}
                                
                            />
                        </div>
                        <div className="search-menu">
                            <span>测量地点</span>
                            <Input
                                className="search-input"
                                id={234}
                                value={this.state.address}
                                onChange={(e)=>{this.getAddress(e)}}

                            />
                        </div>
                        <Button onClick={()=>{this.onClickToSearch()}}>搜索</Button>
                        
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource.reports}
                        rowKey={(item)=>item.id}
                        pagination={false}
                    > 
                    </Table>
                    <Pagination 
                        defaultCurrent={1} 
                        total={this.state.dataSource.count} 
                        pageSize={10}
                        current={this.page}
                        onChange={(page,pageSize)=>{
                            this.page=page;
                            this.getListInfo();
                        }}
                        style={{marginTop: 20}}
                    />
                </Spin>
                
            </div>
        )
    }
}
export default List;
