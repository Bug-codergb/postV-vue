<template>
  <div class="topic-text">
    <div class="title">
      <div>标题</div>
      <textarea cols="65" rows="2" v-model="title"></textarea>
    </div>

    <div class="content">
      <textarea cols="10" rows="1" v-model="content"></textarea>
    </div>
     <div id="edit" ref="topicEdit"></div>

    <div class="control-btn">
      <button @click="publish">发布</button>
      <button @click="cancelPublish">取消</button>
    </div>
  </div>
</template>

<script>
import {addContent, addContentImg} from "@/network/topic";
import E from "wangeditor";
import store from "@/store";
import {APP_HOST} from "@/constants/config/config";

export default {
  name: "TopicContent",
  props:{
    topicId:{
      type:String,
      default:''
    }
  },
  data()
  {
    return {
      title:'',
      content:'',
      topic_content_id:""
    }
  },
  mounted() {
    this.topic_content_id=new Date().getTime();
    const editor = new E(this.$refs.topicEdit);
    editor.config.showLinkImg = false;
    editor.config.excludeMenus = [
      'head',
      'video',
      'code',
      'redo',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'list',
      'todo',
      'justify',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo',
    ];
    editor.config.showFullScreen =false;
    editor.config.onchange =(html)=>{
      this.content=html;
    }
    editor.config.uploadImgHeaders = {
      authorization:store.state.userMsg.token
    }

    editor.config.uploadImgParams = {
      topic_content_id:this.topic_content_id
    }
    editor.config.uploadImgParamsWithUrl = true;
    editor.config.uploadImgServer =`${APP_HOST}/topic/content/img`;
    editor.config.uploadFileName = 'topicImg';


    editor.config.uploadImgHooks = {
      success:(xhr)=>{

      },
    }
    editor.create();
  },
  methods:{
    /*发布*/
    publish()
    {
      if(this.title&&this.content&&this.title.trim().length!==0&&this.content.length!==0)
      {
        addContent(this.topic_content_id,this.topicId,this.title,this.content).then(data=>{
           this.$toast.show("发布成功",1000);
           this.$emit("cancelPublish");
        })
      }
    },
    /*取消发布*/
    cancelPublish()
    {
      this.$emit('cancelPublish');
    }
  }
}
</script>

<style scoped lang="less">
.topic-text{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0,0,0,.3);
  border-radius: 5px;
  width: 600px;
  padding: 30px 40px;
  height: 500px;

  .title{
    display: flex;
    margin: 20px 0 0 0;
    div{
      white-space: nowrap;
    }
    textarea{
      margin: 0 0 0 15px;
      border: 1px solid #aecfea;
      outline: none;
    }
  }
  .content{
    margin: 20px 0 0 0;
    textarea{
      display: none;
    }
  }
    .cancel{
      font-size: 20px;
      color:#fff;
      position: absolute;
      left:100%;
      top: 0;
      transform: translateX(-100%);
      background-color: rgba(0,0,0,.3);
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
  }
  .control-btn
  {
    position: relative;
    display: flex;
    margin: 0 0 0 300px;
    button{
      padding: 3px 10px;
      color: #fff;
      background-color: #3a8ee6;
      margin: 0 20px 0 0;
    }
}
</style>