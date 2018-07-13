<template>
  <div class="visitor_background" id="visitor_background">
    <div id="visitor_family">
      <div class="split_image"><img :src = "header_Image" style="width:100%;height:100%;"/></div>
        <div class="visitor_login_content">
          <div class="visitor_content">
            <div class="visitor_title visitor_color">
              <label class="visitor_label" >姓名</label> <input class="visitor_input visitor_width_pro bing_num_background" v-model="user_name" placeholder="请输入真实姓名">
            </div>
            <div class="visitor_title visitor_color">
                <label class="visitor_label">手机号</label> <input type="tel" class="visitor_input visitor_width_pro bing_num_background" v-model="user_tel" placeholder="请输入手机号">
            </div>
            <div class="visitor_title visitor_color">
                <label class="visitor_label">验证码</label> <input type="tel" v-model="user_code" class="visitor_input visitor_width_second bing_num_background" placeholder="请输入验证码"><button v-if="issend" class="visitor_input visitor_width_min visitor_button_code">{{count?count:validata}}</button><button v-else class="visitor_input visitor_width_min visitor_button_code" @click="getCode">{{count?count:validata}}</button>
            </div>
            <div v-if="router_type===1" class="visitor_title visitor_color">
              <label class="visitor_label">房产</label> <div class="visitor_input visitor_width_pro bing_num_background"@click="show_pop">{{house_choose}}</div>
            </div>
            <div v-if="router_type===3" class="visitor_title visitor_color">
              <label class="visitor_label">身份</label><checker
              style="display:inline-block;margin-left:.15rem;"
              v-model="choose"
              type="radio"
              default-item-class="visitor_demo5-item"
              selected-item-class="visitor_demo5-item-selected"
              disabled-item-class="visitor_demo5-item-disabled">
              <checker-item v-for="item in type" :key="item" :value="item.value" @on-item-click="itemclick">{{item.value}}</checker-item>
            </checker>
            </div>

            <div class="visitor_title visitor_color">
              <button class="visitor_button_submit" @click="submit">{{button_name}}</button>
            </div>
          </div>
        </div>
    </div>
    <group>
      <!--<picker :data='house_list' :columns=3 v-model='housedesc' @on-change='onChange_h'></picker>-->
      <popup-picker :show-cell="false" :show="showPopupPicker" :data="house_list" :columns="3" v-model="housedesc" ref="picker3" @on-change="onChange_h" @on-hide="showPopupPicker=false" :showName="show_name" show-name></popup-picker>
      <!--<popup-picker title="title4" :data="house_list" :columns="3" v-model="housedesc" show-name @on-change="onChange_x"></popup-picker>-->
      <!--<popup-picker :show-cell="false" :show="showPopupPicker" title="房产" :data="house_list" v-model="housedesc" @on-change="onChange_h" @on-hide="showPopupPicker=false"></popup-picker>-->
    </group>
    <alert v-model="confirm_show" title="提示">{{confirm_content}}</alert>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import $ from 'jquery';
  import wx from 'weixin-js-sdk';
  import {Alert,Actionsheet,Checker,CheckerItem,PopupPicker,Group,Loading,Toast,Picker} from 'vux';

  export default{
      data(){
          return{
            show_name:true,
            isLoading:false,
            router_type:0,
            alert_text:"",
            show_toast:false,
            choose:"家人",
            choose_key:1,
            toast_text:"",
            city:"",
            address:"",
            atype:-1,
            user_tel:"",
            user_name:"",
            user_code:"",
            house_list:[],
            showPopupPicker:false,
            housedesc:[],
            house_choose:"请选择",
            token:-1,
            confirm_content:"",
            confirm_show:false,
            validata:"获取验证码",
            issend:false,
            nums:"",
            hid:"",
            clock:"",
            type:[{
              key:1,
              value:'家人'
            },{
              key:2,
              value:'租户'
            }],
            count:0,
            button_name:"",
            header_Image:""
          }
      },
    mounted(){
      if(enter_mark===1){
        this.header_Image="../static/img/BG.jpg";
      }else if(enter_mark===2){
        $(".visitor_title input").focus(function(){
          console.log($("#visitor_background").removeClass("visitor_background").addClass("visitor_background_static"));
        });
        $(".visitor_title input").blur(function(){
          console.log($("#visitor_background").removeClass("visitor_background_static").addClass("visitor_background"));
        });
        this.header_Image="../static/img/tj_name.png";
      }
      setTitle("绑定房产");
      this.atype=parseInt(this.$route.query.atype);
      this.router_type=parseInt(this.$route.params.router_type);
      if(this.router_type===1){
          this.button_name="提交";
      }else if(this.router_type===2){
          this.button_name="下一步";
      }else if(this.router_type===3){
          this.button_name="扫码";
      }
      this.address=this.$route.query.address;
      this.city=this.$route.query.city;
      document.getElementById("index_loading").style.display="none";
      this.getList();
    },
    components:{
      Alert,Actionsheet,PopupPicker,Group,Loading,Checker,CheckerItem,Toast,Picker
    },
    methods:{
      getList(){
        if(service_url){
          this.$http.get(service_url+"/o2o/common/wx/houselist2?vid="+this.address).then((data)=>{
            this.house_list=JSON.parse(data.body.data);
          })
        }else{
          this.$http.get("/api/visitor_owner").then((data)=>{
            this.house_list = data.body.data;
            if(this.house_list[1].length===1){
              this.house_list.splice(1,1);
            }
          })
        }
      },
      show_pop(){
          this.showPopupPicker=true;
      },
      onChange_h(type){
        this.housedesc=type;
        this.hid=this.housedesc[2];
        let housedesc=this.$refs.picker3&&this.$refs.picker3.getNameValues();
        let house_desc = housedesc.split(" ");
//        let a = housedesc.substring(0,2);
//        let b = housedesc.substring(3,4);
//        let c = housedesc.substring(6,10);
        if(type.length===2){
          this.house_choose=house_desc[0]+"栋"+house_desc[2]+"室";
        }else if(type.length===3){
          this.house_choose=house_desc[0]+"栋"+house_desc[1]+"单元"+house_desc[2]+"室";
        }
        console.log(this.housedesc);
      },
      getCode(){
        let myreg = /^[1][34578][0-9]{9}$/;
        if(this.user_tel&&this.user_tel!==""&&this.user_tel.length===11&&myreg.test(this.user_tel)){
          let self = this;
          this.nums =60;
          this.issend=true;
          if(service_url){
            this.$http.get(service_url+"/o2o/common/wx/gettoken?phone="+this.user_tel).then((data)=>{
              self.token=data.body.token;
            });
          }else{
            this.token="1234";
          }
          this.count=this.nums+'秒';
          this.clock = setInterval(this.doLoop, 1000);
        }else{
          this.confirm_content="请正确输入手机号";
          this.confirm_show=true;
        }
      },
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
        if(JSON.stringify(this.token)===JSON.stringify(this.user_code)){
            if(this.router_type===1){
              const item = {
                atype:this.atype,
                village:this.address,
                username:this.user_name,
                userphone:this.user_tel,
                token:userProfile.token,
                house:this.housedesc,
                hid:this.hid
              };
              this.sendMsg(item);
            }else if(this.router_type===2){
                this.$router.push({path:"/visitor_bind",query:{username:this.user_name,userphone:this.user_tel}})
            }else if(this.router_type===3){
                this.go_code();
            }
        }else{
          this.confirm_show=true;
          this.confirm_content="请正确输入验证码";
          return;
        }
      },
      _validate(){
        if(!this.user_name){
          this.confirm_show=true;
          this.confirm_content="请输入您的姓名";
          return false;
        }
        if(!this.user_tel){
          this.confirm_show=true;
          this.confirm_content="请输入您的手机号";
          return false;
        }
        let myreg = /^[1][34578][0-9]{9}$/;
        if(!myreg.test(this.user_tel)){
          this.confirm_show=true;
          this.confirm_content="请正确输入您的手机号";
          return false;
        }
        if(this.router_type===1&&this.house_choose==="请选择"){
          this.confirm_show=true;
          this.confirm_content="请选择您的房产";
          return false;
        }
        return true;
      },
      sendMsg(item){
        if(!this._validate()){
            return;
        }
        this.isLoading=true;
        this.alert_text="提交中";
        if(service_url){
            this.$http.post(service_url+"/o2o/common/wx/reg/request",item).then((data)=>{
                this.isLoading=false;
                if(data.body.status===0){
                  userProfile=data.body.data;
                  this.show_toast=true;
                  this.toast_text="绑定成功";
                  setTimeout(this.go_index,1000);
                }else if(data.body.status===1){
                  this.confirm_content=data.body.detail;
                  this.confirm_show=true;
                }else{
                  let receive_arr=data.body.data;
                  let str = JSON.stringify(receive_arr);
                  let housedesc = JSON.stringify(this.housedesc);
                  this.$router.push({path:"/visitor_complete",query:{str:str,username:this.user_name,userphone:this.user_tel,address:this.address,atype:this.atype,housedesc:housedesc,hid:this.hid}});
                }
            })
        }else{
          this.isLoading=false;
          this.show_toast=true;
          this.toast_text="绑定成功";
          userProfile.isreg=0;
          let receive_arr=[
              "15827717357","18271672016"
          ];
          let user_name="叶艾雪";
          let user_tel="18271672154";
          let address="就算站在烈日骄阳大桥上";
          let atype=1;
          let housedesc=["1231","321"];
          let str = JSON.stringify(receive_arr);
          housedesc = JSON.stringify(housedesc);
          this.$router.push({path:"/visitor_complete",query:{str:str,username:user_name,userphone:user_tel,address:address,atype:atype,housedesc:housedesc}});
        }
      },
      go_code(){
          let self =this;
        wx.config({
          debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                                  debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId : userProfile.wx.appid, // 必填，公众号的唯一标识
          timestamp : userProfile.wx.timestamp, // 必填，生成签名的时间戳
          nonceStr : userProfile.wx.nonceStr, // 必填，生成签名的随机串
          signature : userProfile.wx.signature ,// 必填，签名，见附录1
          jsApiList : ['checkJsApi', 'startRecord', 'stopRecord','translateVoice','scanQRCode', 'openCard']
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode"],
            success: function (res) {
              var resultStr = res.resultStr;
              var errMsg = res.errMsg;
              if(errMsg == "scanQRCode:ok"){
                const item={
                  housenumber:resultStr,
                  token:userProfile.token,
                  atype:self.choose_key,
                  username:self.user_name,
                  userphone:self.user_tel
                };
                self.isLoading=true;
                self.alert_text="加载中";
                self.$http.post(service_url+"/o2o/common/wx/qrcodebind",item).then((data)=>{
                  if(data.body.status===0){
                    self.isLoading=false;
                    self.show_toast=true;
                    self.toast_text="绑定成功";
                    userProfile=data.body.data;
                    setTimeout(self.go_index,1000);
                  }else{
                    self.confirm_content=data.body.detail;
                    self.confirm_show=true;
                  }
                })
              }else{
                self.confirm_content="访问失败";
                self.confirm_show=true;
              }
            }
          });
        })
      },
      itemclick(val){
        for(let i in this.type){
          if(val===this.type[i].value){
            this.choose_key=this.type[i].key;
          }
        }
        console.log(this.choose_key);
      },
      go_index(){
        this.$router.push({path:"/index"});
      }
    },
    computed:{
       /* input_style(){
            return {
              "width":(document.body.clientWidth-112)+"px",
            }
        },
        code_style(){
            return{
              "width":(document.body.clientWidth-219)+"px"
            }
        },
      button_width(){
        return{
          "width":(document.body.clientWidth-30)+"px"
        }
      }*/
    }
  }
