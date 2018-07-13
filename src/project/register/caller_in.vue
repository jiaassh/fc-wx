<template>
  <div>
    <div style="text-align: center;padding:20px 15px;"><img src = "../../../static/img/caller_in.png" style="width:65%;height:65%;"/></div>
    <div>
      <div style="padding:0 10px;color:#999;">【请选择阁下的身份】</div>
      <checker style="padding:10px 15px;border-top:1px solid #ececec;display:inline-block;"
               v-model="choose"
               type="radio"
               default-item-class="demo5-item"
               selected-item-class="demo5-item-selected"
               disabled-item-class="demo5-item-disabled"
      >
        <checker-item style="font-size:14px;" v-for="item in type" :key="item" :value="item.value" @on-item-click="itemclick">{{item.value}}</checker-item>
      </checker>
    </div>
    <div style="padding:10px 15px;">
      <x-button class="zj_button" type="primary" @click.native="go_bind">绑定房产</x-button>
    </div>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Alert,Toast,Loading,Checker,CheckerItem,XButton} from 'vux';

  export default{
    data(){
      return{
        type:[{
          key:0,
          value:'业主'
        },{
          key:1,
          value:'家人'
        },{
          key:2,
          value:'租户'
        }],
        choose:"业主",
        choose_key:0
      }
    },
    components:{
      Alert,Toast,Loading,Checker,CheckerItem,XButton
    },
    mounted(){
        setTitle("绑定房产");
      document.body.style.background="#efeff4";
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      go_bind(){
          this.$router.push({path:"visitor_owner/1",query:{
              atype:this.choose_key
          }});
      },
      itemclick(val){
        for(let i in this.type){
          if(val===this.type[i].value){
            this.choose_key=this.type[i].key;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    border: 1px solid #ad7de7;
    border-radius:5px;
    padding: 3px 15px;
    margin-right:10px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color: #ad7de7;
    background-color: rgb(224, 192, 240)
  }
  .demo5-item-disabled{
    color: #888;
    background-color: #dfdfdf;
    border: 1px solid #bfbfbf;
  }
</style>
