<template>
  <div class="technology">
   <tab-control :list="['图片','视频']">
     <div slot="图片">
       <ul class="img-list">
         <li v-for="item in images">
           <images :img-detail="item" />
         </li>
       </ul>
     </div>
     <div slot="视频">
       <ul class="video-list">
         <li v-for="item in videos">
           <msg-item :detail="item" />
         </li>
       </ul>
     </div>
   </tab-control>
  </div>
</template>

<script>
import {getCateDetail} from "@/network/category";
import TabControl from "@/components/common/tabControl/TabControl";
import Images from "@/components/common/images/Images";
import MsgItem from "@/components/common/msgItem/MsgItem";

export default {
name: "Technology",
  components: {MsgItem, Images, TabControl},
  data()
  {
    return {
      currentIndex:0,
      images:[],
      videos:[]
    }
  },
  created() {
    getCateDetail(this.$route.query.categoryId).then(data=>{
      console.log(data);
      this.videos=data.filter((item,index)=>{
        return item.type===1
      })
      this.images=data.filter((item,index)=>{
        return item.type===0
      })
    })
  },
  methods:{
    liClick(item,index)
    {
      this.currentIndex=index;
    }
  }
}
</script>

<style scoped lang="less">
  .img-list{
    li{
      border-bottom: 1px solid rgba(58, 142, 230,.2);
    }
  }
  .video-list{
      display: flex;
      padding: 0 20px 0 0;
      justify-content: space-between;
      li{

      }
  }
</style>