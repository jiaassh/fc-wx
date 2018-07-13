<template>
  <div class="wrap xjt_wrap finish-bg">
	  <!--up start-->
	  <div class="up">
	  	<!--logo start-->
	  	<div class="logo"></div>
	  	<!--logo end-->
	  	<!--flex start-->
	  	<div class="timeBox flex_box">
	  		<div class="row flex">
	  			<span class="dec">开始时间</span>
		    	<span class="time time_ys" v-text="starttime"></span>
	  		</div>
	  		<div class="row flex">
	  			<span class="dec">结束时间</span>
		    	<span class="time time_ys" v-text="endtime"></span>
	  		</div>
	  		<div class="row flex">
	  			<span class="dec">总时长</span>
		    	<span class="time time_ys" v-text="totaltime">2:00</span>
	  		</div>
	  		<div class="row flex">
	  			<span class="dec">费用</span>
		    	<span class="time" v-text="allcost">60.00</span>
	  		</div>
	  	</div>
	  	<!--flex end-->	
	  </div>
	  <!--up end-->
	  <!--down start-->
	  <div class="down flex_box">
	  	<div class="flex flex_box horizontal vertical">
	  		<a @click="goBack()" class="goBack flex_box horizontal vertical" href="javascript:void(0)">返回</a>
	  	</div>
	  	<div class="flex flex_box horizontal vertical">
	  		<a @click="goPay()" class="goPay flex_box horizontal vertical" href="javascript:void(0)">支付</a>
	  	</div>
	  </div>
	  <!--down end-->
  </div>
</template>

<script>
// 引入js
import scale from '../../gym/import/js/index.js'
// json 数据引用
import appData from '../../gym/import/data/json.json'
// 接口引用
import gym from '../../gym/config/portAdress/gymHome'


export default {
  data () {
	return {
	  starttime: '',
	  endtime: '',
	  totaltime: '',
	  allcost: ''
	}
  },
  created: function () {
	// 结束,获取数据
	  this.getExitData();
	  // this.getValue();
  },
  mounted: function () {
  	document.getElementById("index_loading").style.display="none";
  },
  methods: {
  	// 返回
  	goBack: function () {
  	  this.$router.go(-1)
  	},
  	// 支付
  	goPay: function () {
  	  this.$router.push('/payMent')
  	},
  	// cookie获取数据
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
    saveValue: function (objName,objValue,objHours) {  // 
      var str = objName + "=" + escape(objValue);
      if(objHours > 0){                               
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
    getExitData: function () {
       gym.goExit(this.tocken, {
         villageid: userProfile.vid,  // 小区编号
         userid: userProfile.userid,   // 用户编号
         gymid: 1// 健身房编号(健身房编号当前固定填1)
       }, (res) => {
         if (res.status === 200) {
              let data = res.data.data
              this.starttime = this.timestamp(data.starttime) // 通过换算得到的时间
              this.endtime = this.timestamp(data.endtime) // 通过换算得到的时间
              this.totaltime = data.totaltime
              this.allcost = data.allcost
              // 存储总费用
              this.saveValue("allcost",data.allcost,24)
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
</style>
