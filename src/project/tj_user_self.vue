<template>
  <div id="tj_user_self">
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div style="padding-bottom:48px;">
      <header class="text-center this_header">
        <div>
          <div class="img_circle img_circle_border avatar"><img :src="pic" @click="go_personal" class="img_circle" /></div>
          <div class="ellipsis">
            <h4>{{user_name}}</h4>
          </div>
          <div class="ellipsis">
            <p>{{current_address}}</p>
          </div>
        </div>
      </header>
      <div style="background-color:white;">
        <flexbox :gutter="0" style="border-bottom:1px solid #ececec;">
          <flexbox-item @click.native="go_paylist" :span="1/2">
            <div class="flex_1_2" style="border-right:1px solid #ececec;">
              <p style="font-size:20px;color:red;margin-bottom:-5px;">{{arrearage?arrearage:0}}</p>
              <p>欠费</p>
            </div>
          </flexbox-item>
          <flexbox-item @click.native="go_wallet" :span="1/2">
            <div class="flex_1_2">
              <p style="font-size:20px;margin-bottom:-5px;">{{extra_money?extra_money:0}}</p>
              <p>余额</p>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0">
          <flexbox-item :span="1/4">
            <div style="border-right:1px solid #ececec;" @click="go_service" class="flex_1_2">
              <div style="position:relative;display: inline-block"><img style="height:28px" src="./gym/import/img/tj/1.png" />
                <sup class="this_sup" v-if="new_service!==0">
                  <span class="vux-badge vux-badge-single">{{new_service}}</span>
                </sup>
              </div>
              <p style="font-size:14px;">我的服务</p>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div style="border-right:1px solid #ececec;" @click="go_published" class="flex_1_2">
              <div style="position:relative;display: inline-block"><img style="height:28px" src="./gym/import/img/tj/2.png" />
                <sup class="this_sup" v-if="new_publish!==0">
                  <span class="vux-badge vux-badge-single">{{new_publish}}</span>
                </sup>
              </div>
              <p style="font-size:14px;">我的发布</p>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div style="border-right:1px solid #ececec;" @click="go_wallet" class="flex_1_2">
              <div style="position:relative;display: inline-block"><img style="height:28px" src="./gym/import/img/tj/3.png" />
                <sup class="this_sup" v-if="new_wallet!==0">
                  <span class="vux-badge vux-badge-single">{{new_wallet}}</span>
                </sup>
              </div>
              <p style="font-size:14px;">我的钱包</p>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div style="border-right:1px solid #ececec;" @click="go_paylist" class="flex_1_2">
              <div style="position:relative;display: inline-block"><img style="height:28px" src="./gym/import/img/tj/4.png" />
                <sup class="this_sup" v-if="new_paylist!==0">
                  <span class="vux-badge vux-badge-single">{{new_paylist}}</span>
                </sup>
              </div>
              <p style="font-size:14px;">我的账单</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <group gutter="10px" v-if="!!visitor_in">
        <cell title="我的订单" @click.native="cannot_in" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/img/my_orderlist.png"></cell>
        <cell title="门禁权限" @click.native="cannot_in" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/5.png"></cell>
        <cell title="房产管理" @click.native="cannot_in" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/6.png"></cell>
        <cell title="个人资料" @click.native="cannot_in" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/7.png"></cell>
        <cell title="个人消息" @click.native="cannot_in" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/8.png"></cell>
      </group>
      <group gutter="10px" v-else>
        <cell title="我的订单" :link="{path:'/bld/goods_order_list'}" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/img/my_orderlist.png"></cell>
        <cell title="门禁权限" @click.native="is_notOwner" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/5.png"></cell>
        <cell title="房产管理" :link="{path:'house_manage'}" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/6.png"></cell>
        <cell title="个人资料" :link="{path:'personal_profile'}" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/7.png"></cell>
        <cell title="个人消息" :link="{path:'personalMessage'}" is-link>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./gym/import/img/tj/8.png"></cell>
      </group>
      <popup style="background:#ececec;opacity: 0.9;height:100%;" v-model="popup_model">
        <div @click="popup_model=false">
          <div style="position:absolute;padding:50px 30px;color:#615d5d;">
            <div style="font-size:48px;float:left">{{this_day}}</div>
            <div style="float:left;padding:12px;">
              <div>星期{{this_week}}</div>
              <div>{{this_month+'/'+this_year}}</div>
            </div>
          </div>
          <flexbox style="position:absolute;bottom:61px;" :gutter="0" wrap="wrap" v-if="!!visitor_in">
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">会所</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">钥匙管理</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">专业保洁</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">公告</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">微装</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">资产管理</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">跳蚤市场</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">投诉建议</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="cannot_in" style="text-align: center;padding:10px;">
                <img :style="icon_style" src="" />
                <p style="font-size:14px">访客邀请</p>
              </div>
            </flexbox-item>
          </flexbox>
          <flexbox style="position:absolute;bottom:61px;" :gutter="0" wrap="wrap" v-else>
            <flexbox-item :span="1/4">
              <router-link :to="{path:'area_index'}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">会所</p>
                </div>
              </router-link>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div @click="go_smkm(3)">
                <div style="text-align: center;padding:10px;color:#7e8c8d;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">钥匙管理</p>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <router-link :to="{path:'wz_bj',query:{route_type:1}}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">专业保洁</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <router-link :to="{path:'notice_list'}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">公告</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <router-link :to="{path:'wz_bj',query:{route_type:2}}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">微装</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <router-link :to="{path:'house_info'}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">资产管理</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <router-link :to="{path:'market_index'}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">跳蚤市场</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <router-link :to="{path:'ts_bs/2'}">
                <div style="text-align: center;padding:10px;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">投诉建议</p>
                </div>
              </router-link>
            </flexbox-item>

            <flexbox-item :span="1/4">
              <div @click="go_smkm(2)">
                <div style="text-align: center;padding:10px;color:#7e8c8d;">
                  <img :style="icon_style" src="" />
                  <p style="font-size:14px">访客邀请</p>
                </div>
              </div>
            </flexbox-item>

          </flexbox>

          <div style="text-align: center;border-top: 1px solid rgba(197, 193, 193, 1);position:absolute;left:0;bottom:0;right:0;">
            <span class="vux-close"></span>
          </div>
        </div>
      </popup>
      <!--nav start-->
      <tabbar>
        <tabbar-item link="index">
          <img slot="icon" src="./gym/import/img/tj/icon-home.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <div @click="go_door" style="font-size:0;"><img style="width:1.26rem;height:1.26rem;" src="./gym/import/img/tj/icon-center.png" /></div>
        <tabbar-item selected>
          <img slot="icon" src="./gym/import/img/tj/icon-member1.png">
          <span slot="label" style="color:#2196f3!important;">个人中心</span>
        </tabbar-item>
      </tabbar>
      <!--nav end-->
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{content}}</alert>
    <div class="select_door" v-show="doorshow">
      <div class="specific_door" v-for="(item,index) in doorlist" @click="opendoor(item.id)">
        <img src="./door1.png" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
    <!--遮罩-->
    <div class="doormask" v-show="doorshow" @click="doorshow=!doorshow"></div>
  </div>
