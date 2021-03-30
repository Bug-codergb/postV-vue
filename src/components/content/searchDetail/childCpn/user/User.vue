<template>
  <div class="user">
    <ul>
      <li v-for="(item,index) in this.$store.state.searchResult.user">
        <div class="img-container">
          <img :src="item.avatarUrl" />
        </div>
        <div class="creator">
          {{item.userName}}
        </div>
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
  .user{
    margin: 20px 0 0 0;
    ul{
      li{
        margin: 0 20px 0 0;
        text-align: center;
      }
      display: flex;
      .img-container{
        width:100px;
        height:100px;
        border-radius:50% ;
        overflow: hidden;
        img{
          width: 100%;
        }
        background-color: #d8e8fa;
      }
      .creator{
        font-size: 14px;
        color: #7f7f7f;
        margin: 10px 0 0 0;
      }
    }
  }
</style>