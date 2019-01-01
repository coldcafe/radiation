import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import {Table,Spin,Pagination,Modal,Button,Input,Row, Col,Message,Select} from 'antd';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
// 公共面包屑
import  LevelBcrumb  from '../../component/bcrumb/level1Bcrumb';
import loginService from '../../services/loginService';
import styles from './style/user.less';

const Option = Select.Option;





/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props, context) {
    	super(props, context);
        this.state = {
            loading: false,
			dataSource:[],
			loading:true,
			username:'',
			visible:false,
			registerName:'',
			registerPassword:'',
			deleteuserVisible:false,
			changeuserVisible:false,
			changeRole:'',
			registerRole:'',
		};
		this.page=1;
		this.limit=10;
		this.count=0;
		this.deleteUser={};
		this.changeuser={};
	}
	columns=[{
		title:'数量',
		dataIndex:'count',
		align:'center',
	},{
		title:'ID',
		dataIndex:'ID',
		align:'center',
	},{
		title:'用户名',
		dataIndex:'username',
		align:'center',
	},{
	
		title:'角色',
		dataIndex:'Character',
		align:'center',
	},{
		title:'编辑',
		dataIndex:'action',
		align:'center',
		render:(text,record,index)=>{
			
			return(
				<div>
					{record.Character!='超级管理员'?
					<div>
					<Button 
						onClick={()=>{this.showdeleteUserWithJSON(record)}}
						style={{backgroundColor:'transparent',borderColor:'transparent',color:'red'}}
					>删除</Button>
					<Button 
						onClick={()=>{this.showchangeUserCharacterWithJSON(record)}}
						style={{backgroundColor:'transparent',borderColor:'transparent',color:'#1478E3'}}
					>编辑</Button>
					</div>
					:
					null
					}
				</div>
				
			)
		}
	}];
	showdeleteUserWithJSON=(json)=>{
		this.deleteUser=json;
		console.log(this.deleteUser);
		this.setState({
			deleteuserVisible:true,
		});
	}
	deleteUserWithJSON=()=>{
		loginService.deleteUser(this.deleteUser.ID,(response)=>{
			Message.success('删除用户成功');
			this.setState({
				deleteuserVisible:false,
			});
			this.getUserList();
			
		},error=>{
			console.log(error);
			Message.error('删除用户失败');
			this.setState({
				deleteuserVisible:false,
			});
		})
	}
	showchangeUserCharacterWithJSON=(json)=>{
		this.changeuser=json;
		this.setState({
			changeuserVisible:true,
			changeRole:this.changeuser.Character,
		});
	}
	changeUserCharacterWithJSON=()=>{
		var role;
		if(this.state.changeRole==='审核人员'){
			role='checker';
		}else{
			role='user';
		}
		var json={id:this.changeuser.ID,role:role};
		loginService.changeUserRole(json,response=>{
			this.setState({
				changeuserVisible:false,
			});
			this.getUserList();
			Message.success('修改权限成功');
		},error=>{
			Message.error('修改权限失败');
		});
	}
	

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}
	componentDidMount(){
		this.getUserList();
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
					var role;
					if(item.role==='superadmin'){
						role='超级管理员';
					}else if(item.role==='checker'){
						role='审核人员';
					}else{
						role='测量人员'
					}
					var userjson={count:index,ID:item.id,username:item.username,Character:role};
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
		if(!this.state.registerRole){
			Message.error('请选择角色权限');
		}
		var role;
		if(this.state.registerRole==='审核人员'){
			role='checker';
		}else{
			role='user';
		}

		var json={
			username:this.state.registerName.toString(),
			password:this.state.registerPassword.toString(),
			role:role,
		}
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
	toDetail() {
		console.log(this.context)
		this.context.router.push('/userRegister')
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
						<Button onClick={()=>{this.toDetail()}}
						size='large'
						>添加用户</Button>
					</div>
                    <Table
                        columns={this.columns}
						dataSource={this.state.dataSource}
						pagination={false}
						rowKey={(item)=>item.ID}
						style={{marginTop:20}}
						style={{borderColor:'white',borderWidth:1,marginTop:20}}
                    >
                    </Table>
					<div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
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
					</div> 
					
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
						<div className="ipt-addUser">
							<Row>
								<Col span={4}>用户名</Col>
								<Col span={12}>
									<Input 
										value={this.state.registerName}
										onChange={this.onChangeregisterName}
									/>
								</Col>
							</Row>
							<Row style={{marginTop:20}}>
								<Col span={4}>密码</Col>
								<Col span={12}>
									<Input 
										value={this.state.registerPassword}
										onChange={this.onChangeegisterPassword}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>角色</Col>
								<Col span={12}>
									<Select
										value={this.state.registerRole}
										onChange={(value)=>{this.setState({registerRole:value})}}
										style={{display:'block'}}
									>
    									<Option value="审核人员">审核人员</Option>
    									<Option value="测量人员">测量人员</Option>
								</Select>
								</Col>
							</Row>
						</div>
					</Modal>
					<Modal
						visible={this.state.deleteuserVisible}
						onCancel={()=>{this.setState({deleteuserVisible:false})}}
						onOk={()=>{this.deleteUserWithJSON()}}
					>
						<div 
							style={{height:100,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}

						>
							<text 
								style={{fontSize:15,fontWeight:15,marginBottom:20,color:'black'}}
							>{'确定需要删除账号:'+this.deleteUser.username}</text>
							<text
								style={{fontSize:13}}
							>账号删除以后将无法找回</text>
						</div>
					</Modal>
					<Modal
						visible={this.state.changeuserVisible}
						onCancel={()=>{this.setState({changeuserVisible:false})}}
						onOk={()=>{this.changeUserCharacterWithJSON()}}
					>
						<div style={{height:100,display:'flex',flexDirection:'column',justifyContent:'center'}}>
							<div style={{flexDirection:"row",display:'flex',color:'black'}}>
								<text style={{width:120,textAlign:'right',fontSize:15}}>用户名:</text>
								<text style={{width:120,marginLeft:30,fontSize:15}}>{this.changeuser.username}</text>
							</div>
							
							<div
								style={{flexDirection:"row",display:'flex',marginTop:20,color:'black'}}
							>
								<text style={{width:120,textAlign:'right',fontSize:15}}>选择角色权限</text>
								<Select
									value={this.state.changeRole}
									onChange={(value)=>{this.setState({changeRole:value})}}
									style={{width:120,marginLeft:30,fontSize:15,color:'#1478E3'}}
								>
    								<Option value="审核人员">审核人员</Option>
    								<Option value="测量人员">测量人员</Option>
								</Select>
							</div>
							
						</div>
					</Modal>
					
                </Spin>
		</div>
		);
	}
}

Main.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Main;

