<template>
<div class="delBox">
<div class="nav bLine">
    <ul class="flex_box">
      <li v-for="(item, index) in navData" @click="tab(index)" class="flex" :class="{ 'liHover': checkIndex === index }" >
       <p v-text="item.title"></p>
      </li>
    </ul>
</div>
<div class="dwBox">
    <ul v-for="(item, listIndex) in listData" v-if="item.isTrue" class="yyUl clearfix">
        <div v-for="(item, cardIndex) in listData[listIndex].one" @click="order(listIndex,cardIndex)" class="card fl">
            <div class="bgOrder" :class="{ 'pink': item.statu===1,'green': item.statu===2 }">
                <p v-text="item.time"></p>
                <p>
                    <i v-text="item.dec"></i><i v-if="item.dec!=='爆满'">人预约</i>
                </p>
            </div>
        </div>
    </ul>
</div>
</div>
</template>

<script>
// 引入js
import scale from '../../gym/import/js/index.js'
import headjpg from '../../gym/import/img/head.jpg'

export default {
  data () {
    return {
      // tab切换
      checkIndex: 0,
      index: 0,
      listIndex: 0,
      cardIndex: 0 
    }
  },
  props: ['navData', 'listData','orderInfor'],
  created: function () {
	  this.listData[0].isTrue = true;
  },
  methods: {
    tab: function (index) {
      for(var i = 0; i < this.listData.length; i++) {
        this.listData[i].isTrue = false
      }
      this.checkIndex = index;
      this.listData[index].isTrue = true
      this.$emit('tab'); // 关键代码父组件触发自定义事件
    },
    order: function (listIndex,cardIndex) {
      // 记录是否已被点击
      var checked = true;
      // 当前list索引值(listIndex),当前cardIndex索引值
      let curStatu = this.listData[listIndex].one[cardIndex].statu
      let curDec = this.listData[listIndex].one[cardIndex].dec
      let curTime = this.listData[listIndex].one[cardIndex].time
      if (curStatu === 0) {
        return;
      } else if (curStatu === 1) { //(本身为红色)
        if (checked === true) {
           this.listData[listIndex].one[cardIndex].statu = 2;   
        }
      } else if (curStatu === 2) { // (本身为蓝色)
        // 改变预约时间
        this.orderInfor.push({
            'orderDate': '2017-8-3',
            'orderTime': curTime
        })
        // 将状态值改变(即变背景颜色)
        this.listData[listIndex].one[cardIndex].statu = 1
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
@import '../../gym/import/css/common.css';
@import '../../gym/import/css/style.css';
.card{margin:0.1rem 0.1rem;}
</style>
