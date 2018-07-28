import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './register.less';

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
            console.log('Received values of form: ', values);
          }
        });
      }
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('输入的密码不一致');
        } else {
          callback();
        }
      }
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback('请输入密码,密码为6-16位');
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
                            {getFieldDecorator('account', {
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
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                })(<Checkbox>I have read the <a href="">agreement</a></Checkbox>)
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



