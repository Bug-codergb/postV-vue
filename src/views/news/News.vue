<template>
  <div class="new">
    <el-carousel height="260px" :autoplay="true" indicator-position="outside">
      <el-carousel-item v-for="item in banners" :key="item.momentId">
        <div class="img-outer">
          <!--模糊-->
          <div class="img-blur" :style="{backgroundImage:`url(${item.pictures[0]})`}"></div>
          <div @click="bannerRouter(item)" class="img-container">
            <img :src="item.pictures[0]"  alt="用户头像"/>
            <div class="state">{{item.title}}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <h3>最新话题</h3>
    <ul>
      <li v-for="(item,index) in _this.$store.state.allMoments" :key="item.momentId">
        <moment :momentDetail="_this.$store.state.momentDetail[index]"
                v-if="_this.$store.state.momentDetail.length!==0"
                :is-show-com="false">
          <!--评论回复内容-->
          <div slot="momentContent">
            <div class="content" @click="momentRouter(item)">
              <div class="moment-img" v-if="_this.$store.state.momentDetail[index].picUrl">
                <img :src="_this.$store.state.momentDetail[index].picUrl[0].picUrl" />
              </div>
              <div class="state">
                <span v-html="_this.$store.state.momentDetail[index].content">{{_this.$store.state.momentDetail[index].content}}</span>
              </div>
            </div>
          </div>
        </moment>
      </li>
    </ul>
  </div>
</template>

<script>
import Tags from "@/components/content/tags/Tags";
import Reply from "@/components/content/reply/Reply";
import Moment from "@/components/content/moment/Moment";
import {getNewBanner} from "@/network/new";
import {momentView} from "@/network/moment";
//import Moment from "@/components/content/dynamic/Moment";
export default {
  name: "News",
  components:{
    Moment,
    Tags,
    Reply,
  },
  data(){
    return {
      banners:[],
      isRouterAlive:true,
      _this:{}
    }
  },
  created() {
    this.getAllMoments();
    this._this=this
    getNewBanner().then(data=>{
      console.log(data)
      this.banners=data;
    })
  },
  methods:{
    getAllMoments()
    {
      this.$store.dispatch({
        type:'getAllMomentsAction'
      })
    },
    momentRouter(item)
    {
      console.log(item)
      //点击量
      momentView(item.momentId).then(data=>{
        //console.log(data)
      })
      if(item.type===0)
      {
        this.$router.push({
          path:'/momentDetail',
          query:{
            momentId:item.momentId,
            userId:item.user.id
          }
        })
      }
      else if(item.type===1&&item.vid)
      {
           this.$router.push({
             path:'/videoDetail',
             query:{
               vid:item.vid
             }
           })
      }
    },
    bannerRouter(item)
    {
      this.$router.push({
        path:'/momentDetail',
        query:{
          momentId:item.momentId,
          userId:item.user.userId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.new{
  height: 100%;
  .el-carousel--horizontal{
    width: 780px!important;
    margin: 0 auto;
  }
  .img-outer{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .img-blur{
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    filter:blur(10px);
    background-size: cover;
  }
  .img-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    z-index: 999;
    img{
      vertical-align: bottom;
      width: 400px;
    }
    .state{
      width:100%;
      position: absolute;
      top: 74%;
      left: 0;
      padding: 20px;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
    }
  }
  ul {
    li {
      border-bottom: 1px solid rgba(58, 142, 230, .3);
      padding: 20px 0 10px 0;
      cursor:pointer;
    }
  }
}

h3 {
  color: #333;
  margin: 20px 0 20px 0;
}
//评论回复
//动态内容
.content{
  display: flex;
  align-items:flex-start;
  .moment-img{
    margin: 0 30px 0 0;
    img{
      width: 200px;
    }
  }
}
.state{
  font-size: 14px;
  padding: 5px 0;
  color: #595959;
  line-height: 24px;
  overflow: hidden;
  height: 140px;
  width: 450px;
}
//动态中的内容
.state /deep/ img{
  display:none;
  margin: 0 auto;
  border: 1px solid rgba(0,0,0,.1);
}

</style>