<template>
  <div class="publish-moment">
    <div  class="momentTile">
      <span>标题</span>
      <textarea v-model="title"/>
    </div>
    <!--类别-->
     <div class="category">
       <span>分类</span>
       <select v-model="cate">
         <option v-for="(item,index) in category"
                 :key="item.categoryId"
                 :selected="item.name==='文章'"
                  :value="item.name">
           {{item.name}}
         </option>
       </select>
     </div>

    <textarea v-model="content" class="momentContent" v-show="cate==='视频'"/>
    <div id="edt" ref="edit" v-show="cate!=='视频'"></div>
    <!--上传视频预览-->
    <div class="upload-img">
      <div class="vio-container" v-for="(item,index) in videos">
        <img :src="item"/>
        <div class="cancelVio" title="取消" @click="cancelUploadVio(index)">
          <i class="iconfont icon-chahao "></i>
        </div>
      </div>
    </div>
    <!--发表动态，配图按钮-->
    <div class="control-btn">
      <div class="upload">
        <!--上传视频-->
        <div class="upload-vio" v-show="cate!=='文章'&&cate!=='图片'">
          <input type="file" @change="previewVio" title="上传视频"/>
          <span><i class="iconfont icon-shipin"></i></span>
        </div>
        <button class="publish-btn" @click="publishMoment">发布</button>
        <button class="exit" @click="exit">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {momentPic, publishMoment} from "@/network/moment";
import {uploadVio, uploadVioImg} from "../../../network/video";
import {getVideoBase64, getVideoDuration, getVideoImage} from "@/utils/videoToImg";
import {getAllCate} from "@/network/toplist";

import E from 'wangeditor';
import store from "@/store";


export default {
  name: "PublishMoment",
  data(){
    return {
      content:``,
      title:'',
      images:[],
      videos:[],
      fileList:[],
      vioImg:[],//根据视频生成的图片
      category:[],
      cate:'文章',
      cateMap:new Map(),
      momentId:''
    }
  },
  created() {
    getAllCate(0,10).then(data=>{
      this.category=data
      this.category.forEach((item,index)=>{
        this.cateMap.set(item.name,item.categoryId);
      })
    })
  },
  mounted() {
    const editor = new E(this.$refs.edit);
    editor.config.showLinkImg = false
    editor.config.uploadImgServer ="http://localhost:7876/upload/moment/picture";
    editor.config.uploadFileName = 'picture';
    editor.config.excludeMenus = [
      'link',
      'video',
      'code',
      'redo',
    ]
    editor.config.uploadImgHeaders = {
      authorization:store.state.userMsg.token
    }
    editor.config.uploadImgParamsWithUrl = true
    editor.create();
    editor.config.onchange =(html)=>{
      // 第二步，监控变化，同步更新到 textarea
      this.content=html;
    }
    editor.config.uploadImgHooks = {
      success:(xhr)=>{
        const {momentId}=JSON.parse(xhr.response);
        this.momentId=momentId;
      },
    }
  },
  methods:{
    publishMoment()
    {
      if(!this.title)
      {
        this.$toast.show("为你的动态添加一个标题吧!",1500)
      }
     else{
        publishMoment(this.momentId,this.title,this.cateMap.get(this.cate),this.content).then(data=>{
          if(this.cate==='视频')
          {
            this.upload(this.fileList,data)
          }
          this.$emit('changeShow')
        })
      }
    },
    /*退出发表动态*/
    exit()
    {
      this.$emit('changeShow')
    },
    //视频预览
    previewVio(e)
    {
      let videoFile=e.target.files[0];
         //上传的视频文件的图片
        getVideoDuration(videoFile).then(data=>{
          //上传的视频文件
          this.fileList.push({
            file:videoFile,
            duration:data
          })
        })
        let url=URL.createObjectURL(videoFile);
        getVideoBase64(url).then(data=>{
          this.videos.push(data)
          this.vioImg.push(getVideoImage(data,videoFile.name));
        })
    },
    upload(files,momentId)
    {
      if(files.length!==0)
      {
        let vioForData=new FormData();
        for(let item of files)
        {
          vioForData.append('video',item.file);
          vioForData.append('duration',item.duration)
        }
        //上传视频
        uploadVio(vioForData,momentId).then(data=>{
          const formData=new FormData();
          for(let item of this.vioImg)
          {
            formData.append('videoImg',item);
          }
          uploadVioImg(formData,data).then(data=>{
             console.log(data);
           })
          })
      }
    },
    //取消视频
    cancelUploadVio(index)
    {
      this.fileList.splice(index,1);
      this.videos.splice(index,1);
      this.vioImg.splice(index,1);
    }
  }
}
</script>

<style scoped lang="less">
  .publish-moment{
    position:absolute;
    width: 700px;
    z-index: 99999;
    left:50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    top: 50%;
    background-color: #fff;
    cursor: default;
    padding:40px 40px 30px;
    border-radius: 10px;
    //动态标题
    .momentTile{
      display: flex;
      align-items: center;
      textarea{
        outline: none;
        border: 1px solid #3a8ee6;
        width: 480px;
        margin: 0 0 0 15px;
      }
    }
    /*分类*/
    .category{
      margin: 20px 0 0 0;
      select{
        margin: 0 0 0 15px;
        outline: 1px solid #3a8ee6;
        border: none;
        padding: 5px 10px;
      }
    }
    //内容框
    .momentContent{
      display: block;
      border: 1px solid #3a8ee6;
      outline: none;
      margin: 30px 0 0 0;
      height: 200px;
      width: 100%;
      font-family: "微软雅黑" ;
      padding: 15px;
      background-color: #fff;
    }
    /*文件上传图片展示*/
    .upload-img{
      height: 60px;
      width:86%;
      background-color:rgba(58, 142, 230,.1);
      position: absolute;
      top:65%;
      left: 50%;
      transform: translate(-50%,0);
      display: flex;
      overflow: hidden;
      .img-container{
        height: 60px;
        margin: 0 10px 0 0;
        position: relative;
        img{
          height: 60px;
        }
        overflow: hidden;
        .cancelImg:extend(.cancel){
          i{
            color: #f4f4f4;
          }
        }
      }
      /*文件上传视频展示*/
      .vio-container{
        position: relative;
        img{
          height: 60px;
          margin:0 10px 0 0;
        }
        .cancelVio:extend(.cancel){
          i{
            color: #f4f4f4;
          }
        }
      }
    }
  }
  .cancel{
    text-align: center;
    line-height: 15px;
    width:15px;
    height:15px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 100%;
    transform: translateX(-100%);
    cursor: pointer;
    background-color: rgba(58, 142, 230,.9);
  }
  #edt{
    margin: 20px 0 0 0;
  }

  //文件上传按钮
  .upload{
    margin: 20px 0 0 0;
    width: 100%;
    height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    /*确认发布*/
    .publish-btn{
      font-size: 14px;
      padding: 5px 15px;
      background-color: #3a8ee6;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
    .publish-btn:hover{
      background-color: #0c73c2;
    }
    /*取消上传*/
    .exit{
      background-color: rgba(0,0,0,.08);
      color: #000000;
      cursor:pointer;
      margin: 0 0 0 20px;
      padding: 5px 15px;
      i{
        font-size: 20px;
        color: #3a8ee6;
      }
    }

    input{
      border:1px solid #3a8ee6;
      opacity:0;
      width: 40px;
      position: absolute;
    }
    span {
      i {
        color: #3a8ee6;
        font-size: 24px;
      }
    }
    .upload-vio{
      position: relative;
      width: 60px;
      i{
        font-size: 30px;
      }
    }
  }
</style>