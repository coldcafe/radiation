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

    //修改数据详情接口
    updatereportslist(params,success,fail){
        return Xhr.put('/reports',params,success,fail);
    }
    //创建一条数据
    creatreportslist(params,success,fail){
        return Xhr.post('/reports/upload',params,success,fail);
    }  

    //上传点位示意图模版
    upLoadsketchmap(params,success,fail){
        return Xhr.post('/reports/sketchmap',params,success,fail);
    }

    getListsketchmap(params,success,fail){
        return Xhr.get('/reports/sketchmap/list',params,success,fail);
    }
     //删除点位示意图模版
    deleteSketchmap(params,success,fail){
        return Xhr.delete('/reports/sketchmap/'+params,'',success,fail);
    }
    //下载doc 文档
    downLoadWordOffice(params,success,fail){
        return Xhr.down('/reports/export/'+params,'',success,fail);
    }

    //删除用户
    deleteUser(params,success,fail){
        return Xhr.delete('/users/'+params,'',success,fail);
    }
    //修改用户权限
    changeUserRole(params,success,fail){
        return Xhr.put('/users',params,success,fail);
    }

    //获取所有的item
    getAllWordItem(params,success,fail){
        return Xhr.get('/reports/doctemp/list',params,success,fail);
    }

    // 删除item
    deleteWordItem(params,success,fail){
        return Xhr.delete('/reports/sketchmap/'+params,null,success,fail);
    }
    // 增加item 
    addWordItem(params,success,fail){
        return Xhr.post('/reports/doctemp',params,success,fail);
    }
    // 删除列表项
    deleteListItem(params,success,fail){
        return Xhr.delete('/reports/doctemp/'+params,'',success,fail)
    }
   
    
}

// 实例化再导出
export default new LoginService();