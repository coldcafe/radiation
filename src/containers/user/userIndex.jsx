import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import {Table,Spin} from 'antd';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import loginService from '../../services/loginService';
import styles from './style/user.less';

const columns=[{
	title:'用户名',
	dataIndex:'username',
	align:'center',
},{
	title:'昵称',
	dataIndex:'nickname',
	align:'center',
},{
	title:'密码',
	dataIndex:'password',
	align:'center',
},{
	title:'编辑',
	dataIndex:'action',
	align:'center',
},];

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            loading: false,
			dataSource: [],
			loading:true,

        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}
	componentDidMount(){
		this.getUserList(1,15);
	}
	getUserList=(page,limit,username,nickname)=>{
		var json={
			page:page,
			limit:limit,
			username:username,
			nickname:nickname,
		}
		loginService.getUerList(json,(response)=>{
			console.log(response);
			this.setState({
				
				loading:false,
			})
		},(error)=>{
			console.log(error);
			this.setState({
				loading:false,
			})
		});
	}
	render() {
		return (	
		<div className="user-container">
            <Bcrumb title="用户管理" icon="user" />
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
		);
	}
}

Main.contextTypes = {
};

export default Main;

