<template>
    <group gutter="0">
        <cell v-if="useratype==0" title="钥匙管理" :link="{path:'key_manage',query:{opentype:openType}}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../common/img/keymanage.png"></cell>
        <cell title="访客邀请" :link="{path:'invite_guest',query:{opentype:openType}}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../common/img/visitor.png"></cell>
    </group>
</template>
<script>
  import {setTitle} from '@/common/js/common';
  import {Group,Cell} from 'vux'
  export default{
      data(){
          return{
              openType:0,
              useratype:2,
              hasDoor:0
          }
      },
      mounted(){
          setTitle("门禁管理")
        //   this.get_door_check()

            //userprofile的atype代表身份  0为业主  1为家人
            this.useratype=userProfile.atype
            this.openType=this.$route.query.openType
          //删除的
        //   this.hasDoor=3
        //   this.useratype=0
          //
          document.getElementById("index_loading").style.display="none";
      },
      components:{
          Group,Cell
      },
      methods:{
          //获取开门方式
    //   get_door_check () {
    //     this.$http.get(service_url+"/o2o/door/wexin/hasDoorAuthOrNot/"+userProfile.vid+"/"+userProfile.userid).then((data)=>{
    //       if (data.body.state===0) {
    //         this.hasDoor = data.body.data.auth;
    //         console.log(this.hasDoor,'door')
    //         this.openType = data.body.data.category;
    //         //测试，要删除的
    //         // this.openType=1
    //         // this.hasDoor=3
    //       }
    //     })
    //   },
      }

  }
</script>
<style>
    
</style>