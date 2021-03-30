<template>
  <div class="movie">
    <button class="upload-btn" @click="showUpload">上传</button>
    <upload v-show="isShow"/>
  </div>
</template>

<script>
import upload from './childCpn/upload/Upload'
export default {
name: "Movie",
  components:{
    upload
  },
  data()
  {
    return {
      isShow:true
    }
  },
 methods:{
   showUpload() {
     this.isShow=!this.isShow;
   }
 }
}
</script>

<style scoped lang="less">
  .movie{
    background-color: #9cc6f2;
    .upload-btn{
      display: block;
      padding: 8px 20px;
      background-color: #3a8ee6;
      color: #fff;
      width: 150px;
      text-align: center;
      margin: 0 auto;
      &:hover{
        background-color: #0c73c2;
        cursor:pointer;
      }
    }
  }
</style>