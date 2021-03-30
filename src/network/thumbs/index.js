import {request} from '../request';
import store from '../../store/index'
export function thumbs(id)
{
    return request({
        url:'/thumbs',
        method:'post',
        params:{
            id
        },
        headers:{
          'authorization':store.state.userMsg.token
        }
    })
}
export function cancelThumb(id)
{
    return request({
        url:'/thumbs/delete',
        method:'post',
        params:{
            id
        },
        headers:{
            'authorization':store.state.userMsg.token
        }
    })
}