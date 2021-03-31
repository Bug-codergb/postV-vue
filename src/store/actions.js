import {login} from '@/network/login'
import {userDetail} from "@/network/user";
import {allMoments, momentDetail} from "@/network/home";
import {hotMoment} from "@/network/moment";
import {getTopListDetail} from "@/network/toplist";
export default{
    /*获取用户登录信息*/
    getUserMsgAction(context,payload)
    {
        const {userName,password}=payload
        return new Promise((resolve,reject)=>{
            login(userName,password).then(data=>{
                const {userId}=data;
                window.sessionStorage.setItem('userMsg',JSON.stringify(data));
                context.commit({
                    type:'changeUserMsg',
                    userMsg:data
                })
                context.dispatch({
                    type:"getUserDetailAction",
                    userId:userId
                })
                resolve(data)
            },err=>{
                reject(err)
            })
        })
    },
    /*获取用户详情*/
    getUserDetailAction(context,payload)
    {
       const {userId}=payload;
       userDetail(userId).then(data=>{
           window.sessionStorage.setItem('userDetail',JSON.stringify(data));
           context.commit({
               type:"changeUserDetail",
               userDetail:data
           })
       })
    },
    getAllMomentsAction(context,payload) {
        allMoments().then(data=>{
            // console.log(data)
            context.commit({
                type:'changeAllMoments',
                allMoments:data
            })
            //获取动态详情
            let promise=context.state.allMoments.map((item,index)=>{
                return momentDetail(item.momentId)
            })
            Promise.all(promise).then(data=>{
                //console.log(data)
                context.commit({
                    type:'changeMomentDetail',
                    momentDetail:data
                })
                //console.log(this.momentDetail)
            })
        })
    },
    /*获取曾经的热门动态*/
    getHotMomentAction(context, payload)
    {
        hotMoment(offset,limit).then(data => {
            let promise=data.map((item,index)=>{
                return momentDetail(item.momentId)
            })
            Promise.all(promise).then(data=>{
               // console.log(data)
                context.commit({
                    type:'changeHotMoment',
                    hotMoment:data
                })
            })
        })
    },
    //获取榜单分类下详情
    getTopListDetailAction(content,payload)
    {
        const {categoryId}=payload;
        getTopListDetail(categoryId).then(data=>{
            content.commit({
                type:'changeTopListDetail',
                topListDetail:data
            })
        })
    }
}