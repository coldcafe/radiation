import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import jsonToken from 'jsonwebtoken';
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
		this.state = {
			openKeys: openKeys
		};
		let token = Config.localItem(Config.localKey.userToken);
		let userInfo = jsonToken.decode(token);
		this.role = userInfo.role;
	}
	onOpenChange = (openKeys) => {
		const state = this.state;
		const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
		const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = this.getAncestorKeys(latestCloseKey);
		}
		Config.localItem('OPENKEY', nextOpenKeys);
		this.setState({ openKeys: nextOpenKeys });
	}
	getAncestorKeys = (key) => {
		const map = {
			sub3: ['sub2'],
		};
		return map[key] || [];
	}
	render() {


		const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
		return (
			<Menu
				openKeys={this.state.openKeys}
				onOpenChange={this.onOpenChange}
				theme="dark" mode={this.props.mode}
				defaultSelectedKeys={defaultSelectedKey}
			>
				<Menu.Item key='list'>
					<Link to='/List/list'>
						<Icon type="laptop" />
						<span className='nav-text'>数据查看</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='Uploadlist'>
					<Link to='/upLoadlist/index'>
						<Icon type="laptop" />
						<span className='nav-text'>上传数据</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='imageManage'>
					<Link to='/imageManage/index'>
						<Icon type="laptop" />
						<span className='nav-text'>视图模版</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='wordmanage'>
					<Link to='/wordmanage/wordmanage'>
						<Icon type="laptop" />
						<span className='nav-text'>文档模版</span>
					</Link>
				</Menu.Item>
				{
					this.role === "superadmin" ?
						<Menu.Item key="user">
							<Link to="/user">
								<Icon type="user" />
								{!this.props.collapsed && <span className="nav-text">用户管理</span>}
							</Link>
						</Menu.Item>
						: null
				}
			</Menu>
		)
	}
}