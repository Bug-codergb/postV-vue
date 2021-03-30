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
        store.commit({
            type:'changeResponse',
            response:{
                status:err.response.status,
                message:err.response.data
            }
        })
    })
    return instance(config);
}