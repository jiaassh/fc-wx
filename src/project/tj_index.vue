<template>
  <div id="xjt_tj" class="wrap xjt_wrap finish-wrap">
    <!--banner start-->
    <div class="banner">
      <swiper auto :aspect-ratio="270/750">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item.picture">
        </swiper-item>
      </swiper>
    </div>
    <!--banner end-->
    <!--kind start-->
    <!--<div class="kind">
                <div class="flex_box">
                  <div class="flex">
                    <li @click="go_bsbx">
                      <i class="one"></i>
                      <p>报事报修</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_tsjy">
                      <i class="two"></i>
                      <p>投诉建议</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_tzsc">
                      <i class="three"></i>
                      <p>跳蚤市场</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_wyjf">
                      <i class="four"></i>
                      <p>物业缴费</p>
                    </li>
                  </div>
                </div>

                <div class="flex_box">
                  <div class="flex">
                    <li @click="go_bld">
                      <i class="five"></i>
                      <p>博联商城</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_wjdc">
                      <i class="six"></i>
                      <p>问卷调查</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_jsf">
                      <i class="seven"></i>
                      <p>健身房</p>
                    </li>
                  </div>
                  <div class="flex">
                    <li @click="go_hsyq">
                      <i class="eight"></i>
                      <p>红色引擎</p>
                    </li>
                  </div>
                </div>
              </div>-->
    <!--便利店-->
    <div class="kind">
      <swiper dots-position="center" v-model="demo_index">
        <swiper-item>
          <div class="flex_box boxwrap">
            <div class="flex">
              <li @click="go_bsbx">
                <i class="one"></i>
                <p>报事报修</p>
              </li>
            </div>
            <div class="flex">
              <li @click="go_tsjy">
                <i class="two"></i>
                <p>投诉建议</p>
              </li>
            </div>
            <div class="flex">
              <li @click="go_tzsc">
                <i class="three"></i>
                <p>跳蚤市场</p>
              </li>
            </div>
            <div class="flex">
              <li @click="go_wyjf">
                <i class="four"></i>
                <p>物业缴费</p>
              </li>
            </div>
          </div>
          <div class="flex_box boxwrap">
            <div class="flex">
              <li @click="go_bld">
                <i class="five"></i>
                <p>博联商城</p>
              </li>
            </div>
            <div class="flex">
              <li @click="go_bianli">
                <i class="nine"></i>
                <p>便利店</p>
              </li>
            </div>
            <!--<div class="flex">
                  <li @click="go_wjdc">
                    <i class="six"></i>
                    <p>问卷调查</p>
                  </li>
                </div>-->
            <div class="flex">
              <li @click="go_jsf">
                <i class="seven"></i>
                <p>健身房</p>
              </li>
            </div>
            <div class="flex">
              <li @click="gonext">
                <i class="ten"></i>
                <p>更多服务</p>
              </li>
            </div>
            <!--<div class="flex">
                  <li @click="go_hsyq">
                    <i class="eight"></i>
                    <p>红色引擎</p>
                  </li>
                </div>-->
          </div>
        </swiper-item>
        <swiper-item>
          <div class="flex_box boxwrap">
            <!--<div class="flex">
              <li @click="go_bld">
                <i class="five"></i>
                <p>博联商城</p>
              </li>
            </div>
            <div class="flex">
              <li @click="go_bld">
                <i class="five"></i>
                <p>便利店</p>
              </li>
            </div>-->
            <div class="flex">
                  <li @click="go_wjdc">
                    <i class="six"></i>
                    <p>问卷调查</p>
                  </li>
                </div>
            <!--<div class="flex">
              <li @click="go_jsf">
                <i class="seven"></i>
                <p>健身房</p>
              </li>
            </div>-->
            <!--<div class="flex">
              <li @click="go_jsf">
                <i class="seven"></i>
                <p>更多服务</p>
              </li>
            </div>-->
            <div class="flex">
              <li @click="go_hsyq">
                <i class="eight"></i>
                <p>红色引擎</p>
              </li>
            </div>
          </div>
        </swiper-item>
      </swiper>

    </div>
    <!--kind end-->
    <!--notice start-->
    <div v-if="!!notice_url" class="tj-notice">
      <div class="n-title clearfix">
        <span class="fl">
          <i class="i-notice fl"></i>社区公告</span>
        <router-link :to="{path:'notice_list'}" class="fr more">查看更多&gt</router-link>
        <!--<a class="fr" href="javascript:void(0)">查看更多&gt</a>-->
      </div>
      <!--标题 start-->
      <div class="tj-title">{{published_content}}</div>
      <!--标题 end-->
      <div style="height: 4.8rem;overflow: hidden;padding: 0.1rem 0.5rem 0;" @click="go_notice_detail">
        <img :src="notice_url" alt="">
      </div>
      <div class="n-desc">
        <span class="spTag">公告</span>
        <span>{{published_from}}</span>
        <span>2017-8-16 23:22</span>
      </div>
    </div>
    <!--notice end-->
    <!--recommend start-->
    <div class="recommend">
      <div class="tit">
        <img src="./gym/import/img/tj/tj-homeTit.jpg" alt="">
      </div>

      <div class="dw flex_box">
        <div @click="go_bld()" class="importRadius flex">
          <img src="./gym/import/img/tj/tj-store.png" alt="">
        </div>
        <div class="jx-center"></div>
        <div @click="go_jsf()" class="importRadius flex">
          <img src="./gym/import/img/tj/tj-gym.jpg" alt="">
        </div>
      </div>
    </div>
    <!--recommend end-->

    <div style="height:60px"></div>
    <!--nav start-->
    <tabbar>
      <tabbar-item selected>
        <img slot="icon" src="./gym/import/img/tj/icon-home1.png">
        <span slot="label" style="color:#2196f3!important;">首页</span>
      </tabbar-item>
      <div @click="go_door"><img style="width:1.26rem;height:1.26rem;" src="./gym/import/img/tj/icon-center.png" /></div>
      <tabbar-item link="tj_user_self">
        <img slot="icon" src="./gym/import/img/tj/icon-member.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
    <!--nav end-->
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
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
// 引入js
import scale from './gym/import/js/index.js'
import { Swiper, SwiperItem, Tabbar, TabbarItem, Alert } from 'vux'


