import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import  jsonToken from 'jsonwebtoken';
import { is, fromJS } from 'immutable';
import { Layout, Menu, Icon } from 'antd';
import  COnfig from '../../config/index';
import Config from '../../config/index';
const SubMenu = Menu.SubMenu;
const { Header } = Layout;


/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
export class Lheader extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		this.state={
			userInfo:null,
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	toggle = () => {
		this.props.toggle(!this.props.collapsed);
  	}
  	logout= (e) => {
  		// 模拟退出
  		if(e.key == 'logout') {
	 		Config.removeLocalItem(Config.localKey.userToken);
	  		this.context.router.push({ 
				pathname: '/login' 
			});
  		}
	}
	componentWillMount(){
		let token=Config.localItem(Config.localKey.userToken);
		let userInfo=jsonToken.decode(token);
		console.log(userInfo);
		this.setState({
			userInfo:userInfo,
		});
	}	
	render() {
		return (
			<Header className="layout-header">
				<Icon 
					className="trigger" 
					style={{color:'#ffffff'}}
					type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} 
					onClick={this.toggle} 
				/>
				
				<text 
					style={{ color:'white',fontSize:23,fontWeight:23,lineHeight:'80px',
					float:'left',marginLeft:50,lineHeight:'80px'}}
				>辐射检测后台管理系统</text>
				
	            <Menu mode="horizontal" onClick={this.logout} className="layout-header-menu">
				<SubMenu 
					className="trigger-menu" 
					title={<span style={{display:'flex',flexDirection:'column'}}>
							<Icon 
								type="github" 
								theme="filled"
								style={{color:'#ffffff',fontSize:30,marginTop:10}}
							/>
							<text style={{color:'#ffffff'}}>
							{ this.state.userInfo&& this.state.userInfo.username}
							</text>
							</span>}
				>
		        	<Menu.Item key="logout">注销</Menu.Item>
		        </SubMenu>
			    </Menu>
	        </Header>
		)
	}
}

Lheader.contextTypes = {
    router: React.PropTypes.object.isRequired
};