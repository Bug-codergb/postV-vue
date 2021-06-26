<!--用户详情页动态组件-->
<template>
  <div class="moment-item">
    <ul>
      <li v-for="(item,index) in momentDetail" :key="item.momentId">
        <div class="msg-outer">
          <div class="img-container" @click="momentRouter(item,index)" v-if="item.picUrl">
            <img :src="item.picUrl[0].picUrl" alt="item.title"/>
          </div>
          <div class="msg">
            <h3 class="title text-nowrap" :title="item.title" @click="momentRouter(item,index)">{{item.title}}</h3>
            <div class="user-msg">
              <div class="avatar">
                <img :src="item.user.avatarUrl" alt="item.use.name" />
              </div>
              <div class="user-name">{{item.user.name}}</div>
            </div>
            <div class="cate">
              分类:<span>{{item.category.name}}</span>
            </div>
          </div>
        </div>
        <control-btn not-show="thumb">
          <div slot="time" class="moment-item-control">{{formatTime(item.updateTime,"yyyy-MM-dd hh:mm:ss")}}</div>
          <div slot="view" class="moment-item-control">{{item.views}}</div>
          <div slot="comment" class="moment-item-control">{{item.commentCount}}</div>
          <div slot="sub" class="moment-item-control">{{item.subscriber}}</div>
        </control-btn>
        <div class="del" @click.stop="showDel(index)">
          <i class="iconfont icon-MoreVertical"></i>
          <transition name="del">
            <div class="del-icon" v-show="isShow&&currentIndex===index&&_this.$store.state.userMsg.userId===item.user.id"
                 @click="delMoment(item,index)">
              <i class="iconfont icon-template_delete-copy"></i>
            </div>
          </transition>
        </div>
      </li>
    </ul>
    <div class="no-moment">
      <div>
        <i class="iconfont icon-xiangzidakai"></i>
        <p>暂无动态</p>
      </div>
    </div>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import {delMoment} from "@/network/moment";
import {formatDate} from "@/utils/formatDate";
export default {
  name: "MomentItem",
  components: {ControlBtn},
  props:{
    momentDetail:{
      type:Array,
      default()
      {
        return {
          user:{}
        }
      }
    }
  },
  data()
  {
    return{
      _this:null,
      isShow:false,
      currentIndex:0
    }
  },
  created() {
    this._this=this;
  },
  mounted() {
    this.$nextTick(()=>{
      document.addEventListener('click',()=>{
        this.isShow=false;
      })
    })
  },
  methods:{
    formatTime(time,ft){
      return formatDate(time,ft);
    },
    momentRouter(item,index){
      console.log(item);
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.id
        }
      })
    },
    showDel(index)
    {
      this.isShow=!this.isShow;
      this.currentIndex=index;
    },
    delMoment(item,index)
    {
      console.log(item);
      this.$message.show("你确定要删除?").then(data=>{
        if(data)
        {
          if(item.user.id===this.$store.state.userMsg.userId)
          {
            delMoment(item.momentId).then(data=>{
              this.$delete(this.momentDetail,index);
              this.$toast.show("删除成功")
            })
          }
          else{
            this.$toast.show("没有删除的权限")
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .center(@top,@left,@x,@y)
  {
    position: absolute;
    transform: translate(-@x,-@y);
    left: @left;
    top: @top;
  }
  .moment-item{
    .no-moment{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      i{
        font-size: 50px;
        color: #61a5eb;
      }
      p{
        color: #61a5eb;
      }
    }
    li{
      border-bottom: 1px solid #d8e8fa;
      position:relative ;
      .msg-outer{
        display: flex;
        align-items: center;
        margin: 0 0 10px 0;
      }
      padding: 15px 15px 15px 0;
      .img-container{
        height: 90px;
        width: 140px;
        background-color: #111;
        overflow: hidden;
        position: relative;
        img{
          width: 140px;
          border: 1px solid rgba(0,0,0,.2);
          .center(50%,50%,50%,50%);
        }
      }
      .msg{
        margin: 0 0 0 20px;
        .title{
          width: 500px;
        }
        .user-msg{
          display: flex;
          align-items: center;
          margin: 8px 0;
          .avatar{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,.2);
            position: relative;
            overflow: hidden;
            img{
              .center(50%,50%,50%,50%);
              height:100%;
            }
          }
          .user-name{
            font-size: 12px;
            color: #3a8ee6;
            margin: 0 0 0 10px;
          }
        }
        .cate{
          font-size: 12px;
          span{
            color: #3a8ee6;
          }
        }
      }
      .del{
        position: absolute;
        .center(5%,94%,90%,0);
        cursor: pointer;
        i{
          font-size: 24px;
          color: #9b9b9b;
        }
        &:hover{
          i{
            color: #333;
          }
        }
        .del-icon{
          padding: 10px;
          box-shadow: 0 0 8px rgba(0,0,0,.2);
          margin: 0 0 0 -10px;
          border-radius: 3px;
          position: absolute;
        }
      }
    }
    .moment-item-control{
      font-size: 13px;
      color: #9ca3ab;
      margin:0 0 0 5px
    }
    .del-enter-from{
      opacity: 0;
    }
    .del-enter-active{
      opacity: 0;
      transition: opacity 0.3s;
    }
    .del-enter-to{
      opacity: 1;
    }
  }
</style>