import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import {Table,Spin,Pagination,Modal,Button,Input,Row, Col,Message} from 'antd';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
// 公共面包屑
import  LevelBcrumb  from '../../component/bcrumb/level1Bcrumb';
import loginService from '../../services/loginService';
import styles from './style/user.less';

const columns=[{
	title:'ID',
	dataIndex:'ID',
	align:'center',
},{
	title:'用户名',
	dataIndex:'username',
	align:'center',
},{
	title:'昵称',
	dataIndex:'nickname',
	align:'center',
}];
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            loading: false,
			dataSource:[],
			loading:true,
			username:'',
			visible:false,
			registerName:'',
			registerPassword:'',
		};
		this.page=1;
		this.limit=10;
		this.count=0;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}
	componentDidMount(){
		this.getUserList(1,15);
	}
	getUserList=()=>{
		var json={};
		json.page=this.page;
		json.limit=this.limit;
		if(this.state.username){
			json.username=this.state.username;
		}
		loginService.getUerList(json,(response)=>{
			console.log(response);
			var data=[];
			this.count=response.count;
			if(response.users.length>0){
				response.users.map((item,index)=>{
					var userjson={ID:item.id,username:item.username,nickname:item.nickname};
					data.push(userjson);
				});
			}
			this.setState({
				dataSource:data,
				loading:false,
				
			});
		},(error)=>{
			console.log(error);
			this.setState({
				loading:false,
			})
		});
	}
	pushtoRegister=()=>{
		if(!this.state.registerName){
			Message.error('请输入注册用户名');
			return;
		}
		if(!this.state.registerPassword){
			Message.error('请输入注册密码');
			return;
		}
		var json={
			username:this.state.registerName.toString(),
			password:this.state.registerPassword.toString(),
		}
		console.log(JSON.stringify(json));
		loginService.goRegister(json,(response)=>{
			this.setState({
				visible:false,
			});
			this.getUserList();
		},(error)=>{
			Message.error(error.message)
		});
	}
	onChangeregisterName=(e)=>{
		this.setState({
			registerName:e.target.value,
		})
	}
	onChangeegisterPassword=(e)=>{
		this.setState({
			registerPassword:e.target.value,
		});
	}
	render() {
		return (	
		<div className="user-container">
			<LevelBcrumb title="用户管理" icon="user"></LevelBcrumb>
			<Spin 
                    size={'large'}
                    spinning={true}
                    tip="载入中..."
                    spinning={this.state.loading}
                >
					<div>
						<Button onClick={()=>{this.setState({
							visible:true,
						})}}>添加用户</Button>
					</div>
                    <Table
                        columns={columns}
						dataSource={this.state.dataSource}
						pagination={false}
						rowKey={(item)=>item.ID}
                    > 
                    </Table>
					{
						this.count>0?
						<Pagination 
                        defaultCurrent={1} 
                        total={this.count} 
                        pageSize={10}
                        current={this.page}
                        onChange={(page,pageSize)=>{
                            this.page=page;
                            this.getUserList();
                        }}
						style={{marginTop: 20}}
                    	/>
						:null
					}
					<Modal
						visible={this.state.visible}
						onCancel={()=>{
							this.setState({
								visible:false,
							})
						}}
						onOk={()=>{
							this.pushtoRegister();
						}}
					>
						<div style={{width:300,height:200}}>
							<Row>
								<div span={4}>用户名</div>
								<Col span={8}>
									<Input 
										value={this.state.registerName}
										onChange={this.onChangeregisterName}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>密码</Col>
								<Col span={8}>
									<Input 
										value={this.state.registerPassword}
										onChange={this.onChangeegisterPassword}
									/>
								</Col>
							</Row>
						</div>
					</Modal>
					
                </Spin>
		</div>
		);
	}
}

Main.contextTypes = {
};

export default Main;

