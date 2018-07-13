<template>
  <div id="gym_index" class="xjt_wrap finish-bg wrap">
	  <!--banner start-->
	  <div class="banner">
	    <img src="../../gym/import/img/banner.jpg" />
	  </div>
	  <!--banner end-->
	  <!--down start-->
	  <div class="wrapDown">
		  <!--notice start-->
		  <div class="notice">
		  	<h3 class="title">健身房使用注意事项</h3>
		  	<div class="n-detail">
		  		<!-- <p>1、 健身房从开门开始计费;</p>
          <p>2、用户退出健身房时需要点击退出按钮，方可停止计费;</p>
          <p>3、健身房可以预约使用，同一个帐号，每次只能预约一个时段，使用完成后可以再次预约;</p>
          <p>4、扫面健身设备上的二维码开启健身设备，结束时候关闭设备即可。</p> -->
          <pre>{{remark}}</pre>
		  	</div>
		  </div>
		  <!--notice end-->
		  <!--time start-->
		  <div class="timeBox flex_box">
		    <div class="row flex horizontal">
		    	<span class="dec">开放时间</span>
		    	<span class="time"><i v-text="opentime_start"></i>-<i v-text="opentime_end"></i></span>
		    </div>
		    <div class="row flex horizontal">
		    	<span class="dec">当前人数</span>
		    	<span class="time" v-text="now_num"></span>
		    </div>
		    <div class="row flex horizontal">
		    	<span class="dec">费用</span>
		    	<span class="time"><i v-text="cost"></i><i class="small">元/小时</i></span>
		    </div>
		  </div>
		  <!--time end-->
		  <!--fixBtn start-->
		  <div class="fixBtn">
		  	<a @click="isStatus()" class="active mb28" href="javascript:void(0)">进入健身房</a>
		  	<a @click="goOrder()" href="javascript:void(0)">预约</a>
		  </div>
		  <!--fixBtn end-->
	  </div>
	  <!--down end-->
    <!--弹窗 start-->
      <confirm v-model="show" @on-confirm="onConfirm" @on-cancel="onCancel" :title="title" :content="content" :on-show="onShow">
        <p style="text-align:center;">{{ content }}</p>
      </confirm>
    <!--弹窗 end-->
  </div>
</template>

<script>
// 引入js
import scale from '../../gym/import/js/index.js'
// 接口引用
import gym from '../../gym/config/portAdress/gymHome'
// 弹窗(是否)
import { Confirm } from 'vux'
import {setTitle} from '@/common/js/common';

