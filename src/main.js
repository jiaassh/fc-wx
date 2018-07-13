// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import './config/index'
import enter_mark_obj from './config/config_enter'




if(enter_mark_obj.mark==="TJ"){
  enter_mark=2;
  // service_url = "http://tj.fm-community.com.cn";
  // service_url = "http://192.168.0.114:80";
  // service_url = "";
  dynamicLoading.css("../static/css/tj_common.css");
}else if(enter_mark_obj.mark==="FC"){
  enter_mark=1;
  // service_url=''
  // service_url = "http://192.168.0.107:8080";
  // service_url = "http://192.168.0.114";
  service_url = "http://fengcheng.fm-community.com.cn";   // 测试服务器
  // service_url = "http://wechat.fengcheng-pms.com.cn";    // 丰城线上服务器
  dynamicLoading.css("../static/css/fc_common.css");
}

import $ from 'jquery';
Vue.use(Vuex);
Vue.directive('focusNext', {
  bind: function (el,binding) {
    binding.handler = function () {
      if (el.value.length == binding.expression) {
        var next = el.nextSibling;
        if(el.getAttribute("data-current")<3){
          next.focus();
        }else{
          el.blur();
        }

      }else if(el.value.length > binding.expression){
        el.value = "";
      }
    }.bind(binding)
    el.addEventListener('input', binding.handler)
  },
  unbind: function (el,binding) {
    el.removeEventListener('input', binding.handler)
  }
})
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
