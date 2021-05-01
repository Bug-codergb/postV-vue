<template>
  <div class="upload-class" v-show="isShow">
    <div class="title">
      <div>
        <span>标题:</span><textarea rows="2" cols="50" v-model="title"></textarea>
      </div>
      <div>
        <span>类型</span>
        <select v-model="knowCate" class="know-cate">
          <option value="0">普通课程</option>
          <option value="1">会员课程</option>
        </select>
      </div>
      <div>
        <span>简介:</span>
        <textarea rows="2" cols="50" v-model="description"></textarea>
      </div>
    </div>
    <div class="control-btn">
      <div class="docx">
        <input type="file" class="upload-advert" title="上传封面" @change="uploadImg" ref="know"/>
        <i class="iconfont icon-tu"></i>
      </div>
      <button @click="upload">确定</button>
      <button @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import {addAdvert, addAdvertImg} from "@/network/admin/advertisement";
import {addKnow, addKnowPic} from "@/network/admin/knowledge";

export default {
  name: "KnowUpload",
  data()
  {
    return {
      title:'',
      knowCover:null,
      isShow:true,
      knowCate:0,
      description:''
    }
  },
  methods:{
    uploadImg()
    {
      this.knowCover=this.$refs.know.files[0];
      this.$toast.show("文件选择成功",500)
    },
    //上传
    upload() {
      if (!this.title || this.title.trim().length === 0) {
        this.$toast.show("添加一个标题吧", 1500);
      }
      else if(!this.description||this.description.trim().length===0)
      {
        this.$toast.show("介绍一下课程",1500)
      }
      else {
        if (this.knowCover) {
          addKnow(this.title,this.knowCate,this.description).then(data=>{
            if(data)
            {
              let formData=new FormData();
              formData.append('knowImg',this.knowCover);
              addKnowPic(formData,data).then(data=>{
                this.isShow=false;
              })
            }
          })
        }
      }
    },
    cancel()
    {
      this.isShow=false;
      this.title='';
      this.knowCover=null;
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
.upload-class{
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
    .know-cate{
      border: none;
      outline: none;
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
</style>