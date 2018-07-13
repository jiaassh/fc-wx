<!--个人信息的修改页 分成4部分，type=1是去修改手机号，type=2是修改证件类型，type=3是修改性别，type=4是修改姓名-->
<template>
  <div>
    <group v-if="type===1">
      <x-input title="新手机" class="weui-vcode" type="tel" placeholder="请输入手机号" v-model="user_tel">
        <x-button v-if="!issend" slot="right" type="primary" class="zj_button" @click.native="getCode" mini>{{validata}}</x-button>
        <x-button v-else slot="right" type="primary" class="zj_button" mini disabled>{{validata}}</x-button>
      </x-input>
      <x-input title="验证码" type="tel" placeholder="请输入验证码" v-model="user_code" :show-clear="false">
        <div slot="right">{{count}}</div>
      </x-input>
    </group>
    <group v-if="type===2">
      <popup-picker title="证件类型" :data="typelist" v-model="idtype" @on-change="onChange_u" placeholder="请选择证件类型"></popup-picker>
      <x-input title="证件号码" placeholder="请输入" v-model="card_num" :show-clear="false"></x-input>
    </group>
    <group v-if="type===3">
      <popup-picker title="性别" :data="sexList" v-model="sextype" @on-change="onChange_s" placeholder="请选择性别"></popup-picker>
    </group>
    <group v-if="type===4">
      <x-input title="新姓名" placeholder="请输入" v-model="new_name" :show-clear="false"></x-input>
    </group>
    <div style="padding:20px 15px;">
      <x-button type="primary" class="zj_button" @click.native="submit">保存</x-button>
    </div>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
  import {XInput,XButton,PopupPicker,Group,Alert,Loading,Toast} from 'vux'
  import {setTitle} from '@/common/js/common';

  export default{
      components:{
        XInput,XButton,PopupPicker,Group,Alert,Loading,Toast
      },
      data(){
        return{
            type:0,
          typelist:[["身份证","港澳台通行证","护照"]],
          idtype:[],
          card_num:"",
          user_code:"",
          user_tel:"",
          count:"",
          issend:false,
          nums:"",
          clock:"",
          validata:"获取验证码",
          confirm_show:false,
          confirm_content:"",
          isLoading:false,
          alert_text:"",
          show_toast:false,
          toast_text:"",
          new_name:"",
          new_sex:"",
          sexList:[["男","女"]],
          sextype:[]
        }
      },
      mounted(){
        setTitle("设定");
        this.type = parseInt(this.$route.query.type);
        document.getElementById("index_loading").style.display="none";
      },
      methods:{
        /*证照类型变化触发函数*/
          onChange_u(value){
          this.idtype=value;
          this.card_num="";
        },
        /*性别变化触发函数*/
        onChange_s(value){
          this.sextype=value;
          this.new_sex=value[0]==="男"?0:1;
        },
        /*获取验证码*/
        getCode(){
          let myreg = /^[1][34578][0-9]{9}$/;
          /*判断手机号*/
          if(this.user_tel&&this.user_tel!==""&&this.user_tel.length===11&&myreg.test(this.user_tel)){
            let self = this;
            /*设置初始的秒数*/
            this.nums =60;
            /*设置是否发送的参数issend为true*/
            this.issend=true;
            /*发送请求获取验证码*/
            if(service_url){
              this.$http.get(service_url+"/o2o/common/wx/gettoken?phone="+this.user_tel).then((data)=>{
                self.token=data.body.token;
              });
            }else{
              this.token="1234";
            }
            /*计时器的秒数显示*/
            this.count=this.nums+'秒';
            /*设置一个计时器，每秒记一步*/
            this.clock = setInterval(this.doLoop, 1000);
          }else{
            this.confirm_content="请正确输入手机号";
            this.confirm_show=true;
          }
        },
        /*每秒执行一次的函数*/
        doLoop(){
          this.nums--;
          if(this.nums >= 0){
            this.count=this.nums+'秒';
          }else{
            clearInterval(this.clock); //清除js定时器
            this.issend=false;
            this.count="";
            this.validata="再次发送";
            this.nums = 60; //重置时间
          }
        },
        submit(){
          /*提交新的手机号*/
          if(this.type===1){
              if(!this._validate_phone()){
                  return;
              }
              this.isLoading=true;
              this.alert_text="保存中";
              if(service_url){
                  const item = {
                    token:userProfile.token,
                    newphone:this.user_tel
                  };
                  this.$http.post(service_url+"/o2o/common/wx/myinfo/update",item).then((data)=>{
                      this.isLoading=false;
                      if(data.body.status===0){
                        this.show_toast=true;
                        this.toast_text="保存成功";
                        setTimeout(this.go_back,1000);
                      }else{
                        this.confirm_content=data.body.detail;
                        this.confirm_show=true;
                      }
                  })
              }else{
                this.isLoading=false;
                this.show_toast=true;
                this.toast_text="保存成功";
                setTimeout(this.go_back,1000);
              }
              /*更新证照类型*/
          }else if(this.type===2){
              if(!this._validate_card()){
                  return;
              }
            this.isLoading=true;
            this.alert_text="保存中";
            if(service_url){
              /*证照类型匹配规则  1---身份证  2---港澳台通行证  3---护照*/
                let numbertype=[];
                if(this.idtype[0]==="身份证"){
                  numbertype.push(1);
                }else if(this.idtype[0]==="港澳台通行证"){
                  numbertype.push(2);
                }else if(this.idtype[0]==="护照"){
                  numbertype.push(3);
                }
                const item = {
                  numbertype:numbertype,
                  token:userProfile.token,
                  idnumber:this.card_num
                };
              this.$http.post(service_url+"/o2o/common/wx/myinfo/update",item).then((data)=>{
                if(data.body.status===0){
                  this.show_toast=true;
                  this.toast_text="保存成功";
                  setTimeout(this.go_back,1000);
                }else{
                  this.confirm_content=data.body.detail;
                  this.confirm_show=true;
                }
              })
            }else{
              this.isLoading=false;
              this.show_toast=true;
              this.toast_text="保存成功";
              setTimeout(this.go_back,1000);
            }
            /*更新性别*/
          }else if(this.type===3){
            const item = {
              token:userProfile.token,
              newsex:this.new_sex
            };
            this.$http.post(service_url+"/o2o/common/wx/myinfo/update",item).then((data)=>{
              if(data.body.status===0){
                this.show_toast=true;
                this.toast_text="保存成功";
                setTimeout(this.go_back,1000);
              }else{
                this.confirm_content=data.body.detail;
                this.confirm_show=true;
              }
            })
            /*更新姓名*/
          }else if(this.type===4){
            if(!this._validate_name()){
              return;
            }
            const item = {
              token:userProfile.token,
              newname:this.new_name
            };
            this.$http.post(service_url+"/o2o/common/wx/myinfo/update",item).then((data)=>{
              if(data.body.status===0){
                this.show_toast=true;
                this.toast_text="保存成功";
                setTimeout(this.go_back,1000);
              }else{
                this.confirm_content=data.body.detail;
                this.confirm_show=true;
              }
            })
          }
        },
        /*返回上一级*/
        go_back(){
          this.$router.go(-1);
        },
        /*验证手机号*/
        _validate_phone(){
          let myreg = /^[1][34578][0-9]{9}$/;
          if(!myreg.test(this.user_tel)){
            this.confirm_show=true;
            this.confirm_content="请正确输入手机号";
            return false;
          }
          if(JSON.stringify(this.token)!==JSON.stringify(this.user_code)){
            this.confirm_show=true;
            this.confirm_content="请正确输入验证码";
            return false;
          }
          return true;
        },
        /*验证证照类型*/
        _validate_card(){
          if(this.idtype.length===0){
            this.confirm_show=true;
            this.confirm_content="请选择证件类型";
            return false;
          }
          if(!this.card_num){
            this.confirm_show=true;
            this.confirm_content="请选择证件号";
            return false;
          }
          return true;
        },
        /*验证姓名*/
        _validate_name(){
          if(this.new_name.trim()===""){
            this.confirm_show=true;
            this.confirm_content="请输入姓名";
            return false;
          }
          return true;
        },

      }
  }
</script>

<style scoped>

</style>
