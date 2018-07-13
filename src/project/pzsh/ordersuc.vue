<template>
  <div>
      <div style="position:fixed;width:100%;height:100%;background:#fff;top:0">
          <div style="width:8rem;margin:0 auto;padding-top:2.5rem">
            <div style="text-align:center;margin-bottom:0.8rem">
                <img src="./u48.png" style="width:1.387rem;">
            </div>
            <div style="width:6rem;margin:0 auto;text-align:center;font-size:0.45rem">
                <p>您已成功预定,24小时内我们将有专人送货上门,同时收取商品费用</p>
                <p>请您注意查收哦</p>
            </div>
          </div>
          
      </div>
      
  </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        var that=this
        setTimeout(() => {
            that.$router.push('/goods_index')
        }, 3000);
      document.getElementById("index_loading").style.display="none";
    },
};
</script>
<style scoped>

</style>
