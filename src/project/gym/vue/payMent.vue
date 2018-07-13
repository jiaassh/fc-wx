<template>
  <div class="wrap finish-wrap xjt_wrap finish-bg">
    <div class="showPay">
      <h3>健身房</h3> 
      <p>应付金额：<span class="spBig">¥<i v-text="allcost"></i></span></p>
    </div>
    <!--付款方式 start-->
    <div class="payType">
      <h3>付款方式</h3>
      <ul>
        <li v-for="(item, index) in items" @click="isCheck(index)" class="flex_box vertical">
          <i :style="{backgroundPosition: item.bedeck}"></i>
          <span v-text="item.name"></span>
          <i v-if="item.isTrue === true" :class= "{ 'i-tick' : item.isTrue }"></i>
        </li>
      </ul>
    </div>
    <!--付款方式 end--> 
    <!--btn start-->
    <div @click="paySussess()" class="btn">确定</div>
    <!--btn end-->
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
      allcost: '',
      items: [
        {
          'bedeck': '0 0',
          'name': '银联',
          'isTrue': false
        },
        {
          'bedeck': '0 -0.64rem',
          'name': '支付宝',
          'isTrue': false
        },
        {
          'bedeck': '0 -1.28rem',
          'name': '微信',
          'isTrue': false
        },
        {
          'bedeck': '0 -1.92rem',
          'name': '钱包',
          'isTrue': false
        }
      ]
    }
  },
  created: function () {
    // 获取应付金额数据
    this.getValue()  // cookie取值
    this.cost()     // 应付金额渲染
  },
  mounted: function () {
    document.getElementById("index_loading").style.display="none";
  },
  methods: {
    // 是否选中
    isCheck: function (index) {
      for(let i = 0; i < this.items.length; i++) {
        this.items[i].isTrue = false
      }
      this.items[index].isTrue = true
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
    cost: function () {
      this.allcost = this.getValue("allcost")
    },
    paySussess: function () {
      gym.submitPayInfor(this.tocken, {
        villageid: userProfile.vid,  // 小区编号
        userid: userProfile.userid,  // 用户编号
        gymid: 1   // 健身房编号
      }, (res) => {
          if (res.status === 200) {
          // 返回结果(成功时,返回的数据)  器材关闭,返回距离、速度、时间、热量 
            alert('付款成功!')
            this.$router.push('/tj_index')    
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
.finish-wrap{
  background-color: rgb(239,239,244);
  height: 100%;
  position: fixed;
  width: 100%;
}
</style>