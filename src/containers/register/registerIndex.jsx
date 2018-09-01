import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { Message,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './register.less';
import loginService from '../../services/loginService';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  
class Register extends React.Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };


      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let username=values.username;
            let password=values.password;
            let registerParams={
              username,
              password,
            }
            console.log(registerParams);
            loginService.goRegister(registerParams,(response)=>{
              Message.success('注册账号成功',1,(close)=>{
                browserHistory.push('/login');
              });
            },(error)=>{
              Message.error(error.message);
            });
          }
        });
      }
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
      
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        console.log(value.length);
        if(value.length<6||value.length>16){
          callback('请输入密码,密码为6-16位');
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('输入的密码不一致');
        } else {
          callback();
        }
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        );
    
        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    
        return ( 
            <div className="login-container">
                <div className='login-form'>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="item-name">
						<text >辐射检测后台管理系统</text>
						</div>
                        <FormItem {...formItemLayout} label="账号">
                            {getFieldDecorator('username', {
                                    rules: [{
                                        required: true, message: '请输入账号，账号为唯一的登录方式',
                                        }],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [ {
                                validator: this.validateToNextPassword,}],
                                })(<Input type="password" />)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认密码',
                                    },{
                                        validator: this.compareToFirstPassword,}],
                                })(<Input type="password" onBlur={this.handleConfirmBlur}/>)
                            }
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </div>
            
            </div>
          
         );
      }
    
}

const RegisterForm =Form.create()(Register);
export default RegisterForm;



