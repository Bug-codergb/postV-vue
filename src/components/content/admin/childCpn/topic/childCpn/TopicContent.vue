<template>
  <div class="topic-text">
    <div class="title">
      <div>标题</div>
      <textarea cols="65" rows="2" v-model="title"></textarea>
    </div>
    <div class="content">
      <div>内容</div>
      <textarea cols="65" rows="10" v-model="content"></textarea>
    </div>
    <!--图片预览-->
    <div class="preview">
      <div v-for="(item,index) in uploadImgList"
           :key="item"
           class="preview-item">
        <img :src="item"/>
        <div class="cancel" @click="cancelImgItem(index)">
          <i class="iconfont icon-chahao"></i>
        </div>
      </div>
    </div>
    <div class="control-btn">
      <input type="file" id="topic-img" @change="uploadImg" ref="topicImg"/>
      <div class="file">
        <i class="iconfont icon-tu"></i>
      </div>
      <button @click="publish">发布</button>
      <button @click="cancelPublish">取消</button>
    </div>
  </div>
</template>

<script>
import {addContent, addContentImg} from "@/network/admin";

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
      uploadImgList:[],
      files:[]
    }
  },
  methods:{
    uploadImg()
    {
      console.log(this.$refs.topicImg.files);
      let url=URL.createObjectURL(this.$refs.topicImg.files[0])
      this.uploadImgList.push(url);
      this.files.push(this.$refs.topicImg.files[0]);
      this.content+=`[${this.$refs.topicImg.files[0].name}]`
    },
    /*取下某一张图片*/
    cancelImgItem(index)
    {
      this.content=this.content.replace(`[${this.files[index].name}]`,'')
      this.files.splice(index,1)
      this.uploadImgList.splice(index,1)
    },
    /*发布*/
    publish()
    {
      let formData=new FormData();
      for(let file of this.files)
      {
        formData.append('topicImg',file);
      }
      if(this.title&&this.content&&this.title.trim().length!==0&&this.content.length!==0)
      {
        addContent(this.topicId,this.title,this.content).then(data=>{
          console.log(data.topic_content_id)
          if(data.topic_content_id)
          {
            addContentImg(data.topic_content_id,formData).then(data=>{
              console.log(data);
              this.$emit('cancelPublish');
            })
          }
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
   width: 500px;
   padding: 30px;
   height: 350px;
   .title,.content{
     display: flex;
     margin: 20px 0 0px 0;
     textarea{
       margin: 0 0 0 15px;
     }
   }
   .preview{
     background-color: rgba(58, 142, 230,.1);
     width: 435px;
     margin: 0 0 0 42px;
     height:76px;
     overflow: hidden;
     display: flex;
     img{
       height: 70px;
     }
     .preview-item{
       position: relative;
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
     #topic-img{
       opacity: 0.1;
       position: absolute;
       width: 30px;
     }
     .file{
       color: #3a8ee6;
       margin: 0 20px 0 0;
       i{
         font-size: 20px;
       }
     }
   }
 }
</style>