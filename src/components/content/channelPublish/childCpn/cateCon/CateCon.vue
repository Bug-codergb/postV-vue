<template>
  <div class="cate-con-outer">
    <ul class="cate-con">
      <li v-for="(item,index) in cateCon" :key="item.id"
          :class="{active:currentIndex===index}"
          @click="cateClick(item,index)">
        {{item.name}}
      </li>
      <li class="add-cate-con" @click="addCateCon">
        <i class="iconfont icon-guanzhu" v-show="!isShowAddCate"></i>
        <span v-show="!isShowAddCate">添加分类</span>
        <input type="text" v-show="isShowAddCate" @click.stop @blur="finish" v-model="content"/>
      </li>
    </ul>
    <div class="cate-con-cover">
      <input type="file" @change="change" v-show="isShow" title="请选择专栏头图"/>
      <i class="iconfont icon-tu" v-show="isShow"></i>
      <img :src="imgUrl" v-show="!isShow"/>
    </div>
    <div class="control-btn-outer">
      <button class="cate-con-btn" @click="select">确定</button>
      <button class="cate-con-btn-cancel" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import {addCateConCover, addChannelCateCon} from "@/network/channel";

export default {
  name: "CateCon",
  data(){
    return {
      currentIndex:0,
      isShow:true,
      imgUrl:"",
      isShowAddCate:false,
      content:"",
      cover:null,
      cateConId:""
    }
  },
  props:{
    cateCon:{
      type:Array,
      default(){
        return []
      }
    },
    cateId:{
      type:String,
      default:""
    }
  },
  methods:{
    cateClick(item,index){
      this.currentIndex=index;
      this.$emit("cate-click",item.id);
      this.cateConId=item.id;
    },
    change(e){
      console.log(e.target.files[0]);
      this.imgUrl=URL.createObjectURL(e.target.files[0]);
      this.isShow=!this.isShow;
      this.cover=e.target.files[0];
    },
    select(){
      if(this.cover){
        let formData=new FormData();
        formData.append('channel_cate_cover',this.cover);
        addCateConCover(formData,this.cateConId).then(data=>{
        })
      }
      this.$emit("cancel")
    },
    cancel(){
      this.$emit("cancel")
    },
    addCateCon(){
      this.isShowAddCate=!this.isShowAddCate
    },
    finish(){
      if(this.content.trim().length!==0){
        addChannelCateCon(this.cateId,this.content).then(data=>{
           this.$emit("add-cate-con");
        })
      }
      this.isShowAddCate=!this.isShowAddCate
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
.cate-con{
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  height: 120px;
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
.cate-con-outer{
  padding: 30px;
  background-color: #fff;
  z-index: 99;
  .center(absolute,50%,30%,-50%,-50%);
  box-shadow: 0 0 20px rgba(0,0,0,.2);
  border-radius:5px;
  .cate-con-cover{
    border:2px dotted rgba(0,0,0,.2);
    background-color: #fff;
    height: 150px;
    position: relative;
    text-align: center;
    line-height: 150px;
    input{
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0;
      display: block;
    }
    i{
      font-size: 30px;
      color: #3a8ee6;
    }
    img{
      height: 100%;
    }
  }
}
.control-btn-outer{
  margin: 10px 0 0 0;
  display: flex;
  justify-content: flex-end;
  .cate-con-btn{
    background-color: #3a8ee6;
    color: #fff;
    padding: 5px 10px;
    font-size: 13px;
  }
  .cate-con-btn-cancel{
    padding: 5px 10px;
    font-size: 13px;
    background-color:rgba(0,0,0,.08);
    color: #333;
    margin: 0 0 0 20px;
  }
}
.add-cate-con{
  span{
    font-size: 13px;
  }
  input{
    height: 25px;
    width: 80px;
  }
}
</style>