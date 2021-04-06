<template>
  <div class="subscriber">
    <ul>
      <li v-for="(item,index) in momentDetails" :key="item.momentId">
        <moment :moment-detail="item">
          <div slot="momentContent">
            <div class="state">
              <span v-html="item.content">{{item.content}}</span>
            </div>
          </div>
        </moment>
      </li>
    </ul>
  </div>
</template>

<script>
import {momentDetail} from "@/network/home";
import MomentDetail from "@/components/content/momentDetail/MomentDetail";
import Moment from "@/components/content/moment/Moment";

export default {
name: "Subscriber",
  components: {Moment, MomentDetail},
  props:{
    sub:{
      type:Array,
      default()
      {
        return []
      }
    },
  },
  data()
  {
    return {
      momentDetails:[]
    }
  },
  created() {
    if(this.sub)
    {
      let promise=this.sub.map((item,index)=>{
        if(item.momentId)
        {
          return momentDetail(item.momentId)
        }
        else{
          return null
        }
      })
      Promise.all(promise).then(data=>{
        //console.log(data);
        this.momentDetails=data;
      })
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .state{
    /deep/ img{
      display: block;
      margin: 0 auto;
    }
  }
</style>