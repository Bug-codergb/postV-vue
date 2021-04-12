<template>
  <div class="advert">

  </div>
</template>

<script>
import {getAllAdvert} from "@/network/admin/advertisement";

export default {
name: "Advertisement",
  created() {
    getAllAdvert(0,30).then(data=>{
      console.log(data);
    })
  }
}
</script>

<style scoped>

</style>