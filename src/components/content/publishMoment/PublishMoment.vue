<template>
  <div class="publish-moment">
    <div  class="momentTile">
      <span>标题</span>
      <textarea v-model="title"/>
    </div>
    <!--类别-->
     <div class="category">
       <span>分类</span>
       <select v-model="cate" @change="change">
         <option v-for="(item,index) in category"
                 :key="item.categoryId"
                 :selected="item.name==='专栏'"
                  :value="item.name">
           {{item.name}}
         </option>
       </select>
     </div>
    <!--子分类-->
    <cate-con v-if="cateConList.cate" :list="cateConList" @cate-click="cateClick"/>
    <!--内容编辑-->
    <textarea v-model="content" class="momentContent" v-show="cate!=='专栏'" placeholder="简介"/>
    <div id="edt" ref="edit" v-show="cate==='专栏'"></div>

    <!--上传视频预览-->
    <div class="video-outer" v-if="cate!=='专栏'">
      <div>
        <p class="select-video-cover">选择视频</p>
        <div class="upload-img">
          <input type="file" @change="previewVio" title="上传视频" v-show="!isShowVideoPrev"/>
          <i class="iconfont icon-shipin" v-show="!isShowVideoPrev"></i>
          <img :src="previewUrl" alt="" v-show="isShowVideoPrev"/>
        </div>
      </div>
      <!--上传视频封面-->
      <div>
        <p class="select-video-cover" >选择视频封面</p>
        <div class="video-cover" >
          <input type="file" @change="selectCover" v-show="!isShowCover"/>
          <i class="iconfont icon-tu" v-show="!isShowCover"></i>
          <img :src="coverUrl" v-show="isShowCover" alt=""/>
        </div>
      </div>
    </div>

    <!--发表动态，配图按钮-->
    <div class="control-btn">
        <button class="publish-btn" @click="publishMoment">发布</button>
        <button class="exit" @click="exit">取消</button>
    </div>
  </div>
</template>

<script>
import {publishMoment} from "@/network/moment";
import {uploadVio, uploadVioImg} from "../../../network/video";
import {getVideoBase64, getVideoDuration, getVideoImage} from "@/utils/videoToImg";
import {getAllCate} from "@/network/toplist";

import E from 'wangeditor';
import store from "@/store";
import CateCon from "./childCpn/cateCon/CateCon";
import {getAllCateCon} from "@/network/category";
import {getAllSpcolumnCate} from "@/network/spcolumn";


export default {
  name: "PublishMoment",
  components: {CateCon},
  data(){
    return {
      content:``,
      title:'',
      fileList:[],
      vioImg:[],//视频封面
      coverUrl:'',//视频封面url
      previewUrl:"",//视频预览url,
      isShowCover:false,//是否显示视频封面
      isShowVideoPrev:false,
      category:[],
      cate:'专栏',
      cateMap:new Map(),
      cateConId:"",
      cateConList: {},
      momentId:'',
    }
  },
  created() {
    getAllCate(0,10).then(data=>{
      console.log(data);
      this.category=data
      this.category.forEach((item,index)=>{
        this.cateMap.set(item.name,item.categoryId);
      });
      getAllSpcolumnCate().then(data=>{
        this.cateConList=data;
      })
    })
  },
  mounted() {
    this.momentId=new Date().getTime();
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
    editor.config.uploadImgParamsWithUrl = true;
    editor.config.uploadImgParams = {
      momentId:this.momentId
    }
    editor.create();
    editor.config.onchange =(html)=>{
      // 第二步，监控变化，同步更新到 textarea
      this.content=html;
    }
    editor.config.uploadImgHooks = {
      success:(xhr)=>{

      },
    }
  },
  methods:{
    //选择分类
    change(){
      console.log(this.cateMap.get(this.cate))
      if(this.cateMap.get(this.cate)==='1616757439494'){
        getAllSpcolumnCate().then(data=>{
          this.cateConList=data;
        })
      }else{
        getAllCateCon(this.cateMap.get(this.cate)).then(data=>{
          this.cateConList=data;
        })
      }
    },
    //选择子分类
    cateClick(item){
      console.log(item);
      this.cateConId=item.id||item.categoryId;
    },
    publishMoment()
    {
      if(!this.title)
      {
        this.$toast.show("为你的动态添加一个标题吧!",1500)
      }
     else{
       console.log(this.cateConId)
        publishMoment(this.momentId,this.title,this.cateMap.get(this.cate),this.content,this.cateConId).then(data=>{
          if(this.cate!=='专栏')
          {
            this.upload(this.fileList,data)
          }
          this.$emit('changeShow');
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
          this.previewUrl=data;
          this.isShowVideoPrev=true;
        })
    },
    //视频封面预览
    selectCover(e){
      this.coverUrl=URL.createObjectURL(e.target.files[0]);
      this.vioImg=e.target.files[0];
      this.isShowCover=true;
    },
    upload(files,momentId)
    {
      if(!this.cateConId){
        this.$toast.show(`请为${this.cate}选择分类`,1500);
      }
      else if(files.length!==0&&this.cateConId)
      {
        let vioForData=new FormData();
        for(let item of files)
        {
          vioForData.append('video',item.file);
          vioForData.append('duration',item.duration);
          vioForData.append("cateId",this.cateConId);
        }
        //上传视频
        uploadVio(vioForData,momentId).then(data=>{
          const formData=new FormData();
          formData.append('videoImg',this.vioImg);
          uploadVioImg(formData,data).then(data=>{
             console.log(data);
             })
          })
      }
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
      height: 150px;
      width: 100%;
      font-family: "微软雅黑" ;
      padding: 15px;
      background-color: #fff;
    }
    .video-outer{
      display: flex;
      &>div{
        flex: 1;
      }
    }
    /*视频上传图片展示*/
    .upload-img{
      height:100px;
      width:100%;
      background-color:rgba(58, 142, 230,.1);
      overflow: hidden;
      position: relative;
      text-align: center;
      line-height: 100px;
      input{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      i{
        font-size: 40px;
        color: #3a8ee6;
      }
      img{
        height: 100px;
      }
    }
  }
  #edt{
    margin: 20px 0 0 0;
  }
  //选择视频封面
  .video-cover{
    height: 100px;
    background-color: rgba(77, 153, 232,.08);
    position: relative;
    text-align: center;
    line-height: 100px;
    input{
      position: absolute;
      opacity: 0;
      display: block;
      width: 100%;
      height: 100%;
    }
    i{
      color: #3a8ee6;
      font-size: 30px;
    }
    img{
      height: 100%;
    }
  }
  .select-video-cover{
    color: #676767;
    font-size: 14px;
    margin: 15px 0;
  }
  //文件上传按钮
  .control-btn{
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
  }
</style>