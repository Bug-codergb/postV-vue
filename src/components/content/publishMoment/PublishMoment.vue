<template>
  <div class="publish-moment">
    <div class="exit" @click="exit">
      <i class="iconfont icon-cha"></i>
    </div>
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
    <textarea v-model="content" class="momentContent"/>

    <!--上传文件预览-->
    <div class="upload-img">
      <!--图片预览-->
      <div class="img-container" v-for="(item,index) in images">
        <img :src="item" alt="动态图片"/>
        <div class="cancelImg" title="取消" @click="cancelUploadImg(index)">
          <i class="iconfont icon-chahao "></i>
        </div>
      </div>
      <!--视频预览-->
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
        <!--上传图片-->
        <div class="upload-img-btn" v-show="cate!=='视频'">
          <input type="file" @change="previewImg" ref="momentPic" name="picture" multiple="multiple" title="上传图片"/>
          <span>
            <i class="iconfont icon-tu"></i>
          </span>
        </div>
        <!--上传视频-->
        <div class="upload-vio" v-show="cate!=='文章'&&cate!=='图片'">
          <input type="file" @change="previewVio" ref="momentVio" title="上传视频"/>
          <span><i class="iconfont icon-shipin"></i></span>
        </div>
        <button class="publish-btn" @click="publishMoment">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import {momentPic, publishMoment} from "@/network/moment";
import {delMomentPic} from "../../../network/moment";
import {uploadVio, uploadVioImg} from "../../../network/video";
import {getVideoBase64, getVideoDuration, getVideoImage} from "../../../utils/videoToImg";
import {getAllCate} from "@/network/toplist";

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
      cateMap:new Map()
    }
  },
  created() {
    getAllCate(0,10).then(data=>{
      this.category=data
      this.category.forEach((item,index)=>{
        this.cateMap.set(item.name,item.categoryId);
      })
      console.log(this.cateMap)
    })
  },
  methods:{
    publishMoment()
    {
      if(!this.title)
      {
        this.$toast.show("为你的动态添加一个标题吧!",1500)
      }
     else{
        publishMoment(this.title,this.cateMap.get(this.cate),this.content).then(data=>{
          this.upload(this.fileList,data,this.cate)
          this.$emit('changeShow')
        })
      }
    },
    /*退出发表动态*/
    exit()
    {
      this.$emit('changeShow')
    },
    //图片预览
    previewImg()
    {
      let reader=new FileReader();
      reader.addEventListener('load',()=>{
        console.log(this.$refs.momentPic.files[0])
        this.images.push(reader.result);
        this.fileList.push(this.$refs.momentPic.files[0]);
        //动态中显示图片名字
        this.content+=`[${this.$refs.momentPic.files[0].name}]`
      })
      if(this.$refs.momentPic.files[0])
      {
        reader.readAsDataURL(this.$refs.momentPic.files[0])
      }
    },
    //视频预览
    previewVio()
    {
         //上传的视频文件的图片
        getVideoDuration(this.$refs.momentVio.files[0]).then(data=>{
          //上传的视频文件
          this.fileList.push({
            file:this.$refs.momentVio.files[0],
            duration:data
          })
        })
        let url=URL.createObjectURL(this.$refs.momentVio.files[0]);
        getVideoBase64(url).then(data=>{
          this.videos.push(data)
          this.vioImg.push(getVideoImage(data,this.$refs.momentVio.files[0].name));
        })
    },
    upload(files,momentId,cate)
    {
      if(files.length!==0)
      {
        let imgFormData=new FormData();
        let vioForData=new FormData();
        let flag=true
        for(let item of files)
        {
          //判断文件时视频文件还是图片文件；
          let type='';
          if(cate==='视频'||cate==='预告片')
          {
            type=item.file.type;
          }
          else{
            type=item.type;
          }
          //如果是图片
          if(type.includes('image'))
          {
            imgFormData.append('picture',item)
          }
          //如果是视频
          else if(type.includes("video"))
          {
            flag=false;
            vioForData.append('video',item.file);
            vioForData.append('duration',item.duration)
          }
        }
        //上传图片
        if(flag)
        {
          momentPic(imgFormData,momentId).then(data=>{
          console.log(data)
          })
        }
        //上传视频
        if(!flag)
        {
          uploadVio(vioForData,momentId).then(data=>{
            //console.log(data)
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
      }
    },
    //取消图片
    cancelUploadImg(index)
    {
      this.content=this.content.replace(`[${this.fileList[index].name}]`,'')
      this.fileList.splice(index,1);
      this.images.splice(index,1);
      //console.log(this.fileList)
    },
    //取消视频
    cancelUploadVio(index)
    {
      this.fileList.splice(index,1);
      this.videos.splice(index,1);
      this.vioImg.splice(index,1);
      //console.log(this.fileList)
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
    padding: 20px 20px 30px 20px;
    border-radius: 10px;
  }
  .exit{
     width: 30px;
    height: 30px;
    background-color: rgba(0,0,0,.1);
    border-radius: 50%;
    cursor:pointer;
    text-align: center;
    line-height: 30px;
    float: right;
  }
  .exit i{
    font-size: 20px;
    color: #3a8ee6;
  }
  //动态标题
  .momentTile{
    margin: 30px 0 0 80px;
    display: flex;
    align-items: center;
    textarea{
      outline: none;
      border: 1px solid #3a8ee6;
      width: 480px;
      margin: 0 0 0 15px;
    }
  }
  .category{
    margin: 30px 0 0 80px;
    select{
      margin: 0 0 0 15px;
      outline: 1px solid #3a8ee6;
      border: none;
      padding: 5px 10px;

    }
  }
  .momentContent{
    display: block;
    border: 1px solid #3a8ee6;
    outline: none;
    margin: 30px auto 0;
    height: 200px;
    width: 500px;
    font-family: 微软雅黑;
    padding: 15px;
  }
  .publish-btn{
    font-size: 14px;
    padding: 5px 20px;
    background-color: #3a8ee6;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .publish-btn:hover{
    background-color: #0c73c2;
  }
  .cancel{
    text-align: center;
    line-height: 15px;
    width:15px;
    height:15px;
    background-color: red;
    position: absolute;
    top: 0;
    left: 100%;
    transform: translateX(-100%);
    cursor: pointer;
    background-color: rgba(58, 142, 230,.9);
  }
  /*文件上传图片展示*/
  .upload-img{
    height: 60px;
    width:525px;
    background-color:rgba(58, 142, 230,.1);
    position: absolute;
    left:14.5%;
    top:72%;
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
  /*设置上传，配图按钮*/
  .control-btn{
    margin: 15px 0 0 230px;
  }
  //文件上传按钮
  .upload{
    width: 180px;
    height: 30px;
    overflow: hidden;
    margin: 0 0 0 205px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    .upload-img-btn
    {
       position: relative;
      margin: 0 20px 0 0;
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