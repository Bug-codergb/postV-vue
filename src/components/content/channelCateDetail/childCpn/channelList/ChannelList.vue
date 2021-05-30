<template>
  <div class="channel-list">
    <ul>
      <li v-for="(item,index) in list" :key="item.id" @click="channelRouter(item,index)">
        <msg-list :is-show-time="false" creator-top="85%">
          <div slot="img-container">
            <img :src="item.picUrl" alt=""/>
          </div>
          <div slot="state" class="channel-list-state text-nowrap">
            {{item.title}}
          </div>
          <div slot="avatarUrl">
            <img :src="item.user.avatarUrl" />
          </div>
          <div slot="userName">
            {{item.user.userName}}
          </div>
        </msg-list>
      </li>
      <li v-for="(item,index) in (Math.ceil(list.length/5))*5-list.length" class="complement"></li>
    </ul>
  </div>
</template>

<script>
import MsgList from "@/components/common/msgList/MsgList";
export default {
  name: "ChannelList",
  components: {MsgList},
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    channelRouter(item,index){
      this.$router.push({
        path:"/channelDetail",
        query:{
          cId:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .channel-list{
    margin: 30px 0 0 0;
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        margin: 0 0 20px 0;
        .channel-list-state{
          margin: 15px 0 0 0;
          width: 200px;
        }
      }
      .complement{
        width:200px;
      }
    }
  }
</style>