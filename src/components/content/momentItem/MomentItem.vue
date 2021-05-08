<!--用户详情页动态组件-->
<template>
  <div class="moment-item">
    <ul>
      <li v-for="(item,index) in momentDetail" :key="item.momentId">
        <div class="msg-outer">
          <div class="img-container">
            <img :src="item.picUrl[0].picUrl"/>
          </div>
          <div class="msg">
            <h3 class="title text-nowrap" :title="item.title">{{item.title}}</h3>
            <div class="user-msg">
              <div class="avatar">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="user-name">{{item.user.name}}</div>
            </div>
            <div class="cate">
              分类:<span>{{item.category.name}}</span>
            </div>
          </div>
        </div>
        <control-btn not-show="thumb">
          <div slot="time" class="moment-item-control">{{item.updateTime.substring(0,19).replace("T"," ")}}</div>
          <div slot="view" class="moment-item-control">{{item.views}}</div>
          <div slot="comment" class="moment-item-control">{{item.commentCount}}</div>
          <div slot="sub" class="moment-item-control">{{item.subscriber}}</div>
        </control-btn>
        <div class="del">
          <i class="iconfont icon-MoreVertical"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
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
        img{
          width: 140px;
          border: 1px solid rgba(0,0,0,.2);
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
      }
    }
    .moment-item-control{
      font-size: 13px;
      color: #9ca3ab;
      margin:0 0 0 5px
    }
  }
</style>