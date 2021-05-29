<template>
  <div class="new">
    <el-carousel height="260px" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="item in banners" :key="item.momentId">
        <div @click="bannerRouter(item)">
          <img :src="item.pictures[0]" class="postit-img" alt="用户头像"/>
          <div class="title">{{item.title}}</div>
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
//import Moment from "@/components/content/moment/Moment";
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
      //console.log(data)
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
  ul {
    li {
      border-bottom: 1px solid rgba(58, 142, 230, .3);
      padding: 20px 0 10px 0;
      cursor:pointer;
    }
  }
  /*轮播图的title*/
  .title{
    background-color: #3a8ee6;
    position: absolute;
    top: 77%;
    width: 96%;
    font-size: 18px;
    background-color: rgba(0,0,0,.4);
    color: #f4f4f4;
    padding: 20px 0 20px 30px;
    letter-spacing: 2px;
    font-weight: bolder;
  }
}
.el-carousel--horizontal {
  width: 650px !important;
  margin: 0px auto;
}
img.postit-img {
  width: 650px;
}

h3 {
  color: #333;
  margin: 20px 0 20px 0px;
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