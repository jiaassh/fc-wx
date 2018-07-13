<template>
  <div style="text-align:center">
      <img :src="imgsrc" style="width:7rem;margin-top:3rem">
  </div>
</template>
<script>
import {setTitle} from '@/common/js/common';
 import wx from "weixin-js-sdk"; // 引入微信js
    export default{
        data(){
            return {
                imgsrc:''
            }
        },
        mounted(){
            setTitle("访客邀请");
            var that=this
            this.imgsrc=this.$route.query.imgsrc
             // 微信分享
             wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //                                  debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: userProfile.wx.appid, // 必填，公众号的唯一标识
                timestamp: userProfile.wx.timestamp, // 必填，生成签名的时间戳
                nonceStr: userProfile.wx.nonceStr, // 必填，生成签名的随机串
                signature: userProfile.wx.signature, // 必填，签名，见附录1
                jsApiList: [
                "checkJsApi",
                "startRecord",
                "stopRecord",
                "translateVoice",
                "scanQRCode",
                "openCard",
                "onMenuShareAppMessage"
                ]
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                  wx.onMenuShareAppMessage({
                        title: '【紫荆管家】访客来访临时卡', // 分享标题
                        link:that.imgsrc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:service_url+'/o2o/common/static/img/wxshare.png',
                        success: function () { 
                            this.alert_show=true 
                            this.dialog_title="提示"
                            this.content="分享成功"
                            this.backindex='返回首页'
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                        
                        // 用户取消分享后执行的回调函数
                        }
                });
            })
            



            document.getElementById("index_loading").style.display="none";
        }
    }
</script>
<style>

</style>
