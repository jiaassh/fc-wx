<template>
  <div class="wrap finish-wrap">
    <load-more v-if="messageList.length===0" :show-loading="false" tip="暂无消息" background-color="#efeff4"></load-more>
    <!--<div class="message">
      <ul>
        <li v-for="(item, index) in messageList">
          <h3 v-text="item.title">王五在“跳蚤市场”里评论了你的商品</h3>
          <p>
            <span class="mes-name">跳蚤市场</span>
            <span class="mes-time">2017-05-10  15:33</span>
          </p>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
// 引入js
//import scale from '../../gym/import/js/index.js';
import {LoadMore} from 'vux'

// json 数据引用
//import appData from '../gym/import/data/tj-data.json'

export default {
  components:{
    LoadMore
  },
  data () {
    return {
      messageList: []
    }
  },
 /* created: function () {
    this.messageList = appData.message
  },*/
  methods: {
  },
  mounted: function () {
  	document.getElementById("index_loading").style.display="none";
  }
}
</script>

<style scoped>
/* 引入css样式 */
/*@import '../gym/import/css/common.css';*/
/* @import '/src/common/css/diferPage.css' */
.finish-wrap{
  background-color: rgb(239,239,244);
  height: 100%;
  position: fixed;
  width: 100%;
}
.message{border-top:solid 1px #e5e5e5;border-bottom:solid 1px #e5e5e5;margin-top:0.25rem;}
.message ul li{background:#fff;padding:0.2rem 0.4rem;border-bottom:solid 1px #e5e5e5;}
.message ul li:last-child{border-bottom:none!important;}
.message ul li h3{font-size:0.42rem;color:#000;}
.message ul li p{font-size:0.34rem;}
.message ul li p{font-size:0.34rem;}
.message ul li p .mes-name{color:#3196f3;margin-right:0.15rem;}
.message ul li p .mes-time{color:#888;}
</style>
