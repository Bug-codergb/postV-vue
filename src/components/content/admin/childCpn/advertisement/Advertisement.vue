<template>
  <div class="advert">
    <button class="add-advert" @click="addAdvert">添加广告</button>
    <!--添加公告内容-->
    <div class="advert-content" v-if="isShow">
       <div class="title">
         <div>
           <span>标题:</span><textarea rows="2" cols="50" v-model="title"></textarea>
         </div>
         <div>
           <span>url:</span><textarea rows="2" cols="50" v-model="url"></textarea>
         </div>
       </div>
      <div class="control-btn">
        <div class="docx">
          <input type="file" class="upload-advert" title="上传封面" @change="uploadImg" ref="advert"/>
          <i class="iconfont icon-tu"></i>
        </div>
        <button @click="upload">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in adverts" :key="item.advertId">
        <div class="img-container">
          <img :src="item.picUrl" :alt="item.title"/>
        </div>
        <div class="title">
          <a :href="item.url" target="_blank">{{item.title}}</a>
        </div>
        <div class="creatTime">{{item.createTime.substring(0,10)}}</div>
        <div class="creator">{{item.user.userName}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {addAdvert, addAdvertImg, getAllAdvert} from "@/network/admin/advertisement";

export default {
name: "Advertisement",
  data()
  {
    return {
      adverts:[],
      advertCover:null,
      title:'',
      url:'',
      isShow:false
    }
  },
  created() {
    getAllAdvert(0,30).then(data=>{
      console.log(data);
      this.adverts=data;
    })
  },
  methods:{
    //选择文件
    uploadImg()
    {
      this.advertCover=this.$refs.advert.files[0];
      this.$toast.show("文件选择成功",500)
    },
    //上传
    upload()
    {
      if(!this.title||this.title.trim().length===0)
      {
        this.$toast.show("添加一个标题吧",1500);
      }
      else if(!this.url||this.url.trim().length===0)
      {
        this.$toast.show("请输入广告地址",1500);
      }
      else{
        if(this.advertCover)
        {
          console.log("789")
          addAdvert(this.title,this.url).then(data=>{
            if(data)
            {
              let formData=new FormData();
              formData.append('advertImg',this.advertCover);
              addAdvertImg(formData,data).then(data=>{
                console.log(data);
              })
            }
          })
        }
      }
    },
    addAdvert()
    {
      this.isShow=true;
    },
    cancel()
    {
      this.isShow=false;
      this.title='';
      this.url='';
      this.advertCover=null;
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
  .advert{
    .advert-content{
      padding: 30px;
      box-shadow: 0 0 15px rgba(0,0,0,.3);
      position: absolute;
      z-index: 99;
      background-color: #fff;
      .center();
      .title{
        div{
          display:flex;
          align-items: center;
          margin: 0 0 10px 0;
          &:nth-child(2)
          {
            span
            {
              margin: 0 10px 0 0;
            }
          }
        }
      }
      .control-btn{
        margin: 40px 0 20px 0;
        display: flex;
        justify-content:flex-end;
        .docx{
          overflow: hidden;
          width: 50px;
          text-align: center;
          .upload-advert{
            position: absolute;
            opacity: 0;
            width: 50px;
          }
          i{
            color: #3a8ee6;
            font-size: 20px;
          }
        }
        button{
          margin: 0 0 0 20px;
          background-color: #3a8ee6;
          color: #fff;
          padding: 3px 10px;
        }
      }
    }
    .add-advert{
      width: 200px;
      height: 40px;
      background-color: #3a8ee6;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px auto;
      display: block;
      cursor: pointer;
    }
    ul{
      li{
        padding: 10px;
        display: flex;
        align-items: center;
        &:nth-child(odd)
        {
          background-color: #f0f6fd;
        }
        .title{
          width: 260px;
          margin: 0 0 0 20px;
        }
        .creatTime,.creator{
          color: #616162;
          font-size: 12px;
          width: 150px;
        }
      }
    }
    .img-container{
      width: 50px;
      height: 50px;
      overflow: hidden;
      background-color: #333;
      position: relative;
      img{
        .center();
        width: 50px;
      }
    }
  }
</style>