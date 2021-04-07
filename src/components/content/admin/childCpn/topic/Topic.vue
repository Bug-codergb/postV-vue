<template>
  <div class="topic" :key="componentKey">
    <ul class="topic-list">
      <li v-for="(item,index) in allTopic" :key="item.topicId">
        <div class="topic-item">
          <div class="topic-name" @click="showContent(index)">{{item.name}}</div>
          <div>{{item.updateTime.slice(0,10)}}</div>
          <button class="delete-btn" @click="delTopic(item.topicId,index)">删除</button>
          <button class="delete-btn" @click="addContent(item.topicId)">添加文章</button>
        </div>
        <!--专题下内容-->
        <ul class="topic-content" :class="{active:currentIndex===index}" v-if="topicContent[index]">
          <li v-for="(item,i) in topicContent[index].content" :key="item.topic_content_Id">
            <div class="topic-content-title text-nowrap">{{item.title}}</div>
            <div class="topic-content-time">{{item.updateTime&&item.updateTime.substring(0,10)}}</div>
            <button class="delete-btn" @click="delTopicContent(item,index,i)">删除</button>
          </li>
        </ul>

      </li>
    </ul>
    <!--专题文章-->
    <topic-content v-show="isShowTopic"
                   @cancelPublish="cancelPublish"
                   :topicId="topicId"/>
    <!--专题文章-->
    <div class="add-topic" @click="addTopic">
      <i class="iconfont icon-guanzhu"></i>
      添加专题
    </div>
    <div class="add-topic-name" v-show="isShow">
      <i class="iconfont icon-chahao exit" @click="exit"></i>
      <textarea v-model="content"></textarea>
      <button @click="createTopic" class="add">添加</button>
    </div>
  </div>
</template>

<script>
import {addTopic, delTopic, delTopicContent, getAllTopic} from "@/network/admin";
import TopicContent from "@/components/content/admin/childCpn/topic/childCpn/TopicContent";
import {getAllTopicContent} from "@/network/topic";

export default {
name: "Topic",
  components: {TopicContent},
  data()
  {
    return {
      allTopic:[],
      isShow:false,
      content:'',
      isShowTopic:false,
      componentKey:0,
      topicId:'',
      topicContent:[],
      currentIndex:-1
    }
  },
  created() {
      getAllTopic(0,10).then(data=>{
      //console.log(data);
      this.allTopic=data;
      let promise=data.map((item,index)=>{
        return getAllTopicContent(item.topicId,0,20)
      })
      Promise.all(promise).then(data=>{
        this.topicContent=data.filter((item,index)=>{
          if(item.content)
          {
            return item
          }
        })
        console.log(this.topicContent)
      })
    })
  },
  mounted() {
    console.log("渲染完毕")
  },
  methods: {
    delTopic(id, index) {
      const result = confirm("您确定要删除吗?");
      if (result) {
        delTopic(id).then(data => {
          this.$delete(this.allTopic, index)
        })
      }
    },
    //显示
    addTopic() {
      this.isShow = true;
    },
    //添加专题
    createTopic() {
      addTopic(this.content).then(data => {
        this.isShow = !this.isShow
        this.componentKey = new Date().getTime();
      })
    },
    exit() {
      this.isShow = !this.isShow
    },
    //添加内容
    addContent(id) {
      this.topicId = id;
      this.isShowTopic = true;
    },
    /*取消发布*/
    cancelPublish() {
      this.isShowTopic = false;
    },
    //显示专题子内容
    showContent(index)
    {
      this.currentIndex=index;
    },
    //删除话题内容
    delTopicContent(item,index,i)
    {
      delTopicContent(item.topic_content_id).then(data=>{
        this.$delete(this.topicContent[index],i)
      })
    }
  }
}
</script>

<style scoped lang="less">
 .topic{
   font-size: 14px;
   &>ul.topic-list{
     &>li{
       .topic-item{
         display: flex;
         background-color: rgba(58, 142, 230,.1);
         padding: 10px 20px;
         margin: 0 0 5px 0;
         cursor:pointer;
         .topic-name{
           width: 150px;
           &:hover{
             color: #3a8ee6;
           }
         }
         .delete-btn{
           height: 100%;
           background-color: #9cc6f2;
           margin: 0 0 0 150px;
           padding: 0 10px;
           cursor:pointer;
         }
       }
       /*专题内容*/
       .topic-content{
         display: none;
         font-size: 13px;
         overflow: hidden;
         &.active{
           display: block;
         }
         li{
           padding:10px 20px;
           display: flex;
           align-items: center;
           &:nth-child(odd)
           {
             background-color: rgba(58, 142, 230,.05);
           }
           /*专题内容*/
           .topic-content-title{
             width: 200px;
           }
           /*内容时间*/
           .topic-content-time{
             width: 200px;
           }
           .delete-btn{
             padding: 3px 10px;
             background-color:#9cc6f2;
             font-size: 13px;
           }
         }
       }
     }
   }
   .add-topic{
     background-color:  rgba(58, 142, 230,.5);
     color: #fff;
     width: 200px;
     padding: 10px 0;
     text-align: center;
     margin: 20px auto 0;
     cursor:pointer;
   }
   .add-topic-name{
     width: 300px;
     height: 100px;
     margin: 20px auto 0;
     background-color: rgba(58, 142, 230,.3);
     text-align: center;
     line-height: 100px;
     position: relative;
     textarea{
       width: 200px;
       outline: none;
     }
     i.exit{
       position: absolute;
       color:#fff;
       top:-30%;
       left:90%;
       font-size: 26px;
       height: 30px;
       cursor: pointer;
     }
     .add{
       display: block;
       padding: 5px 10px;
       font-size: 13px;
       background-color: #3a8ee6;
       color: #fff;
       cursor: pointer;
     }
   }
 }
</style>