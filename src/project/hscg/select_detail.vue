<template>
  <div>
      <div style="position:fixed;top:0;left:0;background:#fff;width:100%;height:100%;z-index:-1"></div>  
      <div class="bot">
        <div class="toptitle">预约信息</div>
        <group gutter='0'>
          <cell title="预约场馆" :value='venues'></cell>
          <cell title="预约时间" slot="default">
            <div v-for="timeitem in timelist">{{timeitem.title}}</div>
          </cell>
          <!-- <cell title="预计费用" :value='price'></cell> -->
          <div></div>
        </group>
      </div>
      <div>
          <div class="toptitle">选择你的会员卡</div>
          <swiper loop dots-position='center' :aspect-ratio="420/750" @on-index-change='cardchange' >
            <swiper-item v-for="(item, index) in card_list" :key="index">
                <!-- <img style="height:100%;width:100%;object-fit: cover;" :src="item.picture"> -->
                <div>
                    <div class='carditem'>
                        <div>
                            <p style="color:#fff;padding-top:0.6rem;padding-left:5.6rem;color:#E59123;font-size:0.48rem">{{item.card_type}}</p>
                            <p style="font-size:0.5rem;padding-top:0.547rem;padding-left:0.773rem;color:#fff"><span>{{item.titlename}}：</span><span>{{item.cost_extra}}</span></p>
                        </div>
                            <cell :title="item.card_item" style="font-size:0.32rem;width:7rem;color:#fff;padding-left:0.773rem;height:0.025rem"><img slot="icon" width="10" style="display:block;margin-right:5px;" src="./diamond.png"></cell>
                            <cell :title="avatime+item.card_validate" style="font-size:0.32rem;width:7rem;color:#fff;padding-left:0.773rem;height:0.025rem"><img slot="icon" width="10" style="display:block;margin-right:5px;" src="./time.png"></cell>
                    </div>
                </div>
            </swiper-item>
          </swiper>
      </div>
      <div class="footer">
          <check-icon :value.sync='select' type="plain" @click.native="radiosel"><span style="color:#915baf">我已阅读预定须知</span></check-icon>
         <p>取消预订需至少提前2小时,否则照常收费或可能取消预订资格</p>
         <p>为了保障服务,相关不明事项请咨询服务台</p>
      </div>
      <div class="sendmsg" @click="appoint">预约</div>
      <Alert v-model="confirm_show" title='提示'>{{content}}</Alert>
  </div>
