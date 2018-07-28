/**
 * 登录界面action
 * @return
 */
import { Message } from 'antd';
import { browserHistory } from 'react-router';
import Config from '../../../config/index';
import { RES_LOGIN, INITIAL_STATE } from '../../constants/loginTypes';
import LoginService from '../../../services/loginService';
import { loading } from '../index';
import {TOKEN} from '../../constants/dispatchTypes';

/**
 * 登录成功
 * @return
 */
const resLogin = (res) => {
    return {
        type: RES_LOGIN,
        res
    }
}



/**
 * 初始化数据
 * @return
 */
export const initialState = () => {
    return {
        type: INITIAL_STATE
    }
}

/**
 * token action
 * 
 */

const  getToken=(token)=>{
    return {
        type:TOKEN,
        token,
    }
}


/**
 * 登录界面	
 * @param {username} 用户名
 * @param {password} 密码
 * @return {登录信息}
 */

export const goLogin = (params) => {
    console.log(params);
    return dispatch => {
        dispatch(loading(true));
        LoginService.goLogin(params, (res) => {
            dispatch(loading(false));
            if(res){
                dispatch(getToken(res.token));
                Config.localItem(Config.localItem.userToken,res.token);
                browserHistory.push('/home');
            }else{
                Message.error('系统错误');
            }
        },(error)=>{
            dispatch(loading(false));
            Message.error(error.Message);
        })
    }
} 

