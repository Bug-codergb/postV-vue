<template>
  <div class="moment-detail">
    <div class="left-content">
      <moment :momentDetail="this.$store.state.momentDetails"
              v-if="this.$store.state.momentDetails.momentId!==undefined"
              >
        <div slot="momentContent">
          <div class="content">
            <div class="state">
              <span v-html="this.$store.state.momentDetails.content">
                {{this.$store.state.momentDetails.content}}
              </span>
            </div>
          </div>
        </div>
      </moment>
    </div>
    <div class="right-content">
      <avatar :user-id="userId"/>
    </div>
  </div>
</template>

<script>
import Moment from "@/components/content/moment/Moment";
import Avatar from "@/components/content/avatar/Avatar";

export default {
  name: "MomentDetail",
  components: {Avatar, Moment},
  data()
  {
    return {
      userId:'',
      momentId:'',
      momentDetail:{}
    }
  },
  created() {
    this.userId=this.$route.query.userId;
    this.momentId=this.$route.query.momentId;
    //获取动态详情
    this.$store.dispatch({
      type:'getMomentDetail',
      momentId:this.momentId
    })
  }
}
</script>

<style scoped lang="less">
   .moment-detail{
     width: 1020px;
     display: flex;
     overflow: hidden;
   }
  .content{
    .state{
      color: #595959;
      line-height: 30px;
      /deep/ img{
        width: 350px;
        outline: 1px solid rgba(0,0,0,.1);
        display: block;
      }
    }
  }
  .left-content{
    width: 710px;
    border-right: 1px solid rgba(58, 142, 230,.2);
  }
  .right-content{
    flex: 1;
  }
</style>