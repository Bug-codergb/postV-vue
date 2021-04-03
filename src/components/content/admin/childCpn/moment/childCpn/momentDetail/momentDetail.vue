<template>
  <div class="moment-detail">
    <moment :moment-detail="momentDetail" v-if="momentDetail.momentId">
      <div slot="momentContent">
        <div class="content">
          <div class="state">
            <span v-html="momentDetail.content">
              {{momentDetail.content}}
            </span>
          </div>
        </div>
      </div>
    </moment>
  </div>
</template>

<script>
import {momentDetail} from "@/network/home";
import Moment from "@/components/content/moment/Moment";

export default {
  name: "momentDetail",
  components: {Moment},
  data()
  {
    return {
      momentDetail:{}
    }
  },
  created() {
    momentDetail(this.$route.query.momentId).then(data=>{
      this.momentDetail=data;
    })
  }
}
</script>

<style scoped lang="less">
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
</style>