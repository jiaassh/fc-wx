<template>
  <div class="wrap xjt_wrap finish-bg wrap_enter">
    <!--clock start-->
    <div class="cloBox flex_box horizontal vertical">
    	<!--timeShow start-->
    	<div class="tmShow clearfix">
    		<div class="lfShow fl">
    			<p class="title">开始时间</p>
    			<p class="desc" v-text="starttime"></p>
    		</div>
    		<div class="rgShow fr">
    		   <p class="title">结束时间</p>
    		   <p class="desc">--:--</p>
    		</div>
    	</div>
    	<!--timeShow end-->
      <!--center circle start-->
      <div class="circleBox">
        <x-circle :percent="percent" :stroke-width="6" :trail-width="6" :stroke-color="strokeColor" trail-color="#3a406c">
            <span style="color: #00d8c0;color: #00d8c0;font-size: 1.6rem;font-weight: bolder;font-family: 'fontName';">{{showtime}}</span><br/>
            <span style="font-size:10px;margin-top:-0.4rem;display:block;color:#898a97;">运动时长</span>
        </x-circle>
      </div>
      <!--center circle end-->
      <!--扩散图 start-->
      <div class="spread common"></div>
      <div class="spread1 common"></div>
      <div class="spread2 common"></div>
      <!--扩散图 end-->
    </div>
    <!--clock end-->
    <!--detail start-->
    <div class="timeBox gymBox flex_box">
  		<div class="row flex">
  			<span class="dec">距离</span>
	    	<span class="time time_ys"><i v-text="curDistance"></i><i class="small">km</i></span>
  		</div>
  		<div class="row flex">
  			<span class="dec">速度</span>
	    	<span class="time time_ys"><i v-text="curSpeed"></i><i class="small">km/h</i></span>
  		</div>
  		<div class="row flex">
  			<span class="dec">时间</span>
	    	<span class="time time_ys"><i v-text="curTime"></i><i class="small">min</i></span>
  		</div>
  		<div class="row flex">
  			<span class="dec">热量</span>
	    	<span class="time time_ys"><i v-text="curCalorie"></i><i class="small">kcal</i></span>
  		</div>
  	</div>
    <!--detail end-->
    <!--down start-->
	  <div class="down flex_box">
	  	<div class="flex flex_box horizontal vertical">
	  		<a @click="endLeave()" class="goBack flex_box horizontal vertical">离开</a>
	  	</div>
	  	<div class="flex flex_box horizontal vertical">
	  		<a @click="goSport()" class="goPay goGym flex_box horizontal vertical">
	  		  <div class="circle flex_box horizontal vertical">扫描器材</div>
	  		</a>
	  	</div>
	  	<div class="flex flex_box horizontal vertical">
	  		<a class="goBack aGreen flex_box horizontal vertical" href="javascript:void(0)">开门</a>
	  	</div>
	  </div>
	  <!--down end-->
  </div>
</template>

<script>
// 引入js
import scale from '../../gym/import/js/index.js'
import XCircle from '../../../components/x-circle/index.vue'
// 接口引用
import gym from '../../gym/config/portAdress/gymHome'


