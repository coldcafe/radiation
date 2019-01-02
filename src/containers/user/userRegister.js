import React, { Component, PropTypes } from "react"; 
import { cloneDeep } from 'lodash';
import jsonToken from "jsonwebtoken";
import md5 from 'blueimp-md5'
import { Form, Select, Button, Input, Cascader, message } from "antd";
import loginService from "../../services/loginService";
import Config from "../../config";

const { Option } = Select;

class UserRegister extends React.Component {
  constructor() {
    super();
    let token = Config.localItem(Config.localKey.userToken);
    let userInfo = jsonToken.decode(token);
    this.role = userInfo.role;
    this.state = {
      roles: [],
      residences: [],
      if_select_areas: true,
      if_country_admin: false,
      if_create_company: false,
      selected_areas: '',
      companyAreaId: 0
    };
  }
  componentWillMount() {
    loginService.getRoles("", data => {
      this.setState({ roles: data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const params = {
          username: values.username,
          password: md5(values.password),
          role: values.role
        };
        // 如果是直接选择
        if (values.copy_password != values.password) {
          this.props.form.setFields({
            ['password']: {errors: ['两次输入密码不一致']},
            ['copy_password']: {errors: ['两次输入密码不一致']}
          })
        }
        if (this.state.if_country_admin) {
          loginService.goRegister(params, (data) => {
            message.success('创建用户成功!');
          });
          return;
        } else {
          if (this.state.if_select_areas) {
            let val = values.residence[values.residence.length - 1];
            if (values.role === 'companyadmin') {
              params.companyId = val;
            } else {
              params.areaId = val;
            }
          } else {
            params.companyName = values.company_name;
              params.companyAreaId = this.state.companyAreaId;
          }
          loginService.goRegister(params, (data) => {
            message.success('创建用户成功!');
          })
        }
      }
    });
  }

  onChange(val) {
    if (val === 'countryadmin') {
      this.setState({ if_country_admin: true, if_create_company: false, if_select_areas: false });
    } else if (val === 'auditor' || val === 'tester') {
      this.setState({if_country_admin: false, if_select_areas: false});
    } else {
      this.setState({if_country_admin: false, if_select_areas: true, if_create_company: false });
    }
    this.props.form.setFields({
      ['residence']: {value: []}
    })
    const params = {
      tRole: val
    };
    loginService.getUsersArea(params, data => {
      this.setState({ residences: this.createResidences(data) });
    });
  }

  selectAreas(val) {
    if (val.indexOf(999999) > -1) {
      this.setState({ if_select_areas: false, companyAreaId: val[val.length - 2], if_create_company: true, if_country_admin: false });
    }
    this.setState({ selected_areas: val });
  }

  handleClickSelectAreas() {
    this.setState({ if_select_areas: true, if_create_company: false });
  }

  createResidences(list) {
    return list.map((x, i) => {
      x.value = x.id;
      x.label = x.name;
      if (x.items instanceof Array && x.items.length > 0) {
        x.children = this.createResidences(x.items);
      } else {
        x.children = [];
      }
      return x;
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return <Form onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <Form.Item {...formItemLayout} label="身份" hasFeedback>
          {getFieldDecorator("role", {
            rules: [{ required: true, message: "请选择一个身份角色!" }]
          })(<Select placeholder="请选择一个身份角色" onChange={o => this.onChange(o)}>
              {this.state.roles.map((x, i) => <Option value={x.key} key={i}>
                  {x.name}
                </Option>)}
            </Select>)}
        </Form.Item>
        {!this.state.if_country_admin && this.state.if_select_areas && <Form.Item {...formItemLayout} label="省/市/区">
            {getFieldDecorator("residence", {
              initialValue: [],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "请选择省市区或者企业!"
                }
              ]
            })(<Cascader onChange={this.selectAreas.bind(this)} options={this.state.residences} placeholder="请选择省市区或者企业" />)}
          </Form.Item>}
        {!this.state.if_country_admin && this.state.if_create_company && <Form.Item {...formItemLayout} label="企业名" hasFeedback>
            {getFieldDecorator("company_name", {
              rules: [{ required: true, message: "请输入公司名!" }]
            })(<Input type="text" />)}
          </Form.Item>}
        {this.state.if_create_company && <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              onClick={() => this.handleClickSelectAreas()}
            >
              选择省市区企业
            </Button>
          </Form.Item>}
        <Form.Item {...formItemLayout} label="用户名" hasFeedback>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名!" }]
          })(<Input type="text" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码" hasFeedback>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="重复密码" hasFeedback>
          {getFieldDecorator("copy_password", {
            rules: [{ required: true, message: "请输入再次密码!" }]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>;
  }
}

export const WrappedUserRegister = Form.create()(UserRegister);
