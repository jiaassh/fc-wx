<template>
  <div>
      <div v-show="showmsg" style="position:fixed;width:100%;height:100%;background:#000;opacity:0.7;z-index:3">
      <div><img src="./share.png" style="width:6.333rem;margin-left:2.907rem;margin-top:0.08rem"></div>
      <div @click="know" style="position:absolute;top:10rem;left:50%;transform:translateX(-50%);width:3.893rem;height:1.48rem;border-radius:1.48rem;color:#fff;font-size:0.667rem;line-height:1.48rem;text-align:center;border:1px solid #fff;font-family:DFWaWaSC-W5">知道了</div>
    </div>
    <div style="padding-top:0.278rem">
        <div style="background:#fff;margin:0 auto;border:1px solid #AE8EE1;border-radius:10px;margin:0 0.4rem 0.556rem">
          <!-- 加的 -->
          <div style="">
        <div style="position:relative;width:9.067rem;margin:0 auto;height:5.2rem;padding:0.2rem;box-sizing:border-box">
            <img src="./invitecode.png" style="width:100%">
            <div style="width:1.2rem;height:100%;font-size:0.347rem;position:absolute;left:0.187rem;top:0;text-align:center;color:#FFFFFF;padding:1.067rem 0.427rem;box-sizing:border-box;letter-spacing:0;line-height:0.4rem">访客来访临时卡</div>
            <div style="position:absolute;top:0.4rem;left:1.52rem;padding-bottom:0.27rem;border-bottom:1px solid #E1E1E1;width:7rem">
                <p style="color:#888888;font-size:0.32rem">地址</p>
                <p style="padding-bottom:0.18rem;border-bottom:1px solid #E1E1E1;display:flex;display:-webkit-flex;justify-content:space-between;-webkit-justify-content:space-between;min-height:1.2rem"><span style="color:#333333;max-width:2.8rem;">{{vilname}}</span><span><span style="color:#333333;margin-right:0.55rem"><span>{{area}}</span><span>{{building}}</span><span v-show="unitshow">{{unit}}</span></span><span style="color:#333333">{{houseName}}</span></span></p>
                <p style="display:flex;display:-webkit-flex;justify-content:space-between;-webkit-justify-content:space-between;margin-top:0.287rem;font-size:0.32rem"><span style="color:#888888">业主姓名</span><span style="#333333">{{username}}</span></p>
                <div style="display:flex;display:-webkit-flex;justify-content:space-between;-webkit-justify-content:space-between;margin-top:0.267rem;font-size:0.32rem"><p style="color:#888888">有效期至</p><p><span style="#333333;margin-right:0.2rem">{{date}}</span><span style="#333333">{{hours}}</span></p></div>
            </div>
            <div><img src="./logo.png" style="width:1.667rem;position:absolute;bottom:0.227rem;right:0.58rem"></div>
        </div>
        <div style="width:9.067rem;margin:0 auto;margin-top:0.4rem">
            <flexbox style="width:90%;margin:0 auto" justify="space-between" wrap="wrap">
                <flexbox-item v-for="(item,index) in doorlist" :span="1/2.3" :key="index" style="background:#6336a8;box-sizing:border-box;line-height:1.067rem;border-radius:5px;color:#fff;font-size:0.427rem;margin:0 0;margin-left:0;margin-bottom:0.3rem;width:4rem!important"><div style="text-align: center;padding:0"><p style="font-size:14px">{{item}}</p></div></flexbox-item>
            </flexbox>
        </div>
    </div>


      </div>
    </div>
      
      <x-input title="手机号" placeholder="短信分享请输入手机号" v-model="phone" style="background:#fff"></x-input>
       <div style="padding:0.373rem;font-size:0.37rem;color:#9D9DA3">使用说明：
        <ol style="padding-left:0.4rem">
          <li>分享说明:
               <p>方式一：点击右上角“...”按钮,可分享给微信好友</p>
                <p>方式二：输入访客手机号,点击短信分享,可分享给访客</p>
          </li>
         
          <li>访客在们岗前点击分享链接页面中的开门按钮即可开门</li>
          <li>有效期默认为1天,一个门一天只能开一次</li>
        </ol>
      </div> 
      <div style="width:9.2rem;margin:0 auto;line-height:0.5rem;display:flex;display:-webkit-flex;justify-content:space-between;-webkit-justify-content:space-between;margin-top:0.3rem"><a href="#" @click="sharewx" style="padding:0.36rem 1.16rem;display:block;background:#915BAF;color:#fff;font-size:0.48rem;border-radius:10px">微信分享</a><a @click="sharephone" href="#" style="padding:0.36rem 1.16rem;display:block;background:#915BAF;color:#fff;font-size:0.48rem;border-radius:10px">短信分享</a></div>
      <alert v-model="alert_show" :title="dialog_title" @on-show="onShow" @on-hide="onHide" :button-text="backindex"> {{content}}</alert>
  </div>
