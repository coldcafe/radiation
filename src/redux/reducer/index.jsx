import { fromJS } from 'immutable';
import { LOADING,TOKEN } from '../constants/dispatchTypes';

import Login from './login/loginReducer'; // 登录界面
import Config from '../../config/index';  // 获取到 本地token 
// 初始化state数据
const initialState = {
    loading: false,
    token:Config.localItem(Config.localKey.userToken),
};

/**
 * 公共reducer
 * @return
 */
const Common = (state = initialState, action) => {
    switch(action.type) {
        case LOADING: // 用于页面和区块的加载中状态
            return fromJS(state).merge({loading: action.loading}).toJS();
        case TOKEN :
             console.log(action.token);
            return fromJS(state).merge({token:action.token}).toJS();
        default:
            return state;
    }
}
export { Common, Login};