export default {
  data () {
  	return {
      speed: -7,
      percent: 30,
      shows:0,
      showtime:"00:00",
      strokeColor: '#00d8c0',
      // 数据显示
      curDistance: '',
      curSpeed: '',
      curTime: '',
      curCalorie: '',
      starttime: ''
  	}
  },
  created: function () {
    this.starttime = this.getValue("returnStartTime")
    // 获取从startGym页面中得到的数据
    this.getData()
    this.getValue()
    // 时间显示
    this.timeShow()
  },
  mounted: function () {
    setInterval(this.update2, 2000)
  	document.getElementById("index_loading").style.display="none";
  },
  components: {
    XCircle
  },
  methods: {
    getValue: function (name) {
      var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对
      var cookie=new Object();
      for (var i=0;i<cookieArray.length;i++){
        var arr=cookieArray[i].split("=");       //将名和值分开
        if(arr[0]==name){
          return unescape(arr[1]);
        }; //如果是指定的cookie，则返回它的值
      }
      return "";
    },
    timeShow: function () {
      var date = new Date();
      var curTimestamp = date.getTime()
      var timestamp = this.getValue("returnStartTimestamp")
      var cha = curTimestamp - timestamp
      this.shows = parseInt(cha/1000)
    },
    update2 () {
      this.shows ++;
      this.percent  = parseInt(this.shows)
      this.showtime = this.dotime(this.shows);
      this.strokeColor = this.getColorByBaiFenBi(this.shows)
    },
    dotime(s) {
      var t;
      if(s > -1){
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;

        if(min < 10){
          t = '0'+ min + ":";
        }
        else{
          t = min + ":";
        }
        if(sec < 10){t += "0";}
        t += sec;
      }
      return t;
    },
    getColorByBaiFenBi(bili){
      //var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内
      var one = (216+216+216) / 3600;
      var r=0;
      var g=216;
      var b=0;

      if ( bili < 1200 ) {
        // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
        r = 0;
        g = 216-b*one;
        b=192;
      }
      if ( 2400>=bili > 1200 ) {
        // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
        r =  216 - ( (bili - 1200 ) * one) ;
        g=0;
        b = 192;
      }
      if ( bili > 2400 ) {
        // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
        r = ((bili - 1200 ) * one);
        g=216-(bili-2400) * one;
        b =(bili-3200) * one;
      }
      r = parseInt(r);// 取整
      g = parseInt(g);// 取整
      b = parseInt(b);// 取整
      return "rgb("+r+","+g+","+b+")";
    },
    getData: function () {
      // 页面已经进入
      var endChecked = true
      localStorage.setItem('endChecked',endChecked)
      this.curDistance = this.getValue("distance")
      this.curSpeed = this.getValue("speed")
      // 将时间戳转化为时间
      let timestamp = this.getValue("time")
      // 将时间戳转成开始时间
      /*let newDate = new Date();
      newDate.setTime(timestamp * 1000)
      // (开始时间)时、分、秒
       let hour = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
       let minute = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
       var currentTime = hour*60 + minute;*/
       this.curTime = this.getValue("time")
       this.curCalorie = this.getValue("calorie")
      // 将数据用cookie保存
    },
    // cookie存值方法
    saveValue: function (objName,objValue,objHours) {
      var str = objName + "=" + escape(objValue);
      if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours*3600*1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
      }
      document.cookie = str;
    },
    timestamp: function (timestamp) {
      // 将时间戳转成开始时间
      let curDate = new Date();
      curDate.setTime(timestamp)
      // (开始时间)时、分、秒
       let hour = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
       let minute = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
       var currentTime = hour + ":" + minute;
       return currentTime
    },
    // 离开健身房
    endLeave: function () {
        gym.goExit(this.tocken, {
         villageid: userProfile.vid,  // 小区编号
         userid: userProfile.userid,   // 用户编号
         gymid: 1// 健身房编号(健身房编号当前固定填1)
       }, (res) => {
         if (res.data.state === 0) {

              let data = res.data.data
              this.starttime = this.timestamp(data.starttime) // 通过换算得到的时间
              this.endtime = this.timestamp(data.endtime) // 通过换算得到的时间
              this.totaltime = data.totaltime
              this.allcost = data.allcost
              // 存储总费用
              this.saveValue("allcost",data.allcost,24)
              this.$router.push('/settlement')  // 付费页面
            } else {
              alert(res.data.msg)
            }
       })
    },
    goSport:function () {
      // 得到device_id(当前设置device_id = 1)
        // this.saveValue("device_id",1,24) 先把device_id注释点,等真正设备对接时打开
        // 扫描设备开启操作
        gym.opendevice(this.tocken, {
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid, // 用户编号
          gymid: 1,  // 健身房id
          device_id: 1   // 设备id
        }, (res) => {
          console.log(res)
          if (res.data.state === 0) {
              // state '0'空闲,可正常使用
              this.$router.push('/startGym')
          } else {
            alert(res.data.msg)
          }
        })






/*        // 跳转到运动中
        var _this = this
        setTimeout(function(){

        },3000);*/
        // 跳转到健身房中界面

        // 通过config接口注入权限验证配置
        /*wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug : true,
            appId: userProfile.wx.appid, // 必填，公众号的唯一标识
            timestamp: userProfile.wx.timestamp, // 必填，生成签名的时间戳
            nonceStr: userProfile.wx.nonceStr, // 必填，生成签名的随机串
            signature: userProfile.wx.signature,// 必填，签名，见附录1
            jsApiList: ['checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });*/
       // wx.ready( function() {

            /*wx.checkJsApi({
            jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                alert(JSON.stringify(res))
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });*/
             /*wx.scanQRCode({
                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType : [ "qrCode" ], // 可以指定扫二维码还是一维码，默认二者都有
                success : function(res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    alert("扫描成功::扫描码=" + result);


                      // 扫描设备开启操作
                      appData.room(this.tocken, {
                        villageid: userProfile.vid,  // 小区编号
                        phone: userProfile.phone   // 手机号
                        device_id: "设备id"   // 设备id
                      }, (res) => {
                        if (res.status === 200) {
                            // state '0'空闲,可正常使用

                        } else {
                          alert(res.data.msg)
                        }
                      })

                }
            });*/

            /*wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode"],
            success: function (res) {
              alert(JSON.stringify(res))
              var resultStr = res.resultStr;
              var errMsg = res.errMsg;
              if(errMsg === "scanQRCode:ok"){
                alert('123')
              }else{
                alert('456')
                self.dialog_title="提示";
                self.confirm_content="访问失败";
                self.confirm_show=true;
              }
            },
            error: function(res){
              if(res.errMsg.indexOf('function_not_exist') > 0){
                   alert('版本过低请升级')
                }
             }
          });*/
        //})
    },
  }
}
</script>

<style scoped>
/* 引入css样式 */
@import '../../gym/import/css/style.css';
</style>