</template>
<script>
import { XInput,Alert,Flexbox,FlexboxItem} from 'vux'
  import wx from "weixin-js-sdk"; // 引入微信js
    export default{
        data(){
            return{
                phone:'',
                 alert_show:false,
                dialog_title:"提示",
                content:"",
                urllink:'',
                time:'',
                doors:'',
                backindex:'',
                showmsg:false,
                location:'',
                vilname:'',
                houseName:'',
                username:"",
                date:'',
                hours:'',
                unit:'',
                unitshow:true,
                area:'',


                doorlist:[
                // '南大门'
                //  ,
                // '北大门'
                // ,
                //    '南大门'    
            ]
            }
        },
        components:{
            XInput,Alert,Flexbox,FlexboxItem
        },
        mounted(){
            var that=this
            // this.date='2015-12-6'
            // this.hours='15:30'

            this.urllink=this.$route.query.shareurl
            this.time=this.$route.query.time
            this.doors=this.$route.query.doors
            this.name=this.$route.query.name
            this.username=userProfile.username
            this.houseName=userProfile.houseName+'室'
            this.vilname=userProfile.vname
            this.area=userProfile.area;
            this.building=userProfile.building+'栋'
            this.unit=userProfile.unit
            if(this.unit==''){
                this.unitshow=false
            }else{
                this.unit=userProfile.unit+'单元'
            }
            //  this.urllink=this.$route.query.urllink
             this.invid=this.$route.query.invid
            if(userProfile.unit==''){
                this.location=userProfile.vname+userProfile.building+'栋'+userProfile.houseName+'室'
            }else{
                this.location=userProfile.vname+userProfile.building+'栋'+userProfile.unit+'单元'+userProfile.houseName+'室'
            }
           
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
                console.log(that.urllink,'urllink')
                  wx.onMenuShareAppMessage({
                        title: '【紫荆管家】访客来访临时卡', // 分享标题
                        desc:'有效期至：'+that.time,
                        link:that.urllink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
             this.$http.get(service_url+'/o2o/door/wexin/getInviteVistor/'+that.invid).then((res)=>{
                if(res.body.state==0){
                    that.doorlist=res.body.data.doorList
                    var timer= res.body.data.endTime
                    var date=new Date() 
                    date.setTime(timer)
                        var year=date.getFullYear()
                        var month=date.getMonth()+1
                        if(month<10){
                        month='0'+month
                        }
                        var day=date.getDate()
                        if(day<10){
                        day='0'+day
                        }
                        var hours=date.getHours()
                        if(hours<10){
                        hours='0'+hours
                        }
                        var min=date.getMinutes()
                        if(min<10){
                        min='0'+min
                        }
                        that.date=year+'-'+month+'-'+day
                        that.hours=hours+':'+min
                }
            })

            document.getElementById("index_loading").style.display="none";
        },
        methods:{
            // 微信分享
            sharewx(){
                this.showmsg=true
            },
            know(){
                this.showmsg=false
            },
             onShow(){

        },
        onHide(){
            if(this.backindex=='返回首页'){
                this.$router.push("/fc_index")
            }
        },
           
            sharephone(){
          var that=this
                var reg=/^1(3|4|5|7|8)\d{9}$/
            if(this.phone==''||this.phone==null ||this.phone=="undefine"){
                this.dialog_title="提示"
                this.content="请输入手机号"
                this.alert_show=true
                return
            }else if(!reg.test(this.phone)){
                this.dialog_title="提示"
                this.content="请输入正确的手机号"
                this.alert_show=true
                return
            }
        this.$http.post(service_url+'/o2o/door/wexin/wechatShareInviteVistor',{
          houseid:userProfile.houseid,
          userid:userProfile.userid,
          villageid:userProfile.vid,
          name:that.name,
          unit:userProfile.unit,
          doorids:that.doors,
          vname:userProfile.vname,
          building:userProfile.building,
          houseName:userProfile.houseName          
        }).then((res)=>{
          if(res.body.state==0){
            var url=res.body.data.shareUrl
            console.log(url,'url')
            this.$http.post(service_url+'/o2o/common/wx/sendInviteVistorSMS.do',{
                phone:that.phone,
                userName:userProfile.username,
                address:that.location,
                url:url               
            }).then((res)=>{
                if(res.body.state==0){
                    this.dialog_title="提示"
                    this.content="发送成功"
                    this.alert_show=true
                    this.backindex="返回首页"
                    
                    return
                }else{
                    this.dialog_title="提示"
                    this.content=res.body.msg
                    this.alert_show=true
                    return
                }
            })
          }else{
             this.alert_show=true;
          this.dialog_title='提示'
          this.content=res.body.msg
          return
          }
        })

      },
        }
    }
</script>
<style>
ol li{
  list-style-position:outside;
  list-style-type: decimal
}
</style>
