<template>
  <div class="create-topic">
    <button class="create-btn" @click="create">
      <i class="iconfont icon-guanzhu"></i>
      创建专题
    </button>
    <div class="topic" v-show="isShow">
       <div class="title">
         <span>标题:</span>
         <textarea rows="2" cols="50" v-model="title"/>
       </div>
      <div class="desc">
        <span>简介:</span>
        <textarea rows="2" cols="50" v-model="content"/>
      </div>
      <!--图片预览-->
      <div class="preview">
        <div class="img-container" v-for="(item,index) in fileUrl">
          <img :src="item"/>
          <div class="cancel" @click="cancel(index)">
            <i class="iconfont icon-chahao"></i>
          </div>
        </div>
      </div>
      <div class="control-btn">
        <div class="upload">
          <input type="file" title="上传封面" @change="uploadCover" ref="cover"/>
          <i class="iconfont icon-tu"></i>
        </div>
        <button @click="upload">添加</button>
        <button @click="exit">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {addTopic, addTopicImg} from "@/network/topic";

export default {
  name: "CreateTopic",
  data()
  {
    return {
      title:'',
      content:'',
      fileUrl:[],
      fileList:[],
      isShow:false
    }
  },
  methods:{
    create()
    {
      this.isShow=!this.isShow;
    },
    exit()
    {
      this.isShow=false;
    },
    uploadCover()
    {
      const url=URL.createObjectURL(this.$refs.cover.files[0]);
      this.fileList.push(this.$refs.cover.files[0]);
      this.fileUrl.push(url)
    },
    cancel(index)
    {
      this.fileUrl.splice(index,1);
      this.fileList.splice(index,1);
    },
    //添加专题
    upload()
    {
      if(!this.title)
      {
        this.$toast.show('为您的专题添加一个标题吧!',1500)
      }
      else if(!this.content)
      {
        this.$toast.show("介绍一下你的专题吧",1500)
      }
      else{
        if(this.fileList.length!==0)
        {
          addTopic(this.title,this.content).then(data=>{
            let formData=new FormData();
            for(let file of this.fileList)
            {
              formData.append('topicCover',file);
            }
            if(data)
            {
              addTopicImg(data,formData).then(data=>{
                this.isShow=false;
              })
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .create-topic{
    .create-btn{
      padding: 10px 0;
      background-color: #3a8ee6;
      border-radius: 2px;
      color: #fff;
      width: 200px;
      text-align: center;
      margin: 0 auto;
      display: block;
      cursor:pointer;
    }
    position: relative;
    .topic{
      .center();
      width: 450px;
      height: 300px;
      background-color: #fff;
      box-shadow: 0 0 15px rgba(0,0,0,.3);
      z-index: 9;
      padding: 30px 0 0 20px;
      .title,.desc{
        width: 400px;
        margin: 0 auto 20px;
        display:flex;
        align-items: center;
        span{
          font-size: 14px;
        }
      }
      /*图片预览*/
      .preview{
        width: 350px;
        height: 50px;
        margin: 0 auto 20px;
        background-color: rgba(58, 142, 230,.2);
        padding: 5px;
        display: flex;
        .img-container{
          height: 50px;
          position: relative;
          img{
            height: 50px;
          }
          .cancel{
            width:15px;
            height: 15px;
            cursor: pointer;
            text-align: center;
            background-color: #9cc6f2;
            position: absolute;
            top: 0;
            left: 100%;
            line-height: 15px;
            transform: translateX(-100%);
          }
        }
      }
      .control-btn{
        width: 350px;
        margin: 0 auto;
        display: flex;
        justify-content:flex-end;
        button{
          padding: 5px 10px;
          color:#fff;
          background-color: #3a8ee6;
          margin: 0 20px 0 0;
        }
        .upload{
          width:70px;
          overflow: hidden;
          text-align: center;
          input{
            width: 70px;
            overflow: hidden;
            position: absolute;
            opacity: 0;
            display: block;
          }
          i{
            font-size: 26px;
            color: #3a8ee6;
          }
        }
      }
    }
  }
</style>