import axios from 'axios';
import store from '../store'
export function request(config)
{
    const instance=axios.create({
        baseURL:'http://localhost:7876',
        timeout:5000,
    })
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        console.log(err);
    })
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        console.log(err);
       const response={
           message:err.response.data,
           status:err.response.status
       }
       store.commit({
           type:'changeResponse',
           response
       })
    })
    return instance(config);
}