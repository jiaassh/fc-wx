<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div>
      <header class="this_header">
        <div class="fus_msg">
          <div class="fus_h">{{user_name}}</div>
          <div class="fus_p">{{position}}</div>
        </div>
        <div class="fus_img">
          <img :src = "pic"/>
        </div>
      </header>
      <group gutter="0">
        <!--<cell title="性别">
          <checker v-model="sex"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item  v-for="item in models" style="margin-bottom: 5px;" :key="item.name" :value="item.name" @on-item-click="itemclick" disabled>{{item.name}}</checker-item>
          </checker>
        </cell>-->
        <cell title="性别" :value="sex" is-link @click.native="go_setting(3)"></cell>
        <cell title="姓名" :value="user_name" is-link @click.native="go_setting(4)"></cell>
        <cell title="手机" :value="old_tel" is-link @click.native="go_setting(1)"></cell>
        <!--<x-input title="新手机" class="weui-vcode" placeholder="请输入手机号" v-model="user_tel">
          <x-button v-if="issend" slot="right" type="primary" class="zj_button" @click.native="getCode" mini>发送验证码</x-button>
          <x-button v-else slot="right" type="primary" class="zj_button" @click.native="getCode" mini disabled>发送验证码</x-button>
        </x-input>
        <x-input title="验证码" placeholder="请输入验证码" v-model="user_code" :show-clear="false">
          <div slot="right">{{count}}</div>
        </x-input>-->
        <cell :title="card_type" :value="idtype" is-link @click.native="go_setting(2)"></cell>
        <!--<x-input title="证件号码" placeholder="请输入" v-model="card_num"></x-input>-->
        <cell title="注册时间" :value="register_time"></cell>
      </group>
      <!--<div style="padding:20px 10px;"><x-button type="primary" class="zj_button" @click.native="_save">保存</x-button></div>-->
    </div>
  </div>
</template>

<script>
  import loading from '@/components/loading/dataLoading';
  import {setTitle} from '@/common/js/common';
  import {Group,Cell,Checker,CheckerItem,XInput,XButton,PopupPicker} from 'vux';

  export default{
    data(){
      return{
        loading:true,
        models:[{
            name:'男'
        },{
            name:'女'
        }],
        count:"",
        user_code:"",
        user_tel:"",
        issend:true,
        typelist:[["身份证","港澳台通行证","护照"]],
        idtype:"暂无",
        card_num:"",
        user_name:"",
        old_tel:"",
        register_time:"",
        token:"",
        sex:"",
        pic:"",
        card_type:"证件类型",
        position:""
      }
    },
    components:{
      loading,Group,Cell,Checker,CheckerItem,XInput,XButton,PopupPicker
    },
    mounted(){
        let self = this;
        setTitle("个人资料");
        if(service_url){
          this.$http.get(service_url+"/o2o/common/wx/myinfo").then((data)=>{
            self.user_name=data.body.data.name.val;
            self.old_tel=data.body.data.phone.val;
            self.register_time=data.body.data.time.val;
            self.card_type=data.body.data.numbertype?this.getCartType(data.body.data.numbertype):"证件类型";
            self.idtype=data.body.data.idnumber?data.body.data.idnumber:"暂无";
            self.pic=data.body.data.pic;
            self.sex = data.body.data.sex.val==='0'?'男':'女';
            self.position = data.body.data.position.val;
          })
        }else{
          this.$http.get("/api/myinfo").then((data)=>{
            self.user_name=data.body.data.data.name.val;
            self.old_tel=data.body.data.data.phone.val;
            self.register_time=data.body.data.data.time.val;
            self.sex='男';
            self.pic=data.body.data.data.pic;
          })
        }

      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      getCartType(type){
          type = parseInt(type);
          let arr=["身份证","港澳台通行证","护照"];
          return arr[type-1];
      },
      itemclick(val){
        this.sex = val;
      },
      getCode(){
        let self = this;
        this.nums =60;
        this.issend=false;
        this.$http.get(service_url+"/o2o/common/wx/gettoken?phone="+this.user_tel).then((data)=>{
          self.token=data.body.token;
        });
        this.count=this.nums+'秒';
        this.clock = setInterval(this.doLoop, 1000);
      },
      doLoop(){
        this.nums--;
        if(this.nums >= 0){
          this.count=this.nums+'秒';
          console.log(this.count);
        }else{
          clearInterval(this.clock); //清除js定时器
          this.issend=true;
          this.nums = 60; //重置时间
        }
      },
      onChange_u(value){
        this.idtype=value;
      },
      _save(){
          let self = this;
        if(JSON.stringify(this.token)===JSON.stringify(this.user_code)){
            const item = {
                data:{
                  sex:this.sex,
                  phone:this.user_tel,
                  phonecode:this.user_code,
                  idcode:this.card_num,
                  type:this.idtype,
                }
            };
            if(service_url){
              this.$http.post(service_url+"/o2o/common/wx/myinfo/update",item).then((data)=>{
                self.$router.push({path:"index"});
              })
            }else{
              self.$router.go(-1);
            }
        }

      },
      go_setting(type){
        this.$router.push({path:"new_message",query:{type:type}})
      }
    },
  }
</script>

<style scoped>
  .text-center{
    text-align: center;
  }
  .this_header{
    color:white;
    position:relative;
    padding: .5rem .4rem;
    border-bottom:1px solid #ececec;
    background: url(../../../static/img/userself_top.png) center center / cover no-repeat rgb(106, 73, 109);
  }
  .avatar{
    margin:0 auto;
  }
  .avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .img_circle{
    border-radius: 50%;
  }
  .img_circle_border{
    margin-top: 10px;
    width: 80px;
    height: 80px;
    border: 4px solid rgba(255, 255, 255, 0.498039);
  }
  .ellipsis{
    text-overflow: ellipsis;
  }
  .ellipsis p{
    font-size:.8em;
  }
  .demo4-item {
    background-color: rgba(221, 221, 221, 0.38);
    color: #222;
    font-size: 13px;
    padding: 5px 20px;
    margin-right: 10px;
    line-height: 16px;
    border-radius: 15px;
  }

  .demo4-item-selected {
    color:white;
    background-color:#ad7de7;
  }

  .demo4-item-disabled {
    /*color: #999;*/
  }
  .fus_msg{
    display: inline-block;
    width:7rem;
    line-height: 1;
  }
  .fus_h{
    font-size:.7rem;
    margin-bottom:.35rem;
  }
  .fus_p{
    font-size:.4rem;
  }
  .fus_img{
    display:inline-block;
    height:1.55rem;
    width:1.55rem;
  }
  .fus_img img{
    width:100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
</style>
