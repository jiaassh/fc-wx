<template>
  <div id="start" class="wrap xjt_wrap finish-bg wrap_enter">
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
    <!--wavyLines start-->
    <div class="wavyLine">
      <h2>请使用运动机械控屏退出运动</h2>
      <div class="canvasBox">
        <!--dynamic start-->
        <div class="wave animate1"></div>
        <div class="wave animate2"></div>
        <div class="wave animate3"></div>
        <!--dynamic end-->   
      </div>
    </div>
    <!--wavyLines end-->  
    <!--down start-->
    <div class="down flex_box">
      <div class="flex flex_box horizontal vertical">
        <a class="goPay goGym flex_box horizontal vertical" href="javascript:void(0)">
          <div class="circle flex_box horizontal vertical">开门</div>
        </a>
      </div>
    </div>
    <!--down end-->
  </div>
</template>

<script>
// 引入js
import scale from '../../gym/import/js/index.js'
import XCircle from '@/components/x-circle/index.vue'
// 接口引用
import gym from '../../gym/config/portAdress/gymHome'

export default {
  data () {
    return {
      speed: -7,
      percent: 30,
      shows: '',
      showtime:'',
      strokeColor: 'this.getValue("enterStrokeColor")',
      starttime: ''
    }
  },
  created: function () {
    // 设备状态查询
    // this.getValue("device_id") // 先将设备id注释点,等真正有设备对接时打开
    this.starttime = this.getValue("returnStartTime")
    this.equipStatus()
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
    getValue: function (name) { // (name:存的对象名称)
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
    saveValue: function (objName,objValue,objHours) {  
      var str = objName + "=" + escape(objValue);
      if(objHours > 0){                               
      var date = new Date();
      var ms = objHours*3600*1000;
      date.setTime(date.getTime() + ms);
      str += "; expires=" + date.toGMTString();
      }
      document.cookie = str;
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
    equipStatus: function () {
        gym.getStatus(this.tocken, {
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid,   // 用户编号
          gymid: 1,   // 健身房编号(目前规定为1)
          device_id: 1  // 设备二维码
        }, (res) => {
          if (res.data.state === 0) {
              let data = res.data.data
              // state '0'成功
              // 返回数据 (设备id、器材名称、工作状态、热量、距离、速度、时间)
              // this.saveValue("device_id",data.device_id,2)  先把device_id注释点,等真正设备对接时打开
              this.saveValue("name",data.name,2)
              this.saveValue("calorie",data.sportData.calorie,2)
              this.saveValue("distance",data.sportData.distance,2)
              this.saveValue("speed",data.sportData.speed,2)
              this.saveValue("time",data.sportData.time,2)

              var _this = this
              setTimeout(function(){  
                    if (res.data.data.work_status === '1') {
                      // _this.$router.push('/endGym')
                    } else if(res.data.data.work_status === '2') {
                    }  
              },5000);

              
          } else {
            alert(res.data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
/* 引入css样式 */
@import '../../gym/import/css/style.css';
/*波浪线*/
.canvasBox{width:10rem;height:1.2rem;position:relative;margin-top:0.8rem;}
.wave{position:absolute;left:0;width:20rem;height:100%;background-position:0 bottom;transform-origin:center bottom;}
.animate1{animation:move_wave 10s linear infinite;background:url('../../gym/import/img/wave1.png') no-repeat;background-size:100% auto;}
.animate2{animation:move_wave 5s linear infinite;background:url('../../gym/import/img/wave2.png') no-repeat;background-size:100% auto;}
@keyframes move_wave {
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(1)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
}
#start .down{height:3.8rem!important;}
</style>