// json 数据引用
/*import appData from '../../gym/import/data/json.json'*/

// 接口引用
import gym from './gym/config/portAdress/gymHome'
import { setTitle } from '@/common/js/common'; export default {
  data() {
    return {
      demo_index:0,
      //开门数
      doorlist: [],
      confirm_show: false,
      confirm_content: "",
      demo06_list: [],
      demo06_index: 0,
      notice_url: [],
      published_from: "",
      published_time: "",
      published_content: "",
      notice_id: "",
      doorshow: false
    }
  },
  created: function() {
  },
  components: {
    Swiper, SwiperItem, Tabbar, TabbarItem, Alert
  },
  methods: {

    // 点击开门
    opendoor(id) {
      console.log(id)
      console.log(userProfile)
      this.$http.post('http://tj.fm-community.com.cn/o2o/door/web/remoteOpenDoor', {
        doorid: id,
        villageid: userProfile.vid,
        houseid: userProfile.houseid,
        userid: userProfile.userid,
        openmethod: 'wx',
        userid: userProfile.userid,
        usertype: userProfile.atype
      }).then(data => {
        console.log(data.body)
        if (data.body.state === 0) {
          this.confirm_show = true;
          this.confirm_content = data.body.data;
          this.doorshow = !this.doorshow
        } else {
          this.confirm_show = true;
          this.confirm_content = data.body.msg
        }
      })
    },
    saveValue: function(objName, objValue, objHours) {
      var str = objName + "=" + escape(objValue);
      if (objHours > 0) {
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
      }
      document.cookie = str;
    },
    cannot_in() {
      this.$router.push({ path: "caller_in" });
    },
    go_bsbx() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'ts_bs/1'
        })
      }
    },
    go_tsjy() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'ts_bs/2'
        })
      }
    },
    go_tzsc() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'market_index'
        })
      }
    },
    go_wyjf() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'my_paylist/1'
        })
      }
    },
    go_bld() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'bld/goods_index'
        })
      }
    },
    // 便利店
    go_bianli() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'bianli/goods_index'
        })
      }
    },
    go_wjdc() {
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        this.$router.push({
          path: 'questionsurvey'
        })
      }
    },
    gonext(){
      this.demo_index=1
    },
    go_jsf() {
      this.confirm_show = true;
      this.confirm_content = "即将上线，敬请期待";
      return;
      if (userProfile.isreg) {
        this.cannot_in();
      } else {
        gym.getGymHomeData(this.token, {
          villageid: userProfile.vid,  // 小区编号
          userid: userProfile.userid,  // 用户编号
          gymid: 1   // 健身房编号(健身房编号当前固定填1)
        }, (res) => {
          if (res.data.state === 0) { // 成功,'注意事项','人员状态','门禁编号'
            console.log('数据' + JSON.stringify(res))
            // 将返回的数据用一个变量存储起来
            let data = res.data.data
            let status = data.status  // -1:欠费(欠费界面),0:正常(健身房首页),1:在健身房中(enterGym),2:在健身房运动中
            this.saveValue("peopleStatus", status, 1)
            /*if(status === -1) { //欠费
              this.$router.push('/settlement')
            } else if(status === 0) { // 正常,进入健身房首页
              this.$router.push('/enterGym')
            } else if (status === 1) { // 在健身房中
              this.$router.push('/endGym')
            } else if (status === 2){ //在健身房运动中
              this.$router.push('/startGym')
            }*/

            // 开始时间
            this.saveValue("opentime_start", data.opentime_start, 1)
            // 结束时间
            this.saveValue("opentime_end", data.opentime_end, 1)
            // 当前人数
            this.saveValue("now_num", data.now_num, 1)
            // 费用
            this.saveValue("cost", data.cost, 1)
            // 注意事项
            this.saveValue("remark", data.remark, 1)
            // 门禁编号(存门禁编号)
            this.saveValue("doorid", data.doorid, 1)
            // 健身单价
            sessionStorage.setItem('chargeStandards', this.cost)
            this.$router.push({ path: 'fitnessRoom' })
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    go_door() {
      // this.$router.push({path:"open_door"})
      console.log(userProfile, 'userProfile')
      var that = this
      this.$http.post('http://tj.fm-community.com.cn/o2o/door/wexin/lookUpDoorAuth', {
        userid: userProfile.userid,
        villageid: userProfile.vid
      }).then(data => {
        console.log(data.body)
        if (data.body.state === 0) {
          that.doorlist = data.body.data
        } else {
          this.confirm_show = true;
          this.confirm_content = data.body.msg
        }
      })
      this.doorshow = !this.doorshow

    },
    go_hsyq() {
      window.location.href = service_url + ":8059/djApp/";
    },
    go_notice_detail() {
      this.$router.push({ path: 'notice_detail', query: { notice_id: this.notice_id } });
    },
    go_link(url, id) {
      if (service_url) {
        if (url) {
          this.$http.get(service_url + "/o2o/notice/wx/gclick?nid=" + id).then(data => {
            if (data.body.statusCode === "ok") {
              window.location.href = url;
            }
          })
        }

      } else {
        window.location.href = url;
      }
    },
  },
  mounted: function() {
    setTitle("首页");
    document.body.style.background = "#efeff4";
    this.user_in = userProfile.isreg;
    if (this.user_in) {
      this.city = sessionStorage.getItem("city");
      this.address = sessionStorage.getItem("address");
      this.vid = sessionStorage.getItem("vid");
    } else {
      this.vid = userProfile.vid;
    }
    if (service_url) {
      this.$http.get(service_url + "/o2o/notice/wx/newsIndex?ntype=2&sum=5&itemid=6").then((data) => {
        this.demo06_list = data.body.data;
      })
    } else {
      this.$http.get("/api/newsIndex").then((data) => {
        this.demo06_list = data.body.data.data;
      })
    }
    if (service_url) {
      this.$http.get(service_url + "/o2o/common/wx/getIndex?pageno=1&pagesize=10&token=" + userProfile.token + "&vid=" + this.vid).then((data) => {
        //        this.fresh_news=data.body.fresh_news[0];
        this.notice_url = data.body.fresh_news[0] ? data.body.fresh_news[0].detail_img[0] : "";
        this.notice_id = data.body.fresh_news[0] ? data.body.fresh_news[0].id : "";
        this.published_from = data.body.fresh_news[0] ? data.body.fresh_news[0].published_from : "";
        this.published_content = data.body.fresh_news[0] ? data.body.fresh_news[0].published_content : "";
      })
    } else {
      this.$http.get("/api/qj_index").then((data) => {
        console.log(data.body.data);
        this.notice_url = data.body.data.fresh_news[0].detail_img[0];
        this.notice_id = data.body.data.fresh_news[0].id;
        console.log(this.notice_url);
      })
    }
    document.getElementById("index_loading").style.display = "none";
  }
}
</script>

<style scoped>
/* 引入css样式 */


/*@import './gym/import/css/common.css';*/

@import './gym/import/css/diferPage.css';
@import '../../static/css/tj_common.css';
.finish-wrap {
  background-color: rgb(239, 239, 244);
  width: 100%;
}

/*新增便利店*/
#xjt_tj .boxwrap{
  display: flex;
  flex-wrap: nowrap;
}
#xjt_tj .boxwrap .flex{
  width:25%!important
}

img {
  width: 100%;
  padding: 0;
  margin: 0;
  vertical-align: top;
  border: none
}

.clear {
  clear: both;
  width: 100%;
  height: 0;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  height: 0;
  font-size: 0;
  content: "";
  clear: both;
}

.fl {
  float: left;
}

.fr {
  float: right;
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
#xjt_tj .weui-tabbar {
  padding: 0.18rem 0 0.1rem;
}

#xjt_tj .weui-tabbar__item {
  padding: 0!important;
}
</style>

