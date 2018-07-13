<template>
  <div class="map" ref='map'>
    <group gutter = "0" class="my_group">
      <selector placeholder="请选择目的地" v-model="item" :options="list" @on-change="change"></selector>
    </group>
    <div id="container" ref="container">
      <img id="bgImage" :src='avatar' ref="bgImage">
    </div>

  </div>
</template>

<script>
import { Selector, Group } from 'vux';
let all = require('../../../static/img/map/all.jpg');
let seven = require('../../../static/img/map/07.jpg');

export default {
  data () {
    return {
      avatar: all,
      item: '',
      list:[
        {key: seven, value: '参观路线'}
      ]
    }
  },
  components: {
    Selector,
    Group
  },
  methods: {
    change () {
      this.avatar = this.item
    }
  },
  mounted () {
    var w=document.documentElement?document.documentElement.clientHeight:document.body.clientHeight
    this.$refs.map.style.height = w + 'px';
    this.$refs.container.style.height = (w-50) + 'px';
    this.$refs.bgImage.style.height = (w-50) + 'px';
    document.getElementById("index_loading").style.display="none";
  }
 }
</script>

<style scoped>
  .map,#container{width:100%;height:100%;}
  #bgImage{width:1000px;}
  .my_group{
    z-index: 100;
    width: 1000px;
    height:44px;
  }
</style>
