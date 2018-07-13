<template>
  <msg :title="data.this_title" :description="data.desc" :buttons="data.buttons" :icon="data.icon"></msg>
</template>

<script>
  import {Msg} from 'vux'

  export default{
    data(){
      return {
        data: {}
      }
    },
    mounted(){
      document.getElementById("index_loading").style.display="none";
      this.data={
        desc:"您的订单支付成功，点击确认进行详情",
        this_title:"支付成功",
        icon:"",
        buttons: [{
          type: 'primary',
          text: '确认',
          onClick: this.goIndex.bind(this)
        }]
      };
    },
    methods:{
      goIndex(){
          this.$router.go(-2);
      }
    }
  }
</script>

<style scoped>

</style>
