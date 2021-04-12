<template>
  <div class="knowledge">
    <button class="add-class" @click="addKnow">添加课程</button>
    <KnowUpload v-show="isShowAddKnow"/>
     <ul>
       <li v-for="(item,index) in allKnow">
         <div class="img-container" @click="knowRouter(item,index)">
           <img :src="item.picUrl" />
         </div>
         <div class="state text-nowrap">{{item.title}}</div>
         <div class="creator">{{item.user.userName}}</div>
         <button @click.stop="add(item,index)" class="add-content">添加内容</button>
       </li>
     </ul>
    <!--发布课程内容-->
    <div class="upload" v-show="isShow">
      <div class="title">
        <span>标题</span><textarea cols="40" rows="2" v-model="title"/>
      </div>
      <div class="file">
        <div class="vio-icon">
          <i class="iconfont icon-shipin"></i>
        </div>
        <input type="file" class="inp" ref="file" @change="uploadKnow"/>
      </div>
      <div class="control-btn">
        <button @click="upload">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {addKnowContent, getAllKnow} from "@/network/admin/knowledge";
import KnowUpload from "@/components/content/admin/childCpn/knowledge/childCpn/KnowUpload/KnowUpload";

export default {
  name: "Knowledge",
  components: {KnowUpload},
  data()
  {
    return{
      allKnow:[],
      isShow:false,
      title:'',
      fileList:[],
      kid:'',
      isShowAddKnow:false
    }
  },
  created() {
    getAllKnow(0,100).then(data=>{
      this.allKnow=data
    })
  },
  methods:{
    knowRouter(item,index)
    {
      this.$router.push({
        path:'/admin/knowDetail',
        query:{
          kid:item.kid
        }
      })
    },
    add(item)
    {
      this.isShow=!this.isShow;
      this.kid=item.kid
    },
    addKnow()
    {
      this.isShowAddKnow=true;
    },
    cancel()
    {
      this.isShow=!this.isShow;
      this.kid='';
    },
    uploadKnow()
    {
      this.fileList=[...this.$refs.file.files]
    },
    upload()
    {
      let formData=new FormData();
      for(let file of this.fileList)
      {
        formData.append('knowContent',file);
      }
      formData.append('title',this.title);
        addKnowContent(formData,this.kid).then(data=>{
        this.isShow=false
      })
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
  .knowledge{
    /*添加课程*/
    .add-class{
      background-color: #3a8ee6;
      color: #fff;
      width: 150px;
      height:40px;
      display: block;
      margin: 0 auto 10px;
      cursor: pointer;
    }
    position: relative;
    ul{
      li{
        display: flex;
        align-items: center;
        padding: 10px 0;
        &:nth-child(odd)
        {
          background-color: rgba(58, 142, 230,.08);
        }
        &:hover{
          background-color: rgba(58, 142, 230,.1);
        }
        .img-container{
          width: 120px;
          height: 100px;
          overflow: hidden;
          background-color: #9cc6f2;
          img{
            width: 120px;
          }
        }
        .state{
          font-size: 14px;
          margin: 0 0 0 20px;
          width: 300px;
        }
        .creator{
          font-size: 13px;
          width: 200px;
        }
        .add-content{
          padding: 3px 10px;
          background-color: #3a8ee6;
          color: #fff;
          font-size: 14px;
        }

      }
    }
    .upload{
      width: 400px;
      height: 200px;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 15px rgba(0,0,0,.4);
      .center();
      margin: 20px 0 0 0;
      .title{
        display: flex;
        font-size: 14px;
        align-items: center;
        text-align: center;
        span{
          margin: 0 10px 0 0;
        }
        width: 350px;
        margin: 20px auto 20px;
      }
      .file{
        display: flex;
        justify-content: center;
        position: relative;
      }
      .vio-icon{
        width: 100px;
        text-align: center;
        i{
          font-size: 30px;
          color: #3a8ee6;
        }
      }
      .inp{
        position: absolute;
        width: 100px;
        overflow: hidden;
        opacity: 0;
      }
      .control-btn{
        display: flex;
        justify-content: center;
        margin: 30px 0 0 0;
        button{
          padding: 3px 10px;
          background-color: #3a8ee6;
          color:#fff;
          &:nth-child(1)
          {
            margin: 0 10px 0 0;
          }
        }
      }
    }
  }
</style>