<template>
    <div id="xjt_wrap" class="wrap xjt_wrap finish-bg">
    <div class="portrait flex_box">
      <div class="headPor">
        <img :src="picurl" alt="头像">
      </div>
      <div v-text="wxname" class="porName flex flex_box vertical clear_padding"></div>
    </div>
    <ul class="order">
      <li>
        <h4>健身房预约</h4>
        <div class="delBox">
          <ul class="person">
            <li class="clearfix bLine">
              <span class="desc fl">手机号</span>
              <span class="opera fr" v-text="phone"></span>
            </li>
            <li class="clearfix">

        <datetime v-model="wishdate" :start-date="startDate" placeholder="请选择期望时间" format="YYYY-MM-DD" @on-change="setBegin" title="日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>

              <!-- <span class="desc fl">日期</span>
              <i class="fr arrow"></i>
              <span class="opera fr">请选择日期</span> -->
            </li>
          </ul>
        </div>
      </li>
      <li>
        <h4>时段</h4>
        <div class="delBox">
          <div class="nav bLine">
            <ul class="flex_box">
              <li v-for="(item, index) in navTitle" @click="navClick(index)" :class="{ 'liHover': item.state===true}" class="flex">
                <span v-text="item.name"></span>
              </li>
            </ul>
          </div>
          <div class="dwBox">
            <ul class="yyUl">
              <div class="yyBox clearfix">
                <div v-for="(item, cardIndex) in cardList[this.navTitleType]"
                @click="getTimeData(cardIndex)" class="fl flex_box horizontal">
                  <div class="bgOrder" :class="{ 'pink': parseInt(item.state)===2 || parseInt(item.state)===5,'green': parseInt(item.state)===0 }">
                    <p class="smSz" v-text="item.time"></p>
                    <p v-text="item.content"></p>
                  </div>
                </div>



                <!-- <div v-for="(item, cardIndex) in cardList[this.navTitleType]" v-if="parseInt(item.state) !== 0" class="fl flex_box horizontal">
                  <div class="bgOrder" :class="{ 'pink': parseInt(item.state)===2,'green': parseInt(item.state)===0 }">
                    <p class="smSz" v-text="item.time"></p>
                    <p v-text="item.content"></p>
                  </div>
                </div>

                <div v-for="(item, cardIndex) in cardList[this.navTitleType]" @click="getTimeData(cardIndex)" v-if="parseInt(item.state) === 0" class="fl flex_box horizontal">
                  <div class="bgOrder green">
                    <p class="smSz" v-text="item.time"></p>
                    <p v-text="item.content"></p>
                  </div>
                </div> -->



              </div>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <h4>预约信息</h4>
        <div class="delBox">
          <ul class="person">
            <li class="flex_box">
              <span class="desc">预定时间：</span>
              <div class="opera flex">
                <p v-for="(item, orderIndex) in orderList">
                  <i v-text="item.orderDate"></i>
                  <i v-text="item.orderTime"></i>
                </p>
              </div>
            </li>
            <li class="flex_box">
              <span class="desc">预计费用：</span>
              <div class="opera flex flex_box vertical" v-text="cost"></div>
            </li>
          </ul>
        </div>
      </li>
      <!--fixBtn start-->
      <div class="fixBtn yyFixed">
        <a @click="orderSubmit()" class="yyBtn" href="javascript:void(0)">预约</a>

      </div>
      <!--fixBtn end-->
    </ul>
  </div>
</template>



<script>
// 引入js
import scale from '../../gym/import/js/index.js'
// json 数据引用
import appData from '../../gym/import/data/json.json'

// 日期组件引用(vux)
import { Group,Datetime } from 'vux'

// 接口引用
import gym from '../../gym/config/portAdress/order'

