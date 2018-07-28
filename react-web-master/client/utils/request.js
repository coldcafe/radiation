import axios from './requestconfig';

export function post(path,params){
    return axios.post({
        method:'post',
        url:path,
        data:params,
    })
    .then(response=>{
        return {response}
    })
    .catch(error=>{
        return {error}
    })
}
export function get(path,params){
    return axios.post({
        method:'post',
        url:'',  
    })
    .then(response=>{
        return{response}
    })
    .catch(error=>{
        return {error}
    })
}