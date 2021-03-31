<template>
  <div class="sport">
    <ul>
      <li v-for="(item,index) in this.$store.state.topListDetail" :key="item.vid">
        <div class="index">{{(index+1).toString().padStart(2,'0')}}</div>
        <top-list-item :detail="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import TopListItem from "@/components/common/topListItem/TopListItem";
export default {
  name: "Sport",
  components: {TopListItem},
  created() {
    this.$store.dispatch({
      type:'getTopListDetailAction',
      categoryId:this.$route.query.categoryId
    })
  }
}
</script>

<style scoped lang="less">
  .sport{
    ul{
      li{
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid rgba(58, 142, 230,.2);
        .index{
          width: 50px;
          display: flex;
          align-items: center;
          color:#3a8ee6;
          font-size: 26px;
        }
      }
    }
  }
</style>