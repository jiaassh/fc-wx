import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-resource'
import FastClick from 'fastclick'
import config_enter from '../config/config_enter'

Vue.use(Router);
Vue.use(VueRouter);

const routes = [
//新会所页面
  {
    path:'/Timeselect',
    component:resolve => require(['@/project/hscg/Timeselect'],resolve)
  },{
    path:'/hsyy_index',
    component:resolve => require(['@/project/hscg/hsyy_index'],resolve)
  },{
    path:'/hsyy_detail',
    component:resolve => require(['@/project/hscg/hsyy_detail'],resolve)
  },{
    path:'/select_detail',
    component:resolve => require(['@/project/hscg/select_detail'],resolve)
  },



  /*品质生活*/
  {
    path:'/goods_index',
    component:resolve => require(['@/project/pzsh/goods_index'],resolve)
  },{
    path:'/store_detail',
    component:resolve => require(['@/project/pzsh/store_detail'],resolve)
  },{
    path:'/goods_detail',
    component:resolve => require(['@/project/pzsh/goods_detail'],resolve)
  },{
    path:'/goods_order',
    component:resolve => require(['@/project/pzsh/goods_order'],resolve)
  },{
    path:'/store_up',
    component:resolve => require(['@/project/pzsh/store_up'],resolve)
  },{
    path:'/goods_collect',
    component:resolve => require(['@/project/pzsh/goods_collect'],resolve)
  },{
    path:'/goods_evaluate',
    component:resolve => require(['@/project/pzsh/goods_evaluate'],resolve)
  },{
    path:'/store_detail',
    component:resolve => require(['@/project/pzsh/store_detail'],resolve)
  },{
    path:'/store_confirm',
    component:resolve => require(['@/project/pzsh/store_confirm'],resolve)
  },{
    path:'/ordersuc',
    component:resolve => require(['@/project/pzsh/ordersuc'],resolve)
  },
  /*跳蚤市场*/
  {
    path:'/market_index',
    component:resolve => require(['@/project/tzsc/market_index'],resolve)
  },{
    path:'/market_detail',
    component:resolve => require(['@/project/tzsc/market_detail'],resolve)
  },{
    path:'/market_list',
    component:resolve => require(['@/project/tzsc/market_list'],resolve)
  },{
    path:'/add_market_goods',
    component:resolve => require(['@/project/tzsc/add_market_goods'],resolve)
  },{
    path:'/my_published',
    component:resolve => require(['@/project/tzsc/my_published'],resolve)
  },{
    path:'/market_list',
    component:resolve => require(['@/project/tzsc/market_list'],resolve)
  },
  /*投诉建议，报事报修*/
  {
    path:'/ts_bs/:type',
    component:resolve => require(['@/project/ts_bs/ts_bs'],resolve)
  },{
    path:'/my_service',
    component:resolve => require(['@/project/ts_bs/my_service'],resolve)
  },{
    path:'/service_detail',
    component:resolve => require(['@/project/ts_bs/service_detail'],resolve)
  },
  /*公告广告*/
  {
    path:'/notice_detail',
    component:resolve => require(['@/project/ggxx/notice_detail'],resolve)
  },{
    path:'/notice_list',
    component:resolve => require(['@/project/ggxx/notice_list'],resolve)
  },{
    path:'/enroll',
    component:resolve => require(['@/project/ggxx/enroll'],resolve)
  },
  /*首页*/
  {
    path:'/',
    // component:resolve => require(['@/project/fc_index'],resolve),
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/index',
    // component:resolve => require([index_url],resolve),
    meta:{
      enterAuth:true
    }
  },{
    path:'/fc_index',
    component:resolve => require(['@/project/fc_index'],resolve)
  },{
    path:'/tj_index',
    component:resolve => require(['@/project/tj_index'],resolve)
  },
  /*会所场馆*/
  {
    path:'/area_index',
    component:resolve => require(['@/project/hscg/area_index'],resolve)
  },{
    path:'/area_detail',
    component:resolve => require(['@/project/hscg/area_detail'],resolve)
  },{
    path:'/area_choose',
    component:resolve => require(['@/project/hscg/area_choose'],resolve)
  },{
    path:'/area_reserve',
    component:resolve => require(['@/project/hscg/area_reserve'],resolve)
  },{
    path:'/card_switch',
    component:resolve => require(['@/components/card_switch/card_switch'],resolve)
  }
  ,{
    path:'/common_order/:route_type',
    component:resolve => require(['@/project/common/goods_order_list.vue'],resolve)
  },{
    path:'/user_self',
    meta:{
      enterUser:true
    }
  },{
    path:'/fc_user_self',
    component:resolve => require(['@/project/fc_user_self'],resolve)
  },{
    path:'/tj_user_self',
    component:resolve => require(['@/project/tj_user_self'],resolve)
  },{
    path:'/reserve_success',
    component:resolve => require(['@/project/hscg/reserve_success'],resolve)
  },{
    path:'/area_evaluate',
    component:resolve => require(['@/project/hscg/area_evaluate'],resolve)
  },{
    path:'/code_share',
    component:resolve => require(['@/project/door/code_share'],resolve)
  },{
    path:'/invite_guest',
    component:resolve => require(['@/project/door/invite_guest'],resolve)
  },{
    path:'/key_manage',
    component:resolve => require(['@/project/door/key_manage'],resolve)
  },{
    path:'/tj_key_manage',
    component:resolve => require(['@/project/door/tj_key_manage'],resolve)
  },{
    path:'/my_code',
    component:resolve => require(['@/project/door/my_code'],resolve)
  },{
    path:'/open_door',
    component:resolve => require(['@/project/door/open_door'],resolve)
  },{
    path:'/invite_code',
    component:resolve => require(['@/project/door/invite_code'],resolve)
  },{
    path:'/invite_detail',
    component:resolve => require(['@/project/door/invite_detail'],resolve)
  },{
    path:'/b5invite',
    component:resolve => require(['@/project/door/b5invite'],resolve)
  },
  // 门禁管理
  {
    path:'/doormanage',
    component:resolve => require(['@/project/door/doormanage'],resolve)
  },
  // sim卡
  {
    path:'/simmsg',
    component:resolve => require(['@/project/door/simmsg'],resolve)
  },
  /*房产管理*/
  {
    path:'/housemanage',
    component:resolve => require(['@/project/fcgl/housemanage'],resolve)
  },



  // 抽奖
  {
    path:'/prize',
    component:resolve => require(['@/project/prize/prize'],resolve)
  },
  {
    path:'/coupons',
    component:resolve => require(['@/project/prize/coupons'],resolve)
  },
  {
    path:'/usecoupons',
    component:resolve => require(['@/project/prize/usecoupons'],resolve)
  },

  /*个人中心*/
  {
    path:'/personal_profile',
    component:resolve => require(['@/project/common/personal_profile'],resolve)
  },{
    path:'/my_paylist/:type',
    component:resolve => require(['@/project/common/my_paylist'],resolve)
  },{
    path:'/my_wallet',
    component:resolve => require(['@/project/common/my_wallet'],resolve)
  }
  ,{
    path:'/my_message',
    component:resolve => require(['@/project/common/my_message'],resolve)
  }
  ,{
    path:'/error',
    component:resolve => require(['@/project/common/error'],resolve)
  },{
    path:'/test_upload',
    component:resolve => require(['@/project/demo/test_upload'],resolve)
  },{
    path:'/register',
    component:resolve => require(['@/project/common/register'],resolve)
  },{
    path:'/new_message',
    component:resolve => require(['@/project/common/new_message'],resolve)
  },{
    path:'/pay_success',
    component:resolve => require(['@/project/common/pay_success'],resolve)
  },{
    path:'/personalMessage',
    component:resolve => require(['@/project/common/personalMessage'],resolve)
  },
  /*微装保洁*/
  {
    path:'/wz_bj',
    component:resolve => require(['@/project/wz_bj/wz_bj'],resolve)
  },{
    path:'/wb_detail',
    component:resolve => require(['@/project/wz_bj/wb_detail'],resolve)
  },{
    path:'/wb_reserve',
    component:resolve => require(['@/project/wz_bj/wb_reserve'],resolve)
  },

  /*缴费*/
  {
    path:'/wallet_record',
    component:resolve => require(['@/project/common/wallet_record'],resolve)
  },{
    path:'/wallet_pay',
    name:"wallet_pay",
    component:resolve => require(['@/project/common/wallet_pay'],resolve)
  },{
    path:'/wallet_code',
    component:resolve => require(['@/project/common/wallet_code'],resolve)
  },{
    path:'/paylist_pay',
    component:resolve => require(['@/project/common/paylist_pay'],resolve)
  },{
    path:'/my_bankCardList',
    component:resolve => require(['@/project/common/my_bankCardList'],resolve)
  },{
    path:'/binding_card',
    component:resolve => require(['@/project/common/binding_card'],resolve)
  },{
    path:'/bill_page',
    component:resolve => require(['@/project/common/bill_page'],resolve)
  },{
    path:'/open_wallet',
    component:resolve => require(['@/project/common/open_wallet'],resolve)
  },{
    path:'/Alipay',
    component:resolve => require(['@/project/common/Alipay'],resolve)
  },

  /*资产管理*/
  {
    path:'/device_info',
    component:resolve => require(['@/project/zcgl/device_info'],resolve)
  },{
    path:'/house_info',
    component:resolve => require(['@/project/zcgl/house_info'],resolve)
  }
  ,{
    path:'/12',
    component:resolve => require(['@/project/demo/12'],resolve)
  },
  {
    path:'/zcindex',
    component:resolve=>require(['@/project/zcgl/zcindex'],resolve)
  }
//这里require组件路径根据自己的配置引入
  /*注册绑定*/
  ,{
    path:"/house_manage",
    component:resolve => require(['@/project/register/house_manage'],resolve)
  },{
    path:"/house_people",
    component:resolve => require(['@/project/register/house_people'],resolve)
  },{
    path:"/share_others",
    component:resolve => require(['@/project/register/share_others'],resolve)
  },{
    path:"/visitor_bind",
    component:resolve => require(['@/project/register/visitor_bind'],resolve)
  },{
    path:"/visitor_family",
    component:resolve => require(['@/project/register/visitor_family'],resolve)
  },{
    path:"/visitor_login",
    component:resolve => require(['@/project/register/visitor_login'],resolve)
  },{
    path:"/visitor_owner/:router_type",
    component:resolve => require(['@/project/register/visitor_owner'],resolve)
  },{
    path:"/visitor_qrcode",
    component:resolve => require(['@/project/register/visitor_qrcode'],resolve)
  },{
    path:"/visitor_complete",
    component:resolve => require(['@/project/register/visitor_complete'],resolve)
  },{
    path:"/caller_in",
    component:resolve => require(['@/project/register/caller_in'],resolve)
  }
];

FastClick.attach(document.body);

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(res => res.meta.enterUser)){
    if(config_enter.mark==="TJ"){
      next({
        path: '/tj_user_self'
      })
    }else if(config_enter.mark==="FC"){
      next({
        path: '/fc_user_self'
      })
    }
  }
  if(to.matched.some(res => res.meta.enterAuth)){
    if(config_enter.mark==="TJ"){
      next({
        path: '/tj_index'
      })
    }else if(config_enter.mark==="FC"){
      next({
        path: '/fc_index'
      })
    }
  }
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if(userProfile.logintype==1){
      if (userProfile.isreg==0) {
        if(config_enter.mark==="TJ"){
          next({
            path: 'tj_index'
          })
        }else if(config_enter.mark==="FC"){
          next({
            path: 'fc_index'
          })
        }
      }else{
        next({
          path: 'visitor_login'
        })
      }
    } else if(userProfile.logintype==2){
      next({
        path: 'visitor_owner/2'
      })
    }else if(userProfile.logintype==3){
      next({
        path: 'visitor_owner/3'
      })
    }else if(userProfile.logintype==4){
      next({
        path: 'go_map'
      })
    }
  } else {
    next()
  }
});


export default router;

