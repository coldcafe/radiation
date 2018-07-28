import axios from 'axios';
var instance = axios.create({
    baseURL:'https://www.baidu.com',
    timeout:1000,
    
});
export default instance;