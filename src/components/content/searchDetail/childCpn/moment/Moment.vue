<template>
  <div class="moment">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.moment">
        <div class="img-container"
             v-lazy-container="{selector:'img'}"
             @click="momentRouter(item)"
             v-if="item.pictures">
          <img :data-src="item.pictures[0].picUrl"
               :data-error="require('../../../../../assets/img/moment.png')" />
        </div>
        <div class="state text-nowrap" @click="momentRouter(item)">{{item.title}}</div>
        <div class="cate" @click="cateRouter(item)">{{item.category.name}}</div>
        <div class="creator">{{item.user.userName}}</div>
        <div class="updateTime">{{item.updateTime.substring(0,10)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "User",
  methods:{
    momentRouter(item)
    {
      if(item.type===1&&item.vid)
      {
        this.$router.push({
          path:'/videoDetail',
          query:{
            vid:item.vid
          }
        })
      }
      else if(item.type===0)
      {
        this.$router.push({
          path:'/momentDetail',
          query:{
            momentId:item.momentId,
            userId:item.user.userId
          }
        })
      }
    },
    cateRouter(item)
    {
      const {name}=item.category
      switch(name)
      {
        case "视频":
          this.$router.push({
            path:'/videoCate'
          });break;
        case "图片":
          this.$router.push({
            path:'/imageCate',
            query:{
              categoryId:item.category.categoryId
            }
          });break;
        case "文章":
          this.$router.push({
            path:'/spcolumnCate',
            query:{
              categoryId:item.category.categoryId
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .center()
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .moment{
    margin: 20px 0 0 0;
    ul{
      li{
        display: flex;
        align-items: center;
        margin: 5px 0;
        padding: 10px;
        &:nth-child(odd)
        {
          background-color: #f9f9f9;
        }
        &:hover{
          background-color: #f0f1f2;
        }
        .img-container{
          width: 50px;
          height: 50px;
          overflow: hidden;
          background-color:#d8e8fa;
          position: relative;
          img{
            width: 50px;
            .center();
          }
        }
        .state{
          width: 350px;
          margin: 0 30px 0 20px;
          font-size: 14px;
          &:hover{
            color: #3a8ee6;
            cursor: pointer;
          }
        }
        .creator{
          width: 100px;
          font-size: 12px;
          color: #616162;
          cursor:pointer;
        }
        .cate{
          font-size: 14px;
          color: #3a8ee6;
          width: 100px;
          cursor:pointer;
        }
        .updateTime{
          font-size: 12px;
          color: #616162;
        }
      }
    }
  }
</style>