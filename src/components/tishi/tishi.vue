<template>
  <div v-show="imgshow">
    <div
         style="position:absolute;width:100%;height:100%;background:#000;top:0;left:0;opacity:0.6;z-index:1000"></div>
    <div @click="xiaoshi"
         style="width:8rem;left:50%;height:6rem;position:absolute;background:#fff;top:50%;transform:translateX(-50%) translateY(-50%);z-index:1000">
      <div style='text-align:center;height:2rem'>
        <div :style="imageurl"></div>
      </div>
      <div
        style='width:4rem;height:3rem;border:3px solid rgba(245,240,240,1);margin:0 auto;text-align:center;line-height:3rem;font-size:0.55rem;color:#5fd65d;margin-top:0.2rem'>
        {{tishiyu}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}

    },
    props: ['imgshow', 'tishiyu'],
    methods: {
      //弹窗消失
      xiaoshi() {
        this.imgshow = false
      },
    },
    computed: {
      imageurl() {
        if(service_url){
          return {"background": "url(../static/img/xiao.png) no-repeat center center","height":"4rem","background-size":"cover"}
        }else{
          return {"background": "url(/static/img/xiao.png) no-repeat center center","height":"4rem","background-size":"cover"}
        }
      }
    }
  }
</script>
<style scoped>
  /*.fangtu {
    background: url(../../static/img/xiao.png) no-repeat center center;
    height: 4rem;
    background-size: cover
  }*/
</style>
