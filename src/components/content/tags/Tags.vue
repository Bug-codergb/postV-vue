<template>
  <div class="tag">
    <button class="addTag" @click="addTag" v-show="isShow">
      <i class="iconfont icon-pen"></i>
      <span>添加标签</span>
    </button>
    <input type="text" class="tag-inp" v-show="!isShow" @blur="end" v-model="content"/>
  </div>
</template>

<script>
import {addTag} from "@/network/tag";

export default {
name: "Tags",
  data()
  {
    return {
      isShow:true,
      content:''
    }
  },
  props:{
    moment:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  created() {
    //console.log(this.publishMoment.momentId)
  },

  methods:{
    addTag()
    {
      this.isShow=!this.isShow
    },
    end()
    {
      this.isShow=!this.isShow;
      if(!this.content||this.content.trim().length!==0)
      {
        let tag=[];
        tag.push(this.content)
        addTag(this.moment.momentId,tag).then(data=>{
          this.$store.dispatch({
            type:'getAllMomentsAction'
          })
          this.$store.dispatch({
            type:'getHotMomentAction',
            limit:15,
            offset:0
          })
        })
      }
    }
  }
}
</script>

<style scoped>
  .addTag{
    background-color: #3a8ee6;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
  }
  .addTag i{
    display: inline-block;
    font-size: 14px;
    margin: 0 6px 0 0;
  }
  .tag-inp{
    border: 1px solid #3a8ee6;
    width: 82px;
    height: 26px;
    border-radius: 5px;
    padding: 0 5px;
  }
</style>