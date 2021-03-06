import {login} from '@/network/login'
import {userDetail} from "@/network/user";
import {allMoments, momentDetail} from "@/network/home";
import {hotMoment} from "@/network/moment";
import {SOCKET_HOST} from "@/constants/config/config";
export default{
    /*获取用户登录信息*/
    getUserMsgAction(context,payload)
    {
        const {userName,password}=payload;
        return new Promise((resolve,reject)=>{
            login(userName,password).then(data=>{
               if(data)
               {
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
               }
               else{
                   reject(data)
               }
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
    //获取最新页所有动态
    getAllMomentsAction(context,payload) {
        allMoments().then(data=>{
            //console.log(data)
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
    /*getHotMomentAction(context, payload)
    {
        const {categoryId}=payload;
        hotMoment(categoryId).then(data => {
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
    },*/
    //获取动态详情(用于评论的实时更新)
    getMomentDetail(context,payload)
    {
        const {momentId}=payload;
        momentDetail(momentId).then(data=>{
            context.commit({
                type:'changeMomentDetails',
                momentDetails:data
            })
        })
    },
    //消息
    getChatMsgAction(context,payload){
        this.socket=new WebSocket(`${SOCKET_HOST}:8333/message?userId=${context.state.userMsg.userId}`);
        this.socket.onopen=()=>{
            console.log("open")
        };
        this.socket.onmessage=(res)=>{
            context.commit({
                type:"changeChatMsg",
                chatMsg:JSON.parse(res.data)
            })
        };
    }
}