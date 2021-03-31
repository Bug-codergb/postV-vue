<template>
  <div class="movie">
    影视
    <ul>
      <li v-for="(item,index) in allMovie" :key="item.vid">
        <div class="img-container">
          <img :src="item.coverUrl" />
        </div>
        <div class="state text-nowrap">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllMovie} from "@/network/movie";

export default {
  name: "movie",
  data()
  {
    return {
      allMovie:[]
    }
  },
  created() {
    getAllMovie(0,10).then(data=>{
      console.log(data);
      this.allMovie=data;
    })
  }
}
</script>

<style scoped lang="less">
  .movie{
    padding: 20px 20px 0 15px;
    ul{
      display: flex;
      flex-wrap:wrap ;
      justify-content: space-between;
      li{
        margin: 0 0 15px 0;
        .img-container{
          height: 113px;
          width: 200px;
          img{
            width: 200px;
          }
          border-radius: 5px;
          overflow: hidden;
        }
        .state{
          font-size: 14px;
          width: 200px;
          margin: 5px 0 0 0;
        }
      }
    }
  }
</style>