export default {
  data () {
  	return {
  	  opentime_start: '',
  	  opentime_end: '',
  	  now_num: '',
  	  cost: '',
      remark: '',
      // confirm
      show: false,
      onShow: false,
      title: '温馨提示',
      content: ''
  	}
  },
  created: function () {
    // 获取数据(开放时间、当前人数、费用)
    this.getData()
  },
  components: {
    Confirm
  },
  mounted: function () {
    setTitle("健身房");
  	document.getElementById("index_loading").style.display="none";
  },
  methods: {
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
    // cookie取值方法
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
    saveValue: function (objName,objValue,objHours) {  // (objName:对象名称,objValue:对象的值,objHours: 值在浏览器中停留的时间)
      var str = objName + "=" + escape(objValue);
      if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
      var date = new Date();
      var ms = objHours*3600*1000;
      date.setTime(date.getTime() + ms);
      str += "; expires=" + date.toGMTString();
      }
      document.cookie = str;
    },
    getData: function () {
      // 开始时间
      this.opentime_start = this.getValue("opentime_start")
      // 结束时间
      this.opentime_end = this.getValue("opentime_end")
      // 当前人数
      this.now_num = this.getValue("now_num")
      // 费用
      this.cost = this.getValue("cost")
      // 注意事项
      this.remark = this.getValue("remark")
    },

  	goOrder: function () {
  	  this.$router.push('/reservation')
  	},
    isStatus: function () {
        var curStatus = this.getValue("peopleStatus")
        if(curStatus === "-1") { //欠费
          this.$router.push('/settlement')
        } else if(curStatus === "0") { // 正常,进入健身房首页
          this.isappoint()
        } else if (curStatus === "1") { // 在健身房中
          this.$router.push('/endGym')
        } else if (curStatus === "2"){ //在健身房运动中
          this.$router.push('/startGym')
        }



      /*gym.getGymHomeData(this.token,{
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid,  // 用户编号
          gymid: 1   // 健身房编号(健身房编号当前固定填1)
        }, (res) => {
        if (res.data.state === 0) { // 成功,'注意事项','人员状态','门禁编号'


          console.log('数据' + JSON.stringify(res))
          // 将返回的数据用一个变量存储起来
          let data = res.data.data
          let status = data.status  // -1:欠费(欠费界面),0:正常(健身房首页),1:在健身房中(enterGym),2:在健身房运动中
          this.saveValue("peopleStatus",status,1)

          // 开始时间
          this.saveValue("opentime_start",data.opentime_start,1)
          // 结束时间
          this.saveValue("opentime_end",data.opentime_end,1)
          // 当前人数
          this.saveValue("now_num",data.now_num,1)
          // 费用
          this.saveValue("cost",data.cost,1)
          // 注意事项
          this.saveValue("remark",data.remark,1)
          // 门禁编号(存门禁编号)
          this.saveValue("doorid",data.doorid,1)
          // 健身单价
          sessionStorage.setItem('chargeStandards', this.cost)
          this.isappoint()
        } else {
          alert(res.data.msg)
        }
      })*/
    },
    isappoint: function () {
      // 获取当前的时间戳
      gym.isappoint(this.tocken, {
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid,   // 用户编号
          gymid: 1// 健身房编号(健身房编号当前固定填1)
        }, (res) => {
          if (res.data.state === 0) {
            // 进入健身房
            this.goRoom()
          } else {
            this.show = true
            this.content = res.data.msg
            /*prompt(res.data.msg);
            return;*/
          }
      })
    },
    onConfirm: function () {
      // 进入健身房
      this.goRoom()
    },
    onCancel: function () {
      this.$router.push('/fitnessRoom')
    },
    goRoom: function () {
        // 获取当前的时间戳
        gym.getGymRoomData(this.tocken, {
            villageid: userProfile.vid,  // 小区编号
            userid: userProfile.userid,   // 用户编号
            doorid: this.getValue("doorid"), // 门禁编号
            gymid: 1// 健身房编号(健身房编号当前固定填1)
          }, (res) => {
            if (res.data.state === 0) {
            // 进入健身房成功之后,返回数据
            let data = res.data.data
            // 得到的开始时间
            console.log('进入健身房后,得到的数据' + JSON.stringify(data))
            // 将时间戳转成开始时间
            let newDate = new Date();
            newDate.setTime(data.timestamp)
            // (开始时间)时、分、秒
             let hour = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
             let minute = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
             var currentTime = hour + ":" + minute;

             console.log('开始时间' + currentTime)

             // 开始时间戳
            this.saveValue("returnStartTimestamp",data.timestamp,1)
            // 开始时间
            this.saveValue("returnStartTime",currentTime,1)


            this.saveValue("temperature",data.temperature,1) // 温度
            this.saveValue("humidity",data.humidity,1) // 湿度
            this.saveValue("pm",data.pm,1) // pm
            this.saveValue("tvoc",data.tvoc,1) // tvoc
            // 跳转到健身房中界面
            this.$router.push('/enterGym')
          } else {
            alert(res.data.msg)
          }
        })
    },
  }
}
</script>

<style scoped>
/* 引入css样式 */
/* @import '../../gym/import/css/common.css'; */
@import '../../gym/import/css/style.css';
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 6em;
  color: #04BE02;
}
#gym_index .banner{height:4.2rem;overflow:hidden;}
</style>
