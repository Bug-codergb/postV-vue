import {request} from '../request';
export function login(userName,password)
{
    return request({
        method:'post',
        url:'/user/login',
        data:{
            userName,
            password
        }
    })
}
/*注册*/
export function register(userName,password)
{
    return request({
        url:'/user/register',
        method:'post',
        data:{
            userName,
            password
        }
    })
}