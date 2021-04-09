<template>
  <div class="tag">
    <!--标签-->
    <div class="tags" v-if="momentDetail!==undefined">
      <p v-if="momentDetail.tags!==null">标签</p>
      <ul>
        <li v-for="(it,i) in momentDetail.tags">
          <div @click="delTag(momentDetail.momentId,it.tagId)"><i class="iconfont icon-chahao"></i></div>
          {{it.tagName}}
        </li>
      </ul>
      <button class="addTag" @click="addTag" v-show="isShow">
        <i class="iconfont icon-pen"></i>
        <span>添加标签</span>
      </button>
      <label>
        <input type="text" class="tag-inp" v-show="!isShow" @blur="end" v-model="content"/>
      </label>
    </div>
  </div>
</template>

<script>
import {addTag, deleteTag} from "@/network/tag";

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
    momentDetail:{
      type:Object,
      default()
      {
        return {}
      }
    }
  },
  created() {
   // console.log(this.momentDetail)
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
        addTag(this.momentDetail.momentId,tag).then(data=>{
          this.$store.dispatch({
            type:'getMomentDetail',
            momentId:this.momentDetail.momentId
          })
          this.content=''
        })
      }
    },
    //删除tag
    delTag(momentId,tagId)
    {
      deleteTag(momentId,tagId).then(data=>{
        console.log(data)
        this.$store.dispatch({
          type:'getAllMomentsAction'
        })
      })
    },
  }
}
</script>

<style scoped lang="less">
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
  /*评论*/
  .tags{
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
  }
  .tags >ul{
    display: flex;
  }
  .tags li{
    font-size: 13px;
    margin: 0 10px 0 0;
    background-color: #fff;
    padding: 5px 10px;
    color: #3a8ee6;
    border-radius: 5px;
    position: relative;
    background-color: rgba(58, 142, 230,.1);
  }
  .tags li:hover div{
    display: block;
  }
  .tags li div{
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: rgba(58,142,230,.1);
    text-align: center;
    line-height: 17px;
    top: -10px;
    left:100%;
    cursor: pointer;
    transform: translateX(-100%);
    display: none;
  }
  .tags li div i{
    font-size: 18px;
  }
  .tags p{
    font-size:14px;
    margin: 0 10px 0 0;
  }
</style>