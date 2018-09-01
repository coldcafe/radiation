import Xhr from './xhr/index';

/**
 * 封装ajax请求
 * @param {any}
 */

class LoginService {

    /**
     * 登录界面	
     * @param {username} 用户名
     * @param {password} 密码
     * @return {登录信息}
     */
    goLogin(params, success, fail) {  
            
        return Xhr.post('/users/login', params, success, fail);
    }

    goRegister(params,success,fail){        
        return Xhr.post('/users/registor',params,success,fail);
    }

    getUerList(params,success,fail){
        return Xhr.get('/users/list',params,success,fail);
    }

    getreportslist(params,success,fail){
        return Xhr.get('/reports/list',params,success,fail);
    }

    updatereportslist(params,success,fail){
        return Xhr.post('/reports',params,success,fail);
    }

}

// 实例化再导出
export default new LoginService();