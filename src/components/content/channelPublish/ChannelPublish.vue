<template>
  <div class="channel-publish">
    <div>
      <textarea cols="80" rows="2" class="title" placeholder="输入您的标题(建议不少于10个字)" v-model="title"></textarea>
    </div>
    <!--内容-->
    <div class="content">
      <textarea cols="80" rows="10" v-model="content"></textarea>
    </div>
    <!--上传-->
    <div class="upload">
      <!--上传封面-->
      <div class="img-placeholder">
        <div v-show="isShowImgControl">
          <p>选择封面</p>
          <input type="file" @change="selectImg"/>
          <i class="iconfont icon-tu"></i>
        </div>
        <img :src="previewImgURL"/>
      </div>
      <!--选择视频-->
      <div class="img-placeholder">
        <div v-show="isShowVideoControl">
          <p>选择视频</p>
          <input type="file"  @change="selectVio"/>
          <i class="iconfont icon-shipin"></i>
        </div>
        <img :src="previewVideoURL"/>
      </div>
    </div>
    <!--分类-->
    <ul class="cate">
      <li>选择类别</li>
      <li v-for="(item,index) in cate"
          :key="item.id"
          :class="{active:currentIndex===index}"
          @click="liClick(item,index)">
        {{item.name}}
      </li>
    </ul>

    <div class="control-btn">
      <button @click="publish">确定</button>
      <button @click="cancel">取消</button>
    </div>

    <!--二级类别-->
    <ul v-if="cateCon.length!==0" class="cate-con">
      <li v-for="(item,index) in cateCon" :key="item.id"
          :class="{active:cateCurrentIndex===index}"
           @click="cateClick(item,index)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import {addChannelCon, getAllCate, getChannelCateCon, uploadChannelVio, uploadCover} from "@/network/channel";
import {getVideoBase64, getVideoDuration} from "@/utils/videoToImg";

export default {
  name: "ChannelPublish",
  data(){
    return {
      cate:[],
      currentIndex:0,
      cateCurrentIndex:0,
      isShowImgControl:true,
      isShowVideoControl:true,
      previewImgURL:"",
      previewVideoURL:"",
      //上传封面
      cover:null,
      video:null,
      cateId:'',
      content:"",
      title:"",
      dt:0,
      cateCon:[]
    }
  },
  created() {
    getAllCate().then(data=>{
      this.cate=data;
      this.cateId=data[0].id
    })
  },
  methods:{
    //选择封面
    selectImg(e){
      let url=URL.createObjectURL(e.target.files[0]);
      this.previewImgURL=url;
      this.isShowImgControl=false;
      this.cover=e.target.files[0];
    },
    //选择视频
    selectVio(e){
      const dt=getVideoDuration(e.target.files[0]).then(data=>{
        console.log(data);
        this.dt=data;
      })
      let url=URL.createObjectURL(e.target.files[0]);
      getVideoBase64(url).then(data=>{
        this.previewVideoURL=data;
        this.isShowVideoControl=false;
      });
      this.video=e.target.files[0];
    },

    liClick(item,index){
      this.currentIndex=index;
      getChannelCateCon(item.id).then(data=>{
        console.log(data);
        this.cateCon=data;
      });
    },
    cateClick(item,index){
      this.cateCurrentIndex=index;
      this.cateId=item.id;
    },

    //取消
    cancel(){
      this.$emit('cancel')
    },
    //确认发布
    publish(){
      addChannelCon(this.title,this.content,this.cateId).then(data=>{
        if(data){
          const {id}=data;
          let formData=new FormData();
          formData.append('cover',this.cover);
          //上传视频封面
          uploadCover(formData,id).then(data=>{
            //console.log(data);
          })
          //上传视频
          let f=new FormData();
          f.append('channel_video',this.video);
          f.append("dt",this.dt);
          uploadChannelVio(f,id).then(data=>{
            this.$emit('cancel')
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .center(@p,@left,@top,@x,@y){
    position:@p ;
    left: @left;
    top: @top;
    transform: translate(@x,@y);
  }
  .channel-publish{
    border-radius: 5px;
    padding: 30px 40px;
    .center(fixed,50%,50%,-50%,-50%);
    background-color:#fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    z-index: 9999;
    .title{
      outline: none;
      border-bottom: 1px solid #3a8ee6;
    }
    /*内容*/
    .content{
      margin: 20px 0 0 0;
      textarea{
        padding: 10px;
        outline: 1px solid #3a8ee6;
      }
    }
    /*上传视频，图片*/
    .upload{
      display: flex;
      div:nth-child(1){
        border-right: 1px solid rgba(58, 142, 230,.1);
      }
    }
    /*封面*/
    .img-placeholder{
      flex: 1;
      position: relative;
      height: 100px;
      background-color: #fff;
      text-align: center;
      line-height: 100px;
      margin: 15px 0 0 0;
      overflow: hidden;
      background-color: rgba(58, 142, 230,.06);
      img{
        height: 100%;
      }
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        display: block;
      }
      i{
        font-size: 30px;
        color: #3a8ee6;
      }
      p{
        position: absolute;
        left: 50%;
        top:0;
        transform: translate(-50%,0);
        height: 20px;
        line-height: 20px;
        color: #757575;
      }
    }
    .control-btn{
      display: flex;
      justify-content: flex-end;
      button{
        cursor: pointer;
        margin: 15px 10px;
        color: #fff;
        width: 150px;
        padding: 8px 0;
        background-color: #61a5eb;
        &:nth-child(2){
          background-color: #efefef;
          color: #616162;
        }
      }
    }
    .cate{
      margin: 20px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      li{
        margin: 0 15px 15px 0;
        background-color:rgba(97, 165, 235,.6);
        color: #fff;
        padding: 3px 15px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 3px;
        &:nth-child(1){
          background-color: #fff;
          color:#757575;
        }
        &.active{
          background-color: #3a8ee6;
        }
      }
    }
    .cate-con{
      background-color: #fff;
      z-index: 99;
      .center(absolute,50%,30%,-50%,-50%);
      box-shadow: 0 0 20px rgba(0,0,0,.2);
      display: flex;
      padding: 30px;
      flex-wrap: wrap;
      width: 450px;
      height: 200px;
      overflow-y: scroll;
      align-items: flex-start;
      li{
        padding: 5px 10px;
        background-color: #a0c9f3;
        color: #fff;
        font-size: 13px;
        margin: 0 10px;
        border-radius: 3px;
        cursor: pointer;
        &.active{
          background-color: #3a8ee6;
        }
      }
    }
  }
</style>