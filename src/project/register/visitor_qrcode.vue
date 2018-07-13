<template>
  <div>
    <div><img src = "../../../static/img/BG.png" style="width:100%;height:100%;"/></div>
    <div class="visitor_title">
      <div style="margin-left:-5px;margin-bottom:5px;">【请选择阁下的身份】</div>
      <checker
        v-model="choose"
        type="radio"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected"
        disabled-item-class="demo5-item-disabled">
        <checker-item v-for="item in type" :key="item" :value="item.value" @on-item-click="itemclick">{{item.value}}</checker-item>
      </checker>
    </div>
    <div class="visitor_title">
      <button class="visitor_button_submit" :style="button_width" @click="go_next">扫码绑定</button>
    </div>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>

</template>

<script>
  import {setTitle} from '@/common/js/common';
  import wx from 'weixin-js-sdk';
  import {Checker,CheckerItem,Alert,Loading,Toast} from 'vux';

  export default{
      data(){
          return{
            confirm_show:false,
            show_toast:false,
            isLoading:false,
            toast_text:"",
            alert_text:"",
            confirm_content:"",
            type:[{
              key:1,
              value:'家人'
            },{
              key:2,
              value:'租户'
            }],
            choose:"家人",
            choose_key:1
          }
      },
    components:{
      Checker,CheckerItem,Alert,Loading,Toast
    },
    mounted(){
      setTitle("扫码绑定");
      document.body.style.background="black";
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      itemclick(val){
        for(let i in this.type){
          if(val===this.type[i].value){
            this.choose_key=this.type[i].key;
          }
        }
      },
      go_next(){
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
          alert("ready")
          wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode"],
            success: function (res) {
              alert(JSON.stringify(res))
              var resultStr = res.resultStr;
              var errMsg = res.errMsg;
              alert(resultStr)
              alert(errMsg)
              if(errMsg === "scanQRCode:ok"){
                alert("进入判断")
                const item={
                  housenumber:resultStr,
                  token:userProfile.token,
                  atype:this.choose_key
                };
                this.isLoading=true;
                this.alert_text="加载中";
                this.$http.post(service_url+"/o2o/common/wx/qrcodebind",item).then((data)=>{
                  alert("进入请求")
                  alert(JSON.stringify(data))
                  if(data.body.status===0){
                    this.isLoading=false;
                    this.show_toast=true;
                    this.toast_text="绑定成功";
                    userProfile=data.body.data;
                    setTimeout(this.go_index,1000);
                  }else{
                    this.confirm_content=data.body.detail;
                    this.confirm_show=true;
                  }
                })
              }else{
                this.confirm_content="访问失败";
                this.confirm_show=true;
              }
            }
          });
        })
      },
      go_index(){
          this.$router.push({path:"index"});
      }
    },
    computed:{
      button_width(){
          return{
            "width":(document.body.clientWidth-30)+"px"
          }
      }
    }
  }
</script>

<style scoped>
  .visitor_title{padding:10px 15px;;color:#fbcf72;border: 0px;}
  .visitor_four{width:24.5%;float: left;}
  /*.visitor_content{position:fixed; bottom:0;width: 100%;}*/
  .demo5-item {
    font-size:14px;
    border: 1px solid #fbcf72;
    border-radius:5px;
    padding: 3px 15px;
    margin-right:10px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    /*background:url(../../../static/img/visitor_choose.png);*/
    /*background-size:cover;*/
    background: url(../../../static/img/visitor_choose.png) 80px;
    border: 1px solid #fff;
    /*color: #ad7de7;*/
    /*background-color: rgb(224, 192, 240)*/
  }
  .demo5-item-disabled{
    color: #888;
    background-color: #dfdfdf;
    border: 1px solid #bfbfbf;
  }
</style>
