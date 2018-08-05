import React,{Component} from 'react';
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import { Table,Spin ,Pagination,DatePicker,Input, Button} from 'antd';
import LoginService from '../../services/loginService';
import styles from './style/list.less';
import loginService from '../../services/loginService';
import moment from 'moment';
import { stringify } from 'querystring';
const RangePicker = DatePicker.RangePicker;

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
        render:(text)=><a href="javascript:;">查看详情</a>
    }];
const dateFormat = 'YYYY/MM/DD';
class List extends Component{
    constructor(props){
        super(props);
        this.state={
            length:null,
            dataSource:[],
            loading:true,
            measurePerson:null,
            address:null,
        }
        this.startTime=null;
        this.endTime=null;
    }
    componentDidMount(){
        this.getListInfo('','','','','');
    }
    searchMessageWithUser=(message)=>{
        
    }
    searchMessageWithData=()=>{
        
    }
    getListInfo=(startTime,endTime,address,limit,page)=>{
        var json={};
        if(startTime){
            json.startTime=startTime;
        }
        if(endTime){
            json.endTime=endTime;
        }
        if(this.state.address){
            json.address=this.state.address;
        }
        if(limit){
            json.limit=limit;
        }
        if(page){
            json.page=page;
        }
        LoginService.getreportslist(json,(response)=>{
            console.log(response);
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
    Pagination=(page)=>{
        return(
            <Pagination
                defaultCurrent={page}
                //defaultPageSize={3}
                pageSize={3}
                onShowSizeChange={(current, size)=>{this.onShowSizeChange(current,size)}}
                total={9}
            />
        )
    }
    //获取到时间
    onchangePicker=(message)=>{
        this.startTime=message[0].valueOf();
        this.endTime=message[1].valueOf();
    }
    //获取到测量人
    mesurePerson=(e)=>{
        console.log(e);
        this.setState({
            mesurePerson:e.target.value,
        });
      //  this.mesurePerson=e.e.target.value;
    }    
    //获取到输入address
    getAddress=(e)=>{
        his.setState({
            address:e.target.value,
        });
    }

    render(){
        return(
            <div >
                <Bcrumb title="数据展示" icon="user"></Bcrumb>
                <Spin 
                    size={'large'}
                    spinning={true}
                    tip="载入中..."
                    spinning={this.state.loading}
                >
                    <div className="search-body">
                        <div className="search-menu">
                            <span>时间</span>
                            <RangePicker  onChange={(message)=>{this.onchangePicker(message)}}/>
                        </div>
                        <div  className="search-menu">
                            <span >测量人</span>
                            <Input 
                                id={123}
                                value={this.state.mesurePerson}
                                onChange={(e)=>{this.mesurePerson(e)}}
                                
                            />
                        </div>
                        <div className="search-menu">
                            <span>测量地点</span>
                            <Input
                                id={234}
                                value={this.state.address}
                                onChange={(e)=>{this.getAddress(e)}}

                            />
                        </div>
                        <Button>搜索</Button>
                        
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={ this.Pagination() }
                    > 
                    </Table>
                </Spin>
                
            </div>
        )
    }
}
export default List;
