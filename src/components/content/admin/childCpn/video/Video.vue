<template>
  <div class="video">
    <ul>
      <li v-for="(item,index) in allVideo" :key="item.vid">
        <div class="img-container">
          <img :src="item.coverUrl" />
        </div>
        <div class="state text-nowrap">
          {{item.title}}
        </div>
        <div class="time text-nowrap">{{item.updateTime.substring(0,10)}}</div>
        <div class="creator text-nowrap">{{item.user.userName}}</div>
        <div class="cate">
          <select @change="cateForVideo(item.vid,index)" ref="videoCate" v-model="item.category.categoryId" v-if="item.category">
            <option>选择分类</option>
            <option
                v-for="(item,index) in videoCate"
                :value="item.categoryId">
              {{item.name}}
            </option>
          </select>
          <select @change="cateForVideo(item.vid,index)" ref="videoCate" v-else>
            <option>选择分类</option>
            <option
                v-for="(item,index) in videoCate"
                :value="item.categoryId">
              {{item.name}}
            </option>
          </select>

          <button class="define">确定</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllVideo} from "@/network/video";
import {addCateForVio, getAllVideoCate} from "@/network/admin";

export default {
  name: "Video",
  data()
  {
    return {
      allVideo:[],
      videoCate:[],
      cate:''
    }
  },
  created() {
    getAllVideoCate().then(data=>{
      this.videoCate=data;
    })
    getAllVideo(100,0).then(data=>{
      console.log(data)
      this.allVideo=data;
    })

  },
  methods:{
    cateForVideo(vid,index)
    {
      const categoryId=this.videoCate[this.$refs.videoCate[index].selectedIndex-1].categoryId;
      this.addCateForVideo(vid,categoryId).then(data=>{
        this.$toast.show("添加成功",2000);
      })
    },
    addCateForVideo(vid,categoryId)
    {
      return new Promise((resolve,reject)=>{
        addCateForVio(vid,categoryId).then(data=>{
          console.log(data)
          resolve(data);
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .video{
    ul{
      li{
        display: flex;
        align-items: center;
        padding: 10px 0;
        &:nth-child(odd)
        {
          background-color:#ebf3fc;
        }
        .img-container{
          width: 50px;
          height: 50px;
          overflow: hidden;
          img{
            width: 50px;
          }
        }
        .state{
          font-size: 14px;
          width: 350px;
          margin: 0 0 0 15px;
        }
        .time{
          font-size: 13px;
          width: 100px;
        }
        .creator{
          font-size: 13px;
          width: 100px;
        }
        .cate {
          select{
            padding: 5px;
            outline: 1px solid #3a8ee6;
            border: none;
          }
        }
        .define{
          padding: 3px 10px;
          background-color: #3a8ee6;
          color: #fff;
          margin: 0 0 0 15px;
        }
      }
    }
  }
</style>