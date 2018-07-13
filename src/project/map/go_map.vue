<template>
  <div></div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import {setTitle} from '@/common/js/common';

  export default{
    mounted(){
        setTitle("扫一扫");
        this.go_qrcode();
      },
      methods:{
        go_qrcode(){
            let self = this;
          wx.config({
            debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //                        debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
                var errMsg = res.errMsg;
                if(errMsg === "scanQRCode:ok"){
                  self.$router.push({path:"/map_index"})
                }
              }
            })
          })
        }
      }
  }
</script>

<style scoped>

</style>