</template>

<script>
import scale from './gym/import/js/index.js'
import loading from '@/components/loading/dataLoading';
import { setTitle } from '@/common/js/common';
import { Group, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem, Popup, Alert } from 'vux'

export default {
  data() {
    return {
      // 门列表
      doorlist: [],

      loading: true,
      popup_model: false,
      identity: 0,
      data: [],
      user_name: "",
      pic: "",
      current_address: "",
      extra_money: "",
      arrearage: "",
      new_service: "",
      new_order: "",
      new_publish: "",
      new_wallet: 0,
      new_paylist: 0,
      new_storeup: "",
      this_year: "",
      this_month: "",
      this_day: "",
      this_week: "",
      confirm_show: false,
      dialog_title: "提示",
      content: "",
      visitor_in: true,
      owner_in: false,
      doorshow: false
    }
  },
  components: {
    loading, Cell, Tabbar, TabbarItem, Group, Flexbox, FlexboxItem, Popup, Alert
  },
  computed: {
    icon_style() {
      return {
        "width": document.body.clientWidth * 0.15 + "px",
        "height": document.body.clientWidth * 0.15 + "px",
      }
    }
  },
  mounted() {
    setTitle("个人中心");
    console.log(userProfile)
    this.visitor_in = !userProfile;
    this.owner_in = !userProfile.atype;
    console.log(this.owner_in);
    let oDate = new Date();
    this.this_year = oDate.getFullYear();
    this.this_month = oDate.getMonth() + 1;
    this.this_day = oDate.getDate();
    let this_a = new Array("日", "一", "二", "三", "四", "五", "六");
    let week = oDate.getDay();
    this.this_week = this_a[week];
    if ((userProfile.atype === 2) && (userProfile.isreg === 0)) {
      this.identity = 1;//游客
    }
    this.getdata();
  },
  methods: {
    // 点击开门
    opendoor(id) {
      console.log(id)
      // console.log(userProfile)
      this.$http.post('http://tj.fm-community.com.cn/o2o/door/web/remoteOpenDoor', {
        doorid: id,
        villageid: userProfile.vid,
        houseid: userProfile.houseid,
        userid: userProfile.userid,
        openmethod: 'wx',
        userid: userProfile.userid,
        usertype: userProfile.atype
      }).then(data => {
        console.log(data)
        if (data.body.state === 0) {
          this.confirm_show = true;
          this.confirm_content = data.body.data;
          this.doorshow=!this.doorshow
        } else {
          this.confirm_show = true;
          this.content = data.body.msg;
          this.doorshow=!this.doorshow
        }
      })
    },
    is_notOwner() {
      if (this.owner_in) {
        this.$router.push({ path: "tj_key_manage" })
      } else {
        this.confirm_show = true;
        this.content = "只有业主身份可以进入门禁权限管理";
      }
    },
    go_paylist() {
      if (!!this.visitor_in) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'my_paylist/2'
        })
      }
    },
    showMore() {
      this.popup_model = true;
    },
    go_door() {
      // this.$router.push({path:"open_door"})
      var that = this
      this.$http.post('http://tj.fm-community.com.cn/o2o/door/wexin/lookUpDoorAuth', {
        userid: userProfile.userid,
        villageid: userProfile.vid
      }).then(data => {
        if (data.body.state === 0) {
          that.doorlist = data.body.data
        }
      }, err => {
        this.dialog_title = "提示";
        this.content = data.body.msg;
        this.confirm_show = true;
      })
      this.doorshow = !this.doorshow
    },
    go_service() {
      if (!!this.visitor_in) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'my_service'
        })
      }
    },
    go_published() {
      if (!!this.visitor_in) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'my_published'
        })
      }
    },
    cannot_in() {
      this.$router.push({ path: "caller_in" });
    },
    getdata() {
      let self = this;
      if (service_url) {
        this.$http.get(service_url + "/o2o/common/wx/myinfo").then((data) => {
          self.user_name = data.body.data.name.val;
          self.pic = data.body.data.pic;
        });
        this.$http.get(service_url + "/o2o/common/wx/user_info").then((data) => {
          if (data.body.status === 0) {
            self.current_address = data.body.current_address;
            //                  self.extra_money=data.body.extra_money?data.body.extra_money:0;
            self.arrearage = data.body.arrearage;
            self.new_service = data.body.new_service;
            self.new_order = data.body.new_order;
            self.new_publish = data.body.new_publish;
            self.new_storeup = data.body.new_storeup;
          } else {
            this.dialog_title = "提示";
            this.content = data.body.error_reason;
            this.confirm_show = true;
          }
        });
        this.$http.get(service_url + "/o2o/assetsv2/wx/my_wallet.do").then((data) => {
          self.extra_money = data.body.data ? parseFloat(data.body.data.total_price).toFixed(2) : "0.00";
        })
      } else {
        this.$http.get("/api/myinfo").then((data) => {
          self.user_name = data.body.data.data.name.val;
          self.pic = data.body.data.data.pic;
        });
        this.$http.get("/api/user_info").then((data) => {
          self.current_address = data.body.data.data.current_address;
          self.extra_money = data.body.data.data.extra_money;
          self.arrearage = data.body.data.data.arrearage;
          self.new_service = data.body.data.data.new_service;
          self.new_order = data.body.data.data.new_order;
          self.new_publish = data.body.data.data.new_publish;
          self.new_storeup = data.body.data.data.new_storeup;
        })
      }
      document.getElementById("index_loading").style.display = "none";
    },
    go_wallet() {
      if (!!this.visitor_in) {
        this.cannot_in();
      } else {
        if (userProfile.atype === 3) {
          this.content = "租户暂未开放钱包功能";
          this.confirm_show = true;
        } else {
          this.$router.push({ path: "my_wallet" })
        }
      }
    },
    go_smkm(key) {
      if (!userProfile) {
        this.cannot_in();
      } else {
        if (userProfile.hasDoorAuthOrNot === 1) {
          this.content = "当前小区暂无门禁";
          this.confirm_show = true;
        } else if (userProfile.hasDoorAuthOrNot === 2) {
          this.content = "您暂时没有门禁权限";
          this.confirm_show = true;
        } else if (userProfile.hasDoorAuthOrNot === 3) {
          if (key === 1) {
            this.$router.push({ path: "my_code" });
          } else if (key === 2) {
            this.$router.push({ path: "invite_guest" });
          } else {
            this.$router.push({ path: "key_manage" });
          }
        }
      }
    },
    go_personal() {
      if (!!this.visitor_in) {
        this.cannot_in();
      } else {
        this.$router.push({ path: "personal_profile" })
      }
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.this_header {
  color: white;
  position: relative;
  padding: 0.5em 0;
  border-bottom: 1px solid #ececec;
  background: url(./gym/import/img/tj/tj_bg.jpg) center center / cover no-repeat rgb(106, 73, 109);
}

.avatar {
  margin: 0 auto;
}

.img {}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img_circle {
  border-radius: 50%;
}

.img_circle_border {
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border: 4px solid rgba(255, 255, 255, 0.498039);
}

.ellipsis {
  text-overflow: ellipsis;
}

.ellipsis p {
  font-size: .8em;
}

.flex_1_2 {
  margin: 10px 0;
  text-align: center;
}

.this_sup {
  position: absolute;
  top: -15px;
  left: 100%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 101;
}

.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #999;
  width: 24px;
  height: 24px;
}

.vux-close:before {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 24px;
  height: 1px;
  background-color: currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.vux-close:after {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 24px;
  height: 1px;
  background-color: currentColor;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}



/*选择门*/

.select_door {
  position: fixed;
  bottom: 1.55rem;
  display: flex;
  width: 100%;
  background: #fff;
  z-index: 100;
  flex-wrap: wrap-reverse;
}

.select_door .specific_door {
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0 0.25rem;
  width: 33.3%
}

.select_door img {
  width: 2.06rem;
  height: auto;
  margin-left: 0.6rem;
  margin-bottom: 0.1rem
}

.doormask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .3;
  top: 0;
  left: 0
}
</style>
<style>
#tj_user_self .weui-tabbar {
  padding: 0.18rem 0 0.1rem;
}

#tj_user_self .weui-tabbar__item {
  padding: 0!important;
}
</style>
