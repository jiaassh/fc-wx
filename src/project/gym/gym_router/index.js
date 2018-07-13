const routes = [
  {  // 首页
    path:'/fitnessRoom',
    component:resolve => require(['@/project/gym/vue/fitnessRoom'],resolve)
  },
  { // 结算
    path:'/settlement',
    component:resolve => require(['@/project/gym/vue/settlement'],resolve)
  },
  { // 预定
    path:'/reservation',
    component:resolve => require(['@/project/gym/vue/reservation'],resolve)
  },
  { // 进入健身房
    path:'/enterGym',
    component:resolve => require(['@/project/gym/vue/enterGym'],resolve)
  },
  { // 开始健身
    path:'/startGym',
    component:resolve => require(['@/project/gym/vue/startGym'],resolve)
  },
  { // 结束健身
    path:'/endGym',
    component:resolve => require(['@/project/gym/vue/endGym'],resolve)
  },
  { // 付款
    path:'/payMent',
    component:resolve => require(['@/project/gym/vue/payMent'],resolve)
  },
  { // (统建)个人消息
    path:'/tj_personalMessage',
    component:resolve => require(['@/project/gym/vue/tj_personalMessage'],resolve)
  },
  { // (统建)首页
    path:'/tj_home',
    component:resolve => require(['@/project/gym/vue/tj_home'],resolve)
  },
  { // (统建)个人中心
    path:'/tj_userSelf',
    component:resolve => require(['@/project/gym/vue/tj_userSelf'],resolve)
  }
];
export default routes;

