<template>
  <div class="image-cate">
    <ul>
      <li v-for="(item,index) in images">
        <images :img-detail="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import {getCateDetail} from "@/network/category";
import ControlBtn from "@/components/common/controlBtn/ControlBtn";
import Images from "@/components/common/images/Images";

export default {
  name: "ImageCate",
  components: {Images, ControlBtn},
  data()
  {
    return {
      images:[]
    }
  },
  created() {
    getCateDetail(this.$route.query.categoryId).then(data=>{
      console.log(data)
      this.images=data;
    })
  }
}
</script>

<style scoped lang="less">
  .image-cate{
    ul{
      li{
        border-bottom: 1px solid rgba(58, 142, 230,.2);
      }
    }
  }
</style>