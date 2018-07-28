import React,{Component} from 'react';
import { Table,Spin } from 'antd';

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

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            loading:true,
        }
    }
    componentDidMount(){
        this.creatMockData();
    }
    searchMessageWithUser=(message)=>{

    }
    searchMessageWithData=()=>{
        
    }

    creatMockData=()=>{
        var json={
            measurePerson:'小白',
            machineNO:'测试机器a',
            taskNO:'12345678',
            measuredAt:'18-01-18',
            type:'类型A',
            weather:'良好',
            address:'深圳市福田中心莲花一村',
            contactPerson:'深圳普瑞升科技有限公司',
            contactPersonTel:'15889563342',
            GPS:'154，188',
            details:'查看详情',
        }
        var arr=[];
        for(var i=0;i<200;i++){
            var taskNO=1000000+i;
            arr.push({...json,taskNO:taskNO});
        }
        this.setState({
            dataSource:arr,
            loading:false,
        })
    }   
    render(){
        return(
            <div>
                <Spin 
                    size={'large'}
                    spinning={true}
                    tip="载入中..."
                    spinning={this.state.loading}
                >
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                    > 
                    </Table>
                </Spin>
                
            </div>
        )
    }
}
export default List;
