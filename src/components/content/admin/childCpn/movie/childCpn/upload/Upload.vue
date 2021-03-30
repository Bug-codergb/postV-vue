<template>
  <div class="upload">
    <div class="header">
      <span class="title">标题</span>
      <textarea rows="2" cols="50" v-model="title"></textarea>
    </div>
    <!--视频预览-->
    <div class="preview">
      <div v-for="(item,index) in imgUrl" class="img-container">
        <img :src="item"/>
        <div class="cancel" @click="cancelUpload(index)">
          <i class="iconfont icon-chahao"></i>
        </div>
      </div>
    </div>
    <!---->
    <div class="control-btn">
      <div class="video-icon">
        <i class="iconfont icon-shipin"></i>
      </div>
      <div class="video-file">
        <input type="file" @change="upload" ref="videoFile" title="选择视频" />
      </div>
      <button class="upload-btn" @click="uploadVio">上传</button>
    </div>
  </div>
</template>

<script>
import {getVideoBase64, getVideoDuration, getVideoImage} from "@/utils/videoToImg";
import {uploadMovie, uploadMovieImg} from "@/network/admin";

export default {
name: "Upload",
  data()
  {
    return {
      imgUrl:[],
      videos:[],
      images:[],
      title:''
    }
  },
  methods:{
    upload()
    {
      //console.log(this.$refs.videoFile.files);
      this.videos.push(this.$refs.videoFile.files[0]);
      getVideoDuration(this.$refs.videoFile.files[0]).then(data=>{
      })
      let  url=URL.createObjectURL(this.$refs.videoFile.files[0]);
      getVideoBase64(url).then(data=>{
        this.imgUrl.push(data)
        //console.log(this.$refs.videoFile.files[0].name)
        this.images.push(getVideoImage(data,this.$refs.videoFile.files[0].name));
      })
    },
    //取消上传某一个视频
    cancelUpload(index)
    {
      this.imgUrl.splice(index,1);
      this.videos.splice(index,1);
      this.images.splice(index,1);
    },
    //上传
    uploadVio()
    {
      let formData=new FormData();
      console.log(this.videos)
      for(let item of this.videos)
      {
        formData.append('movie',item);
      }
      formData.append('movie',this.title)
      if(this.title)
      {
        uploadMovie(formData).then(data=>{
          if(data.length!==0)
          {
            let img=new FormData();
            for(let item of this.images)
            {
              img.append('movieImg',item)
            }
            uploadMovieImg(img,data).then(data=>{
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .upload{
    width: 500px;
    height: 300px;
    padding: 20px;
    box-shadow: 0 0 20px rgba(58, 142, 230,.2);
    margin: 20px auto 0;
    .header{
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      margin: 30px 0 0 0;
      .title{
        font-size: 14px;
        margin: 0 15px 0 0;
      }
    }
    .preview{
      width: 100%;
      height: 70px;
      margin: 30px auto 20px;
      display: flex;
      align-items: center;
      background-color: rgba(58, 142, 230,.1);
      .img-container{
        margin: 0 5px 0 0;
        position: relative;
      }
      img{
        height: 65px;
      }
      .cancel{
        position: absolute;
        width: 15px;
        height:15px;
        background-color: #9cc6f2;
        top: 0;
        left: 100%;
        transform: translateX(-100%);
        text-align: center;
        line-height:15px;
      }
    }
    .control-btn{
      display: flex;
      align-items: center;
      position: relative;
      .video-icon{
        width: 60px;
        text-align: center;
        i{
          font-size: 28px;
          color: #3a8ee6;
        }
      }
      .video-file{
        position: absolute;
        opacity: 0;
        width: 50px;
        overflow: hidden;
      }
      .upload-btn{
        padding: 5px 10px;
        background-color: #3a8ee6;
        color: #fff;
      }
    }

  }
</style>