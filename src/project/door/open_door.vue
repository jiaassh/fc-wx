<template>
  <div>
    <div class="img" ref="img"></div>
    <scroller lock-x scrollbar-y height="132px" ref="scrollerEvent">
      <div class="box2">
        <p v-for="(item,index) in doorlist" @click="openDoor(index)">{{item.name}}</p>
      </div>
    </scroller>
    <alert v-model="show1" :title="title1" @on-hide="onHide">{{text1}}</alert>
    <alert v-model="show3" :title="title3">{{text3}}</alert>
  </div>
</template>

<script>
  // var service_url = 'http://192.168.0.24:8090';

  import { Scroller,Alert } from 'vux'
  import {setTitle} from '@/common/js/common';
  // let avatar = require('../../../static/img/open_door.png');

  const w = 44;
  const h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
  export default{
    data(){
      return{
        scrollTop: 0,
        doorlist: [],
        show1: false,
        show3:false,
        title1: '开门成功',
        title3: '',
        text1: '',
        text3: ''
      }
    },
    components:{
      Scroller,Alert
    },
    mounted(){
      setTitle("智能开门");
      let self = this
      this.$http.post(service_url+"/o2o/door/wexin/lookUpDoorAuth", {userid:userProfile.userid,villageid:userProfile.vid}).then((data)=>{
//      this.$http.post(service_url+"/IntelligentDoor/wexin/lookUpDoorAuth", {userid:1,villageid:1}).then((data)=>{
          if(parseInt(data.body.state) === 0){
            self.doorlist = data.body.data
            self.$refs.img.style.height = (h - w * 3) + 'px';
            self.$nextTick(() => {
              self.$refs.scrollerEvent.reset({top: 0})
            });
          }else{
            self.text3=data.body.message;
            self.show3=true;
          }
      });
    },
    methods:{
      openDoor (index) {
        let self = this
        this.$http.post(service_url+"/o2o/door/web/remoteOpenDoor", {userid:userProfile.userid,houseid:userProfile.houseid,doorid:this.doorlist[index].id,usertype:userProfile.atype,openname:userProfile.name,openmethod:'wx',villageid:userProfile.vid}).then((data)=>{
//        this.$http.post(service_url+"/IntelligentDoor/web/remoteOpenDoor", {userid:1,doorid:this.doorlist[index].id,usertype:userProfile.atype,openname:userProfile.name,openmethod:'wx',villageid:1}).then((data)=>{
          if(parseInt(data.body.state) === 0){
            self.show1 = true;
          } else {
            self.title3 = data.body.msg;
            self.show3 = true;
          }
        });
      },
      onHide () {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  @import '../../common/css/menjin.css';
  .img{
    width:100%;
    background: url(../../../static/img/open_door.jpg) no-repeat;
    background-size:cover;
  }
  .box2{
    background: #fff;
    min-height:132px;
  }
  .box2 p{
    height: 44px;
    line-height:44px;
    text-align: center;
    font-size:18px;
    color:#000;
    border-top:1px solid #e9e9e9;
    box-sizing: border-box;
  }
  .box2 p:last-child{
    border-bottom:1px solid #e9e9e9;
  }
</style>