</script>

<style scoped>
  /*#visitor_family .visitor_title{font-size:17px;padding:5px;color:#fbcf72;border: 0;}*/
  #visitor_family .visitor_four{width:24.5%;float: left;}
  /*#visitor_family .visitor_content{position:fixed; bottom:0;width: 100%;}*/
  /*#visitor_family .visitor_input{border:1px solid #ecc470;box-shadow: 0 0 10px rgba(186,147,41,.5) inset,0 0 10px rgba(255,255,255,.3);background-color: #000;color:#fff;border-radius: 5px; padding: 8px 4px;text-indent: 12px;}*/
  #visitor_family .visitor_label{width: 1.5rem;display: inline-block;text-align: right;margin-right:.2rem;}
  #visitor_family .visitor_button_big{color:#fbcf72;}
  .visitor_input_1{
    border:1px solid #fbcf72;
    background-color: #000;
    color:#fff;border-radius: 5px; padding: 4px 4px;text-indent: 12px;
    display:inline-block;
    box-shadow: 0 0 10px rgba(186,147,41,.5) inset,0 0 10px rgba(255,255,255,.3);
  }
  .visitor_button_get{
    font-size:16px;
    width:97px;
    text-align: center;
    border: 1px solid #fbcf72;
    background-color: #000;
    border-radius: 5px;
    padding: 8px 4px;
    margin-left:10px;
    color:#fbcf72;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #d0d0d0; opacity:1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #d0d0d0;opacity:1;
  }

  input:-ms-input-placeholder{
    color: #d0d0d0;opacity:1;
  }

  input::-webkit-input-placeholder{
    color: #d0d0d0;opacity:1;
  }
  /*.demo5-item {
    margin-right:.5rem;
    color:white;
    font-size:.4rem;
    border: 1px solid #fbcf72;
    border-radius:5px;
    padding: .1rem .5rem;
    box-shadow: 0 0 10px rgba(186,147,41,.5) inset,0 0 10px rgba(255,255,255,.3);
  }
  .demo5-item:last-child {
    margin-right:0;
  }
  .demo5-item-selected {
    background: url(../../../static/img/visitor_choose.png) 100px;
    border:none;
    padding: .12rem .52rem;
    color:#fbcf72;
    box-shadow: 0 1px 5px rgba(255,255,255,0.3) inset, 0 0 10px rgba(255, 255, 255, 0.3);
  }
  .demo5-item-disabled{
    color: #888;
    background-color: #dfdfdf;
    border: 1px solid #bfbfbf;
  }*/
</style>
