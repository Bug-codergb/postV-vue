<template>
  <div class="article">
    <p class="article-name" @click="articleRouter">{{article.name}}
      <i class="iconfont icon-svgarrowsright"></i>
    </p>
    <!--文章内容-->
     <ul class="outer" ref="outer">
       <li v-for="(item,index) in article.moments" :key="item.momentId">
         <div class="img-container" @click="momentRouter(item)">
           <img :src="item.picUrl[0].picUrl" />
         </div>
         <!--文章信息-->
         <div class="msg">
           <div class="title" @click="momentRouter(item)">{{item.title}}</div>
           <div class="info">
             <!--用户信息-->
             <div class="user">
               <div class="avatar-container">
                 <img :src="item.user.avatarUrl" />
               </div>
               <div class="user-name" @click="userRouter(item)">{{item.user.userName}}</div>
             </div>
             <!--控制按钮-->
             <control-btn not-show="sub" v-if="article.moments.length">
               <div slot="time" class="article-btn">{{article.moments[index].updateTime.substring(0,10)}}</div>
               <div slot="thumb" class="article-btn">{{article.moments[index].thumbs}}</div>
               <div slot="comment" class="article-btn">{{article.moments[index].comments}}</div>
               <div slot="view" class="article-btn">{{article.moments[index].views}}</div>
             </control-btn>
           </div>
         </div>
       </li>
     </ul>
    <button @click="more" v-show="isShow" class="more">
      <span>更多</span>
      <i class="iconfont icon-doublearrow-down"></i>
    </button>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import {momentView} from "@/network/moment";
export default {
  name: "Spcolumn",
  components: {ControlBtn},
  data()
  {
    return {
      outerHeight:0,
      isShow:true
    }
  },
  props:{
    article:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  created() {
    //console.log(this.spcolumn)
  },
  mounted() {
    this.$nextTick(()=>{
      let itemHeight=this.$refs.outer.offsetHeight/3;
      this.outerHeight=(this.$refs.outer.children.length)*itemHeight
    })
  },
  methods:{
    more()
    {
      this.$refs.outer.style.height=this.outerHeight+'px';
      this.isShow=false;
    },
    momentRouter(item)
    {
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
      if(this.$store.state.loginType===1)
      {
        momentView(item.momentId);
      }
    },
    articleRouter()
    {
      this.$router.push({
        path:'/spcolumnCate',
        query:{
          categoryId:this.article.categoryId
        }
      })
    },
    userRouter(item)
    {
      //console.log(item)
      this.$router.push({
        path:'/userDetail',
        query:{
          id:item.user.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .article{
    .article-name{
      font-weight: bold;
      margin: 20px 0 0 0;
      cursor: pointer;
      color:#333;
      &:hover{
        color:#000;
      }
      i{
        font-size: 14px;
      }
    }
    .outer{
      height: 363px;
      overflow-y: hidden;
      li{
        display: flex;
        border-bottom: 1px solid rgba(58, 142, 230,.2);
        padding: 10px 0;
        .img-container{
          width: 150px;
          height: 100px;
          overflow: hidden;
          position: relative;
          img{
            width: 120px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .msg{
          margin: 10px 0 0 20px;
          .title{
            cursor: pointer;
            &:hover{
              color: #3a8ee6;
            }
          }
          .info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 500px;
            margin: 20px 0 0 0;
            .article-btn{
              color: #9ca3ab;
              font-size: 12px;
              margin: 0 0 0 3px;
            }
          }
          .user{
            display: flex;
            align-items: center;
            .avatar-container{
              width: 30px;
              height:30px;
              border-radius: 50%;
              overflow: hidden;
              background-color: #ebf3fc;
              position: relative;
              img{
                .center();
                height: 30px;
              }
            }
            .user-name{
              font-size: 12px;
              color: #3a8ee6;
              cursor: pointer;
            }
          }
        }
      }
    }
    .more{
      width: 100%;
      padding: 10px 0;
      background-color: rgba(58, 142, 230,.08);
      color: #9b9b9b;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      span{
        margin: 0 10px 0 0;
      }
    }
  }
</style>