</template>
<script>
import { setTitle } from "@/common/js/common";
import { Group, Cell, Swiper, SwiperItem, CheckIcon, Alert } from "vux";
export default {
  data() {
    return {
      avatime:'有效期至',
      confirm_show: false,
      content: "",
      venues: "",
      siteId: "",
      select: true,
      price: "240.00元",
      timelist: [],
      card_list: [
        // {
        //   card_item: "棋牌室",
        //   card_name: "个人年卡",
        //   card_no: "3453453",
        //   card_validate: "2019-01-18",
        //   card_id: 1235,
        //   card_type: "小时卡",
        //   titlename:'剩余金额',
        //   cost_extra: "3197.00元"
        // },
        // {
        //   card_item: "棋牌室",
        //   card_name: "个人年卡",
        //   card_no: "3453453",
        //   card_validate: "2019-01-18",
        //   card_id: 1235,
        //   card_type: 3,
        //   cost_extra: "3197.00元"
        // },
        // {
        //   card_item: "棋牌室",
        //   card_name: "个人年卡",
        //   card_no: "3453453",
        //   card_validate: "2019-01-18",
        //   card_id: 1235,
        //   card_type: 3,
        //   cost_extra: "3197.00元"
        // }
      ],
      // cardtime: "", //剩余时长
      // titlename:'',//名称
      timeId: [],
      card_id: "", //卡Id
      choosetime: "",
      titlename:'',//标题名称
    };
  },
  components: {
    Group,
    Cell,
    Swiper,
    SwiperItem,
    CheckIcon,
    Alert
  },
  mounted() {
    var that = this;
    this.titlename=this.$route.query.titlename
    var gh=this.$route.query.titlename+'预约'
    setTitle(gh);
    this.venues = this.$route.query.venues;
    this.siteId = this.$route.query.siteid;
    var timestring = this.$route.query.timestring;
    var timearr = JSON.parse(timestring);
    this.timeId = timearr.timeid;
    console.log(timearr, "timearr");
    var objone = {};
    objone.title =
      timearr.date +
      " " +
      timearr.times[0].start_time +
      "~" +
      timearr.times[0].end_time;
    console.log(objone, "objone");
    this.timelist.push(objone);
    console.log(this.timelist);
    for (let i = 1; i < timearr.times.length; i++) {
      let obj2 = {};
      obj2.title =
        timearr.times[i].start_time + "~" + timearr.times[i].end_time;
      this.timelist.push(obj2);
      console.log(this.timelist);
    }
    var date = new Date();
    var year = date.getFullYear();
    var choosetime = timearr.date;
    this.choosetime = choosetime;
    console.log(choosetime);
    this.$http
      .post(service_url + "/o2o-club-webAndroid/wx/preUseCard", {
        "choose_key": that.siteId,
        choose_date: choosetime
      })
      .then(res => {
        if (res.body.status == 0) {
          that.card_list = res.body.data;
          that.card_list.map(val => {
            if (val.card_type == 1) {
              val.card_type = "次卡";
              val.titlename='剩余次数'
              val.cost_extra=val.cost_extra
            } else if (val.card_type == 2) {
              val.card_type = "小时卡";
              val.titlename='剩余小时数'
              val.cost_extra=val.cost_extra
            } else if (val.card_type == 3) {
              val.card_type = "折扣卡";
            } else if (val.card_type == 4) {
              val.card_type = "金额卡";
              val.titlename='剩余金额'
              val.cost_extra=val.cost_extra
            }
          });
          that.card_id = that.card_list[0].card_id;
        } else {
          that.confirm_show = true;
          that.content = res.body.error_reason;
        }
      });

    document.getElementById("index_loading").style.display = "none";
  },
  methods: {
    cardchange(val) {
      this.card_id = this.card_list[val].card_id;
      console.log(this.card_id);
    },
    appoint() {
      if(this.select===false){
        this.content='请勾选我已阅读预定须知'
        this.confirm_show=true
        return
      }
      var that = this;
      this.$http
        .post(service_url + "/o2o-club-webAndroid/wx/preSave", {
          area_id: that.siteId,
          card_id: that.card_id,
          cost_date: that.choosetime,
          cost_time: that.timeId
        })
        .then(res => {
          if (res.body.status == 0) {
            that.$router.push({path: 'reserve_success', query: {route_type: 1}});
          } else {
            that.confirm_show = true;
            that.content = res.body.error_reason;
          }
        });
    },
    radiosel() {
      console.log(this.select);
    }
  }
};
</script>
<style scoped>
.toptitle {
  color: #888888;
  line-height: 1.181rem;
  padding-left: 0.417rem;
  background: #fff;
}
.footer {
  padding: 0.258rem 0.417rem;
  color: #915baf;
  font-size: 0.361rem;
}
.weui-cell:before {
  left: 0;
}
.carditem {
  width: 8.333rem;
  margin: 0.4rem auto;
  background: #f00;
  height: 300px;
  background: url("./card.png") no-repeat 0 0;
  background-size: 100% auto;
}
.sendmsg {
  width: 9.167rem;
  margin: 0 auto;
  text-align: center;
  line-height: 1.222rem;
  background: #915baf;
  border-radius: 5px;
  font-size: 0.5rem;
  color: #fff;
  margin-top: 0.575rem;
  margin-bottom: 0.722rem;
}
</style>


