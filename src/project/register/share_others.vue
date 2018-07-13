<template>
  <div>
    <div style="padding:20px 15px;text-align: center;" class="common_color">{{data.address}}</div>
    <div style="padding:0 15px;"><label style="width:6em;">被邀人身份</label>
      <checker style="padding:10px 15px;border-top:1px solid #ececec;display:inline-block;"
           v-model="choose"
           type="radio"
           default-item-class="demo5-item common_border_color"
           selected-item-class="demo5-item-selected common_background"
           disabled-item-class="demo5-item-disabled"
    >
      <checker-item style="font-size:14px;" v-for="item in type" :key="item" :value="item.value" @on-item-click="itemclick">{{item.value}}</checker-item>
    </checker></div>
    <group gutter="0">
      <x-input type="tel" title="被邀人手机号" v-model="tel" placeholder="请输入"></x-input>
    </group>
    <div style="font-size:14px;padding:10px 15px;" class="common_color">
      {{content}}
    </div>
    <div style="padding:20px 15px;">
      <x-button type ="primary" class="zj_button" @click.native="send_msg">发送至对方手机</x-button>
    </div>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Checker,CheckerItem,XInput,Group,XButton,Alert,Toast,Loading} from 'vux';

  export default{
      data(){
          return{
            data:{},
            tel:"",
            choose:"家人",
            type:[{
                key:1,
                value:'家人'
            },{
                key:2,
                value:'租户'
            }],
            id:"",
            content:"",
            choose_key:1,
            confirm_show:false,
            confirm_content:"",
            show_toast:false,
            isLoading:false,
            alert_text:"",
            toast_text:""
          }
      },
    mounted(){
      setTitle("邀请他人");
      this.id = this.$route.query.id;
      this.getList();
      document.getElementById("index_loading").style.display="none";
    },
    components:{
      Checker,CheckerItem,XInput,Group,XButton,Alert,Toast,Loading
    },
    methods:{
      itemclick(val){
          this.choose=val;
          for(let i in this.type){
              if(val ===this.type[i].value){
                  this.choose_key=this.type[i].key;
              }
          }
      },
      getList(){
          if(service_url){
              const item = {
                houseid:this.id,
                token:userProfile.token
              };
            this.$http.post(service_url+"/o2o/common/wx/invitation",item).then((data)=>{
                if(data.body.status===0){
                  this.data= data.body.data;
                  this.content='【紫荆管家】亲，'+this.data.owner+'诚挚地邀请您绑定“'+this.data.address+ '”，邀请码为“'+this.data.invitacode+'”。请关注并打开“紫荆管家”服务号，点击“绑定房产”>“邀请码绑定”。邀请码有效期为'+this.data.effective;
                }else{

                }
            })
          }else{
            this.$http.get("/api/invite_others").then((data)=>{
              this.data=data.body.data;
              this.content='【紫荆管家】亲，'+this.data.owner+'诚挚地邀请您绑定“'+this.data.address+ '”，邀请码为“'+this.data.invitacode+'”。请关注并打开“紫荆管家”服务号，点击“绑定房产”>“邀请码绑定”。邀请码有效期为'+this.data.over_time;
            })
          }
      },
      _validate(){
        if(!this.tel){
            this.confirm_show=true;
            this.confirm_content="请输入手机号";
            return false;
        }
        let myreg = /^[1][34578][0-9]{9}$/;
        if(!myreg.test(this.tel)){
          this.confirm_show=true;
          this.confirm_content="请正确输入手机号";
          return false;
        }
        return true;
      },
      send_msg(){
          if(!this._validate()){
              return;
          }
          this.isLoading=true;
        if(service_url){
            const item = {
              houseid:this.id,
              atype:this.choose_key,
              phone:this.tel,
              content:this.data.invitacode,
              token:userProfile.token
            };
            this.$http.post(service_url+"/o2o/common/wx/commontinvi",item).then((data)=>{
              this.isLoading=false;
              if(data.body.status===0){
                this.show_toast=true;
                this.toast_text="发送成功";
                setTimeout(this.go_back,1000);
              }else{
                this.confirm_show=true;
                this.confirm_content=data.body.detail;
              }
            })
        }else{
          this.isLoading=false;
          this.show_toast=true;
          this.toast_text="发送成功";
          setTimeout(this.go_back,1000);
        }
      },
      go_back(){
          this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    border-radius:5px;
    padding: 3px 15px;
    margin:5px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color: white;
    /*background-color: rgb(224, 192, 240)*/
  }
  .demo5-item-disabled{
    color: #888;
    background-color: #dfdfdf;
    border: 1px solid #bfbfbf;
  }
</style>
