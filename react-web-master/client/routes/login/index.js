import  React from 'react';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import { Row, Col } from 'antd';
import  './index.scss';
const FormItem = Form.Item;
class Login extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
        //     <Row>
        //     <Col span={18} push={6}>col-18 col-push-6</Col>
        //     <Col span={6} pull={18}>col-6 col-pull-18</Col>
        // </Row>
            // <div style={{flex:1,flexDirection:'row'}}>
            //     <Row>
            //         <Col span={18} push={6}>col-18 col-push-6</Col>
            //         <Col span={6} pull={18}>col-6 col-pull-18</Col>
            //     </Row>
            // </div>
            <Form>
                <FormItem  onSubmit={this.handleSubmit} className="login-form">
                {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入你的账号' }],
                    })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                )}
                </FormItem>
                <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="" style={{ float: 'right'}}>Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{message.success('111')}}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
            </Form>
        )
    }
}

const LoginForm=Form.create()(Login);
module.exports= {LoginForm};

