<template>
  <div class="moment">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.moment">
        <div class="img-container" v-lazy-container="{selector:'img'}">
          <img :data-src="item.pictures[0].picUrl"
               :data-error="require('../../../../../assets/img/moment.png')" />
        </div>
        <div class="state">{{item.title}}</div>
        <div class="creator">{{item.user.userName}}</div>
        <div class="updateTime">{{item.updateTime.substring(0,10)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "User"
}
</script>

<style scoped lang="less">
  .moment{
    margin: 20px 0 0 0;
    ul{
      li{
        display: flex;
        align-items: center;
        margin: 5px 0;
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
          img{
            width: 50px;
          }
        }
        .state{
          width: 280px;
          margin: 0 0 0 20px;
          font-size: 14px;
        }
        .creator{
          width: 100px;
          font-size: 12px;
          color: #616162;
        }
        .updateTime{
          font-size: 12px;
          color: #616162;
        }
      }
    }
  }
</style>