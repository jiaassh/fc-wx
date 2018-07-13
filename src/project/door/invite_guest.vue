<template>
  <div>
    <div style="position:fixed;width:100%;height:100%;background:#fff;z-index:-1"></div>
    <div v-show="showmsg" style="position:fixed;width:100%;height:100%;background:#000;opacity:0.7;z-index:3">
      <div><img src="./share.png" style="width:6.333rem;margin-left:2.907rem;margin-top:0.08rem"></div>
      <div @click="know" style="position:absolute;top:10rem;left:50%;transform:translateX(-50%);width:3.893rem;height:1.48rem;border-radius:1.48rem;color:#fff;font-size:0.667rem;line-height:1.48rem;text-align:center;border:1px solid #fff;font-family:DFWaWaSC-W5">知道了</div>
    </div>
    <loading v-model="isLoading" text="生成中"></loading>
    <div v-if="opentype==0">
      <group title="访客邀请">
      <x-input title="姓名" placeholder="请输入姓名" v-model="name"></x-input>
        <div style="display:flex;align-items: center;padding:5px 10px 5px 0;margin-left:15px;border-top:1px solid #ececec;">
          <div>性别：</div>
          <checker
            default-item-class="demo5-item"
            selected-item-class="demo5-item-selected"
          >
            <checker-item style="font-size:14px;" v-for="item in sexlist" :key="item" :value="item" @on-item-click="itemclick">{{item}}</checker-item>
          </checker>
        </div>
      <x-input title="手机号" placeholder="请输入受邀人手机号" v-model="phone"></x-input>
      </group>
      <div style="padding:20px 10px;"><x-button class="zj_button" type="primary" @click.native="gocode">生成二维码</x-button></div>
    </div>
    <div v-if="opentype==1">
      <group gutter="0">
        <div style="padding:10px 15px;color:#915BAF;font-size:0.373rem">{{location}}</div>
        <x-input title="访客姓名" placeholder="请输入姓名" v-model="name"></x-input>
        <cell title="可开门" is-link :arrow-direction="showcontent?'up':'down'" @click.native="showcontent=!showcontent"></cell>
         <checklist class="slide" :class="showcontent?'animate':''" :options="commonList" v-model="common_choose" @on-change="common_change"></checklist>
      </group>
      <div style="padding:0.373rem;font-size:0.37rem;color:#9D9DA3">使用说明:
        <ol style="padding-left:0.4rem">
          <li>填写访客信息(姓名、可开门)</li>
          <!-- <li>点击右上角的“...”按钮,可分享给微信好友</li>
          <li>点击短信分享,输入访客手机号可分享给访客;访客在门岗前点击分享链接页面中的开门按钮即可开门</li> -->
          <li>有效期默认为1天,一个门一天只能开一次</li>
        </ol>
      </div> 
      <!-- <div style="width:9.2rem;margin:0 auto;display:flex;justify-content:space-between;margin-top:4rem"><a href="#" @click="sharewx" style="padding:0.36rem 1.16rem;display:block;background:#915BAF;color:#fff;font-size:0.48rem;border-radius:10px">微信分享</a><a @click="sharephone" href="#" style="padding:0.36rem 1.16rem;display:block;background:#915BAF;color:#fff;font-size:0.48rem;border-radius:10px">短信分享</a></div> -->
      <div @click="sharewx" style="width:9.167rem;margin:0 auto;text-align:center;line-height:1.222rem;border-radius:10px;color:#fff;background:#915BAF">生成访客临时卡</div>
    </div>
   
    <alert v-model="alert_show" :title="dialog_title" @on-show="onShow" @on-hide="onHide"> {{content}}</alert>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Group,XInput,Checker,CheckerItem,XButton,Alert,Loading,Cell,Checklist} from 'vux';
  import wx from "weixin-js-sdk"; // 引入微信js

  export default{
    data(){
      return{
        isLoading:false,
        sex:[],
        sexlist:["男","女"],
        content:"",
        name:"",
        phone:"",
        common_choose:[],
        choose_item:"男",
        alert_show:false,
        dialog_title:"提示",
        location:"",
        opentype:0,
        showcontent:false,
        commonList: [],


        //原始门数据列表
        commonlist:[],
        showmsg:false,

      }
    },
    components:{
      Loading,Group,XInput,Checker,CheckerItem,XButton,Alert,Cell,Checklist
    },
    mounted(){
      setTitle("访客邀请");
      var that=this
      if(userProfile.unit==''){
          if(userProfile.area==''){
            this.location=userProfile.vname+userProfile.building+'栋'+userProfile.houseName+'室'
          }else{
            this.location=userProfile.vname+userProfile.area+userProfile.building+'栋'+userProfile.houseName+'室'
          }
      }else{
        if(userProfile.area==''){
          this.location=userProfile.vname+userProfile.building+'栋'+userProfile.unit+'单元'+userProfile.houseName+'室'
        }else{
          this.location=userProfile.vname+userProfile.area+userProfile.building+'栋'+userProfile.unit+'单元'+userProfile.houseName+'室'
        }
      }

      //要删除的
      // that.commonList=[
      //   "南天门",
      //   "北天门",
      //   "西天目"
      // ]





      this.opentype=this.$route.query.opentype
      this.$http.post(service_url+'/o2o/door/wexin/lookUpDoorAuth',{
        houseid:userProfile.houseid,
        userid:userProfile.userid,
        usertype:userProfile.atype,
        villageid:userProfile.vid
      }).then((res)=>{
        if(res.body.state==0){
            that.commonlist=res.body.data 
            that.commonlist.map(function(value){
              that.commonList.push(value.name)
            })
        }else{
                  this.alert_show=true 
                  this.dialog_title="提示"
                  this.content=res.body.msg
        }
      })
      
   
      
      
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      //点击知道了
      know(){
        this.showmsg=false
      },
      //短信分享
      sharephone(){
        var that=this
        var doors=[]
          that.commonlist.map(function(value){
            that.common_choose.map(function(value1){
                if(value1==value.name){
                  doors.push(value.id)
                }
            })
          })
          doors=doors.join(',')
        if(this.name==''){
          this.alert_show=true;
          this.dialog_title='提示'
          this.content="请输入访客姓名"
          return
        }else if(this.common_choose==''){
          this.alert_show=true 
          this.dialog_title='提示'
          this.content="请选择可开门"
          return
        }
        this.$http.post(service_url+'/o2o/door/wexin/wechatShareInviteVistor',{
          houseid:userProfile.houseid,
          userid:userProfile.userid,
          villageid:userProfile.vid,
          name:that.name,
          unit:userProfile.unit,
          doorids:doors,
          vname:userProfile.vname,
          building:userProfile.building,
          houseName:userProfile.houseName          
        }).then((res)=>{
          if(res.body.state==0){
            var url=res.body.data.shareUrl
            that.$router.push({path:"simmsg",query:{urllink:url}})
          }else{
             this.alert_show=true;
          this.dialog_title='提示'
          this.content=res.body.msg
          return
          }
        })

      },


      // 选择门列表
      common_change(val){
        this.common_choose=val
        console.log(this.common_choose,'choose')
      },
      sharewx(){
         var that=this
        var doors=[]
          that.commonlist.map(function(value){
            that.common_choose.map(function(value1){
                if(value1==value.name){
                  doors.push(value.id)
                }
            })
          })
          doors=doors.join(',')
        if(this.name==''){
          this.alert_show=true;
          this.dialog_title='提示'
          this.content="请输入访客姓名"
          return
        }else if(this.common_choose==''){
          this.alert_show=true 
          this.dialog_title='提示'
          this.content="请选择可开门"
          return
        }
        this.$http.post(service_url+'/o2o/door/wexin/wechatShareInviteVistor',{
          houseid:userProfile.houseid,
          userid:userProfile.userid,
          villageid:userProfile.vid,
          name:that.name,
          doorids:doors,
          unit:userProfile.unit,
          vname:userProfile.vname,
          building: userProfile.building,
          houseName:userProfile.houseName
        }).then((res)=>{
          if(res.body.state==0){
      var url=res.body.data.shareUrl 
      var invid=res.body.data.invitorid
      var timer= res.body.data.validTime
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
        var times=year+'-'+month+'-'+day+'  '+hours+':'+min
        this.$router.push({path:"invite_detail",query:{time:times,shareurl:url,name:that.name,doors:doors,invid:invid}})
        }else{
       this.alert_show=true 
        this.dialog_title="提示"
        this.content=res.body.msg
    }
        })

        
//         wx.config({
//         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//         //                                  debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//         appId: userProfile.wx.appid, // 必填，公众号的唯一标识
//         timestamp: userProfile.wx.timestamp, // 必填，生成签名的时间戳
//         nonceStr: userProfile.wx.nonceStr, // 必填，生成签名的随机串
//         signature: userProfile.wx.signature, // 必填，签名，见附录1
//         jsApiList: [
//           "checkJsApi",
//           "startRecord",
//           "stopRecord",
//           "translateVoice",
//           "scanQRCode",
//           "openCard",
//           "onMenuShareAppMessage"
//         ]
//         // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       });
// wx.ready(function () {
//   var doors=[]
//   that.commonlist.map(function(value){
//     that.common_choose.map(function(value1){
//         if(value1==value.name){
//           doors.push(value.id)
         
//         }
//     })
//   })
//    doors=doors.join(',')
//   that.$http.post(service_url+'/o2o/door/wexin/wechatShareInviteVistor',{
//     houseid:userProfile.houseid,
//     userid:userProfile.userid,
//     villageid:userProfile.vid,
//     name:that.name,
//     doorids:doors,
//     unit:userProfile.unit,
//     vname:userProfile.vname,
//     building: userProfile.building,
//     houseName:userProfile.houseName
    
//   // "houseid": 6699,
//   // "userid": 1480,
//   // "villageid": 3,
//   // "name": that.name,
//   // "doorids": "30,29",
//   // "vname": "重庆雍江苑",
//   // "building": "1栋",
//   // "houseName":"1001室"


//   }).then((res)=>{
//     if(res.body.state==0){
//       var url=res.body.data.shareUrl 
//       var timer= res.body.data.validTime
//        var date=new Date()
      
//        date.setTime(timer)
//         var year=date.getFullYear()
//         var month=date.getMonth()+1
//         if(month<10){
//           month='0'+month
//         }
//         var day=date.getDate()
//         if(day<10){
//           day='0'+day
//         }
//         var hours=date.getHours()
//         if(hours<10){
//           hours='0'+hours
//         }
//         var min=date.getMinutes()
//         if(min<10){
//           min='0'+min
//         }
//         var times=year+'-'+month+'-'+day+'  '+hours+':'+min
//         wx.onMenuShareAppMessage({
//           title: '【紫荆管家】访客来访临时卡', // 分享标题
//           desc:times,
//           link:url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//           imgUrl:service_url+'/o2o/common/static/img/wxshare.png',
//           success: function () { 
//             this.alert_show=true 
//             this.dialog_title="提示"
//             this.content="分享成功"
//             this.$router.push('/fc_index')
//             // 用户确认分享后执行的回调函数

//           },
//         cancel: function () { 
          
//         // 用户取消分享后执行的回调函数
//          }
// });
//     }else{
//        this.alert_show=true 
//         this.dialog_title="提示"
//         this.content=res.body.msg
//     }
//   })

 
// })   
//         this.showmsg=true
      },



      itemclick(val){
        this.choose_item=val;
      },
      gocode(){
          this.isLoading=true;
          let self = this;
          let items={
            "name":this.name, //姓名
            "sex":this.choose_item , //0男 1女
            "phone":this.phone, //新手机
            "houseid":userProfile.houseid,
            "userid":userProfile.userid,
            "villageid":userProfile.vid
          };
          if(service_url){
            this.$http.post(service_url+"/o2o/door/wexin/inviteVistor",items).then((data)=>{
              self.isLoading=false;
              var imgsrc=data.body.data.pic
              this.$router.push({path:'b5invite',query:{imgsrc:imgsrc}})
              // window.location.href=data.body.data.pic
              /*if(data.body.state===0){
                self.$router.replace({path:"code_share",query:{"inviteData":JSON.stringify(data.body.data)}});
              }else{
                self.alert_show=true;
                self.content="访问失败";
                self.dialog_title="注意";
              }*/
            })
          }else{
            self.isLoading=false;
            self.$router.replace({path:"code_share",query:{"id":1}});
          }
      },
      onShow(){},
      onHide(){}
    }
  }
</script>
<style>
ol li{
  list-style-position:outside;
  list-style-type: decimal
}
</style>
<style scoped>
 .slide {
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .demo5-item {
    border: 1px solid #ad7de7;
    border-radius:5px;
    padding: 2px 15px;
    margin:5px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color:white;
    background-color:#ad7de7;
  }
</style>