export default {
  data () {
  	return {
      index: 0,
      orderIndex:0,
      navTitle: [
        {
          'name': '上午',
          'state': true
        },
        {
          'name': '下午',
          'state': false
        },
        {
          'name': '晚上',
          'state': false
        }
      ],
      cardList: [],
      allTime:{
        "morning":[
          "04:00~05:00",
          "05:00~06:00",
          "06:00~07:00",
          "07:00~08:00",
          "08:00~09:00",
          "09:00~10:00",
          "10:00~11:00",
          "11:00~12:00"
        ],
        "noon":[
          "12:00~13:00",
          "13:00~14:00",
          "14:00~15:00",
          "15:00~16:00",
          "16:00~17:00",
          "17:00~18:00",
          "18:00~19:00",
          "19:00~20:00"
        ],
        "night":[
          "20:00~21:00",
          "21:00~22:00",
          "22:00~23:00",
          "23:00~24:00",
          "24:00~01:00",
          "01:00~02:00",
          "02:00~03:00",
          "03:00~04:00"
        ]
      },
      // 时间组件
      startDate: '',
      wishdate: '',
      // 头像、昵称
      picurl: '',
      wxname: '',
      // 预定时间
      orderList: [],
      cost: '',
      costArr: [],  // 费用集合数组
      timeArr: [],  // 被预约的timeid集合
      navTitleType: '',
      // 手机号
      phone: '',
      check: false
  	}
  },
  created: function () {
    if(service_url){
      this.$http.get(service_url+"/o2o/common/wx/myinfo").then((data)=>{
        this.wxname=data.body.data.name.val;
        this.picurl=data.body.data.pic;
      });
      this.$http.get(service_url+"/o2o/common/wx/myinfo").then((data)=>{
        this.phone=data.body.data.phone.val;
      })
    }else{
      this.picurl = appData.orderData.picurl
      this.wxname = appData.orderData.wxname
    }

    this.phone = userProfile.phone  // 手机号获取
    // 进入页面,获取接口数据
    // 没有选择日期,预约时间为空
    this.baseData('',0)

  },
  components: {
    Group,Datetime
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

    setBegin: function (val) {
      // 选择日期后,传时间
      this.baseData(val,0)
    },
    baseData: function (time,index) {
        gym.orderSave(this.token,{
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid,   // 用户编号
          gymid: 1,           // 健身房id(健身房编号当前固定填1)
          predate: time    // 预约的时间戳
        }, (res) => {
          if (res.status === 200) {
              if (time === 'undefined' || time === '' || time === null) {
                return;
              } else {

                this.cardList = res.data.data;
                // this.navTitleType ="morning";
                var getIndex = sessionStorage.getItem('saveIndex')
                sessionStorage.setItem('saveIndex', '')
                if(getIndex === '' || getIndex === null || getIndex === undefined) {
                  if(index === 0) {
                    this.navTitleType ="morning";
                    this.timeCommon(res.data.data,"morning");
                    return;
                  }
                  if(index === 1) {
                    this.navTitleType ="noon";
                    this.timeCommon(res.data.data,"noon");
                    return;
                  } else if (index === 2) {
                    this.navTitleType ="night";
                    this.timeCommon(res.data.data,"night");
                    return;
                  }
                } else {
                      index = getIndex
                      if(index === '0') {
                        this.navTitleType ="morning";
                        this.timeCommon(this.cardList,"morning");
                        return;
                      }
                      if(index === '1') {
                        this.navTitleType ="noon";
                        this.timeCommon(res.data.data,"noon");
                        return;
                      } else if (index === '2') {
                        this.navTitleType ="night";
                        this.timeCommon(res.data.data,"night");
                        return;
                      }
                }
              }
          } else {
            alert(res.data.msg)
          }
        })
    },
    doSth: function () {
    },
    // 将时间加入数组通用方法
    timeCommon: function (data,type) {


      this.cardList = data
      for(var i = 0; i < this.cardList[type].length; i++) {
        this.cardList[type][i].time = this.allTime[type][i];
      }
    },
    navClick: function (index) {

      this.baseData(this.wishdate, index)
      for (var i = 0; i < this.navTitle.length; i++) {
        this.navTitle[i].state = false;
      }
     this.navTitle[index].state = true;
      // 记录当前选择的索引值
      sessionStorage.setItem('saveIndex',index)
    },
    // 从数组中移除某个元素
    removeByValue: function (arr, val) {
      for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    // 删除数组中元素
    removeX: function (arr, index) {
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    },
    // 获取元素在数组中的索引值
    getArrIndex: function (arr, obj) {
      let index = null;
      let key = Object.keys(obj)[0];
      arr.every(function(value, i) {
          if (value[key] === obj[key]) {
              index = i;
              return false;
          }
          return true;
      });
      return index;
    },
    // 点击卡片,得到时间
    getTimeData: function (cardIndex) {
      var state = this.cardList[this.navTitleType][cardIndex].state
      // 装选中卡片数组
      if (state === 0) {
        this.cardList[this.navTitleType][cardIndex].state = 5
        // 得到日期和时间
        this.orderList.push({orderTime: this.cardList[this.navTitleType][cardIndex].time, orderDate:this.wishdate})

        console.log('得到orderList的集合' + JSON.stringify(this.orderList))
        // 得到的timeid数组集合
        this.timeArr.push(this.cardList[this.navTitleType][cardIndex].timeid)
        console.log('得到的timeid' + this.timeArr)

        // 计算总费用(1个小时30元)
        // // 费用
        var singleCost = this.getValue("cost")
        // var singleCost = sessionStorage.getItem('chargeStandards')
        this.cost = parseInt(this.orderList.length)*singleCost
        return;
      } else if (state === 5) {
        this.cardList[this.navTitleType][cardIndex].state = 0
        // 获取当前被选中orderList的索引值
        var curIndex = this.getArrIndex(this.orderList, {orderTime: this.cardList[this.navTitleType][cardIndex].time, orderDate:this.wishdate})
        // (根据索引值)从数组中删除某元素
        this.removeX(this.orderList, curIndex)
        // 计算总费用(1个小时30元)  移除元素之后,重新计算一次费用
        this.cost = parseInt(this.orderList.length)*30
      } else if(state === 3) { // 爆满
        return;
      } else if(state === 1){
        return;
      } else if(state === 2){
        return;
      }
    },
    orderSubmit: function () {
        if(this.orderList.length > 0) {
          // 当前时间
            var curTime = this.wishdate
            gym.submitOrder(this.token,{
              villageid: userProfile.vid,  // 小区编号
              userid: userProfile.userid,   // 用户编号
              gymid: 1,           // 健身房id(健身房编号当前固定填1)
              timestamp: curTime,    // 预约的时间戳
              timeids: this.timeArr
            }, (res) => {
              if (res.status === 200) {
                alert('预约成功!')
                // 预约成功之后,跳转到微信首页
                this.$router.push('/tj_index')
              } else {
                alert(res.data.msg)
              }
            })
        } else {
          return;
        }
    }
  },
  mounted: function () {
  	document.getElementById("index_loading").style.display="none";
  }
}
</script>

<style scoped>
/* 引入css样式 */
@import '../../gym/import/css/style.css';
.dwBox p{font-size:0.34rem;}
.smSz{padding:0 0.1rem;}
#xjt_wrap .bLine {
    border-bottom: solid 1px #21243c!important;
}
</style>
<style>
#xjt_wrap .weui-cell{padding:0!important;background:none!important;}
#xjt_wrap .weui-cell>div:nth-child(1){color:#fff!important;font-size:0.45rem!important;}
#xjt_wrap .weui-cell>div:nth-child(2){color:#969cca!important;font-size:0.425rem!important;}
</style>
