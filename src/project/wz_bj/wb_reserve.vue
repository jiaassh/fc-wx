<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center;"></loading>-->
    <loading v-model="isLoading" :text="alert_text"></loading>
    <div>
      <group gutter="0">
        <div style="padding:0.413rem 0 0.267rem 0.413rem;font-size:0.32rem;color:#888;background:#efeff4;">预约信息</div>
        <x-input style="font-size:0.427rem" v-if="wb_type!==2" labelWidth="5em" title="姓名" placeholder="请输入姓名" v-model="user_name" :show-clear="false" disabled></x-input>
        <x-input style="font-size:0.427rem" v-if="wb_type===2" labelWidth="5em" title="姓名" placeholder="请输入姓名" v-model="user_name" :show-clear="false" disabled></x-input>
        <x-input style="font-size:0.427rem" v-if="wb_type!==2" labelWidth="5em" title="性别" v-model="sex" :show-clear="false" disabled></x-input>
        <x-input style="font-size:0.427rem" v-if="wb_type===2" labelWidth="5em" title="性别" v-model="sex" :show-clear="false" disabled></x-input>
      <!--  <div style="display:flex;align-items: center;padding:5px 10px 5px 0;margin-left:15px;border-top:1px solid #ececec;">
          <div style="width:5em">性别</div>
          <checker
            v-model="sex"
            default-item-class="demo5-item"
            selected-item-class="demo5-item-selected"
          >
            <checker-item v-show="sex==item.name" style="font-size:14px;" v-for="item in models" :key="item.name" :value="item.name" @on-item-click="itemclick" disabled>{{item.name}}</checker-item>
          </checker>
        </div>-->
          <!--<checker v-model="sex"
                   default-item-class="demo4-item"
                   selected-item-class="demo4-item-selected"
                   disabled-item-class="demo4-item-disabled">
            <checker-item  v-for="item in models" style="margin-bottom: 5px;" :key="item.name" :value="item.name" @on-item-click="itemclick" disabled>{{item.name}}</checker-item>
          </checker>-->

        <x-input style="font-size:0.427rem"  v-if="wb_type!==2" title="手机" labelWidth="5em" placeholder="请输入手机号" v-model="user_tel" :show-clear="false"></x-input>
        <!-- <x-input type="tel" v-if="route_type===1&&wb_type!==2" :title="price_title" labelWidth="5em" placeholder="请输入数量" v-model="area" :show-clear="false" @input.native="change"></x-input> -->
        <x-input style="font-size:0.427rem" type="tel" v-if="route_type===1&&wb_type!==2" :title="price_title" labelWidth="5em" placeholder="请输入数量" v-model="area" :show-clear="false" @on-change="change($event)"></x-input>
        <x-input  style="font-size:0.427rem" type="tel" v-if="route_type===1&&wb_type===2" :title="price_title" labelWidth="5em" v-model="area" :show-clear="false" disabled></x-input>
        <!--<x-number v-if="route_type===1" align="left" title="<p style='width:5em'>面积(平米)</p>" v-model="area" button-style="round" width="70px" :min="0" fillable @on-change="change"></x-number>-->
        <x-input style="font-size:0.427rem" v-if="route_type===1" title="总价(元)" labelWidth="5em" v-model="total_price" :show-clear="false" disabled></x-input>
        <x-textarea style="font-size:0.427rem;background:#fff" v-if="wb_type!==2" title="详细地址"  :show-counter="false" :rows="3" v-model="user_address" autosize disabled></x-textarea>
        <!--<x-textarea v-if="wb_type===2" title="详细地址" :show-counter="false" :rows="3" v-model="user_address" autosize readonly></x-textarea>-->

        <div v-if="wb_type===2" style="padding:10px 15px 10px 0;display:flex;font-size:0.427rem;margin-left:15px;border-top:1px solid #ececec;">
          <div style="font-size:0.427rem"><label style="width: 5em;display: block;">详细地址</label></div>
          <span style="font-size:0.427rem">{{user_address}}</span>
        </div>
        <!-- <group :title="xiangximiaoshu" label-align='left' line-height:2rem> -->
          <div style="padding:0.413rem 0 0.267rem 0.413rem;font-size:0.32rem;color:#888;background:#efeff4;" v-if="wb_type!==2">详细描述</div>
           <x-textarea v-if="wb_type!==2" placeholder="请输入" :show-counter="false" :rows="3" v-model="content" autosize></x-textarea>
        <!-- </group> -->

        <!--<x-textarea v-if="wb_type===2" title="详细描述" placeholder="请输入" :show-counter="false" :rows="3" v-model="content" autosize readonly></x-textarea>-->
        <div v-if="wb_type===2" style="padding:10px 15px 10px 0;display:flex;border-top:1px solid #ececec;margin-left:15px;">
          <div><label style="width: 5em;display: block;">详细描述</label></div>
          <span style="font-size:0.427rem">{{content}}</span>
        </div>
        <div v-if="wb_type!==2">
          <div style="padding:0.413rem 0 0.267rem 0.413rem;font-size:0.32rem;color:#888;background:#efeff4">预约时间</div>
          <div style="display:flex;justify-content:space-around;padding-top:0.278rem" id="selectbsbx">
            <datetime :class="{color:colortoday}" style="width:2.778rem;box-sizing:border-box;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0.213rem 0.387rem;font-size:0.373rem" :start-date="startDate" format="HH:mm" @on-change="setBegin1" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消">{{jinshi}}<span style="display:block;font-size:0.32rem">{{jintian}}</span> </datetime>
            <datetime :class="{color:tomorrow}" style="width:2.778rem;box-sizing:border-box;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0.213rem 0.387rem;font-size:0.373rem" :start-date="startDate" format="HH:mm" @on-change="setBegin2" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消">{{mingshi}}<span style="display:block;font-size:0.32rem">{{mintian}}</span></datetime>
            <datetime :class="{color:selectday}" style="width:2.778rem;box-sizing:border-box;;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0.213rem 0.387rem;font-size:0.373rem" :start-date="startDate" format="YYYY-MM-DD HH:mm" @on-change="setBegin" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"><span v-show="selectday">{{selecttime}}</span><span v-show="selectday" style="display:block;;font-size:0.32rem">{{shijianselect}}</span><img v-show="!selectday" src="./riqi.png" style="width:50%;margin-top:-0.09rem"></datetime>
          </div>
          <div style="margin-left:0.385rem;line-height:1.055rem;color:#888888;font-size:0.373rem">已选择<span v-text="timeshow" style="font-size:0.373rem"></span></div>


          <!-- <div @click="bianse(1)" :class="{'jintian':jintian}" id='jintian' style="width:2.72rem;height:1.33rem;border-radius:0.2rem;background:#f2f2f2">
            <p style="line-height:0.6rem;font-size:0.5rem;text-align:center;margin-top:0.1rem;color:#b8b8b8">今天</p><p style="line-height:0.6rem;text-align:center;color:#b8b8b8;font-size:0.4rem">{{today}}</p>
            <datetime format="YYYY-MM-DD HH:mm"></datetime>
          </div>
          <div @click="bianse(2)" :class="{'mintian':mintian}"  style="width:2.72rem;height:1.33rem;border-radius:0.2rem;background:#f2f2f2">
            <p style="line-height:0.6rem;font-size:0.5rem;text-align:center;margin-top:0.1rem;color:#b8b8b8">明天</p><p style="line-height:0.6rem;text-align:center;color:#b8b8b8;font-size:0.4rem">{{afterday}}</p>
          </div>
          <div @click="bianse(3)" style="width:2.72rem;height:1.33rem;border-radius:0.2rem;background:#f2f2f2" :class="{'showtime':sishow}">
               <datetime v-if="wb_type!==2" :start-date="startDate" format="YYYY-MM-DD HH:mm" @on-change="setBegin" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消">
                 <x-button style="border:0;width:3rem;height:2rem" :class="{'sjan':istrue,'shijian':!istrue}"><p v-if='!istrue' style="line-height:0.6rem;font-size:0.5rem;margin-top:0.1rem;color:#b8b8b8;">{{year}}</p><p v-if='!istrue' style="line-height:0.6rem;color:#b8b8b8;width:1rem;font-size:0.4rem">{{yueri}}</p></x-button>
               </datetime>
          </div> -->


        </div>


        <!-- </div> -->
        <!-- <cell v-if="wb_type===2" title="期望时间" :value="wishdate"></cell> -->
        <!-- <datetime v-if="wb_type!==2" v-model="wishdate" :start-date="startDate" format="YYYY-MM-DD HH:mm" @on-change="setBegin" title="期望时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消" style="width:20%"></datetime>
        <cell v-if="wb_type===2" title="期望时间" :value="wishdate"></cell> -->
      </group>
      <div v-if="wb_type===2&&state!==0">
        <timeline>
          <timeline-item :key="item" v-for = "item in times_list">
            <h3 style="font-size:16px;font-weight:bold">{{item.title}}</h3>
            <p>进度状态：{{item.project_state}}</p>
            <p>责任人：{{item.leader}}</p>
            <p>时间：{{item.lastUpdateTime}}</p>
          </timeline-item>
        </timeline>
      </div>
      <div v-if="wb_type===2&&state===0" style="padding:20px 10px"><x-button  type="primary" class="zj_button" @click.native="cancel_reserve">取消预订</x-button></div>
      <div v-if="wb_type===1" style="padding:20px 10px"><x-button type="primary" class="zj_button" @click.native="save_msg">提交</x-button></div>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="提示"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{confirm_text}}</p>
      </confirm>
    </div>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
import { setTitle } from "@/common/js/common";
import {
  XInput,
  Group,
  Cell,
  Checker,
  CheckerItem,
  XTextarea,
  Datetime,
  XButton,
  Timeline,
  TimelineItem,
  Loading,
  Alert,
  XNumber,
  Toast,
  Confirm,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  data() {
    return {
      // istrue:true,
      // today:'',
      // afterday:'',
      // jintian:false,
      // mintian:false,
      // sishow:false,
      // year:'',
      // yueri:'',
      times_list:[],
      jinshi: "今天",
      jintian: "",
      mingshi: "明天",
      mintian: "",
      timeshow: "",
      colortoday: false,
      tomorrow: false,
      selectday: false,
      selecttime: "",
      shijianselect: "",
      // xiangximiaoshu:'详细描述',

      user_name: "",
      user_tel: "",
      user_address: "",
      xgh: "点",
      models: [
        {
          name: "男"
        },
        {
          name: "女"
        }
      ],
      sex: "",
      content: "",
      wishdate: "",
      date_mark: 1,
      route_type: 0, //1保洁 2微装
      wb_type: 0, //1预订，2详细
      order_id: 0, //订单id
      time_line: [],
      id: "",
      state: -1,
      this_title: "",
      startDate: "",
      endDate: "",
      isLoading: false,
      alert_text: "",
      confirm_show: false,
      dialog_title: "",
      confirm_content: "",
      area: "",
      show_toast: false,
      toast_text: "",
      confirm_text: "",
      show: false,
      total_price: 0,
      unitprice: 0,
      price_title: ""
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Group,
    Cell,
    Checker,
    CheckerItem,
    XTextarea,
    Datetime,
    XButton,
    Timeline,
    TimelineItem,
    Loading,
    Alert,
    XNumber,
    Toast,
    Confirm
  },
  mounted() {
    var sj = new Date();
    console.log(sj);
    var timemi = sj.getTime();
    var monthtoday = sj.getMonth() + 1;
    var datetoday = sj.getDate();
    if (datetoday < 10) {
      datetoday = "0" + datetoday;
    }
    this.jintian = monthtoday + "-" + datetoday;
    var newtimemi = timemi + 24 * 3600 * 1000;
    var newsj = new Date(newtimemi);
    console.log(newsj);
    var monthtorrow = newsj.getMonth() + 1;
    var datetomorrow = newsj.getDate();
    if (datetomorrow < 10) {
      datetomorrow = "0" + datetomorrow;
    }
    this.mintian = monthtorrow + "-" + datetomorrow;

    Date.prototype.format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
    var self = this;
    var oDate = new Date();
    //加的
    // var toMonth=oDate.getMonth()+1
    // var jintian=oDate.getDate()
    // this.today=toMonth+'-'+jintian
    // var shijianchuo=oDate.getTime()
    // var newshijianchuo=shijianchuo+60*60*24*1000;
    // var date1=new Date(newshijianchuo)
    // // date1.setTime(newshijianchuo)
    // var newMonth=date1.getMonth()+1;
    // var newDayte=date1.getDate()
    // this.afterday=newMonth+'-'+newDayte

    //
    this.startDate = oDate.format("yyyy-MM-dd hh:mm");
    oDate.setMinutes(oDate.getMinutes() + 15);
    //      oDate.setMinutes(oDate.getMinutes()+15);
    /*if(oDate.getMinutes()<10){
        this.wishdate = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate()+" "+oDate.getHours()+":0"+oDate.getMinutes();
      }else{
        this.wishdate = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate()+" "+oDate.getHours()+":"+oDate.getMinutes();
      }*/
    this.wishdate = oDate.format("yyyy-MM-dd hh:mm");
    this.route_type = parseInt(this.$route.query.route_type);
    this.wb_type = parseInt(this.$route.query.wb_type);
    if (service_url) {
      if (this.wb_type === 1) {
        this.id = parseInt(this.$route.query.id);
        this.this_title = "预约服务";
        setTitle("预约服务");
        if (this.route_type === 1) {
          this.$http
            .get(service_url + "/o2o/hk/wx/userinfo?id=" + this.id)
            .then(data => {
              self.user_name = data.body.data.name;
              self.user_tel = data.body.data.tel;
              self.user_address = data.body.data.address;
              self.unitprice = data.body.data.unitprice;
              self.price_title =
                "数量(" + data.body.data.calunit.substring(2) + ")";
              let sex = parseInt(data.body.data.sex);
              self.sex = sex ? "女" : "男";
              //              self.sex = data.body.data.sex;
              //                self.time_line = data.body.data.time_line;
            });
        } else {
          this.$http
            .get(service_url + "/o2o/reno/wx/userinfo?id=" + this.id)
            .then(data => {
              self.user_name = data.body.data.name;
              self.user_tel = data.body.data.tel;
              self.user_address = data.body.data.address;
              let sex = parseInt(data.body.data.sex);
              self.sex = sex ? "女" : "男";
              //              self.sex = data.body.data.sex;
              //                self.time_line = data.body.data.time_line;
            });
        }
      } else {
        this.order_id = parseInt(this.$route.query.order_id);
        this.this_title = "预约详情";
        setTitle("预约详情");
        if (this.route_type === 1) {
          this.$http
            .get(service_url + "/o2o/hk/wx/orderdetails?id=" + this.order_id)
            .then(data => {
              self.user_name = data.body.data.user_name;
              self.user_tel = data.body.data.user_tel;
              self.user_address = data.body.data.user_address;
              self.total_price = data.body.data.price;
              let sex = parseInt(data.body.data.sex);
              self.price_title =
                "数量(" + data.body.data.calunit.substring(2) + ")";
              self.sex = sex ? "女" : "男";
              self.time_line = data.body.data.time_line.map(e => {
                if (e.status == 0) {
                  e.project_state = "待处理";
                } else if (e.status == 1) {
                  e.project_state = "处理中";
                } else if (e.status == 2) {
                  e.project_state = "已完成";
                }
                return e;
              });
              self.times_list=self.time_line.reverse();
              self.content = data.body.data.content;
              self.area = data.body.data.number;
              self.wishdate = data.body.data.hope_reserve;
              self.state = data.body.data.state;
              self.loading = false;
            });
        } else {
          this.$http
            .get(service_url + "/o2o/reno/wx/orderdetails?id=" + this.order_id)
            .then(data => {
              self.user_name = data.body.data.user_name;
              self.user_tel = data.body.data.user_tel;
              self.user_address = data.body.data.user_address;
              let sex = parseInt(data.body.data.sex);
              self.sex = sex ? "女" : "男";
              self.time_line = data.body.data.time_line.map(e => {
                if (e.status == 0) {
                  e.project_state = "待处理";
                } else if (e.status == 1) {
                  e.project_state = "处理中";
                } else if (e.status == 2) {
                  e.project_state = "已完成";
                }
                return e;
              });
              self.times_list=self.time_line.reverse();
              self.content = data.body.data.content;
              self.wishdate = data.body.data.hope_reserve;
              self.state = data.body.data.state;
              self.loading = false;
            });
        }
      }
    } else {
      this.$http.get("/api/wb_reserve").then(data => {
        self.user_name = data.body.data.data.name;
        self.user_tel = data.body.data.data.tel;
        self.unitprice = data.body.data.data.unitprice;
        self.user_address = data.body.data.data.address;
        self.sex = data.body.data.data.sex;
        self.content = data.body.data.data.content;
        //          self.wishdate = data.body.data.data.hope_reserve;
        self.time_line = data.body.data.data.time_line.map(e => {
          if (e.status == 0) {
            e.project_state = "待处理";
          } else if (e.status == 1) {
            e.project_state = "处理中";
          } else if (e.status == 2) {
            e.project_state = "已完成";
          }
          return e;
        });
        self.times_list=self.time_line.reverse();
        self.total_price = data.body.data.data.price;
        self.area = data.body.data.data.number;
        self.price_title =
          "数量(" + data.body.data.data.calunit.substring(2) + ")";
        self.loading = false;
      });
    }
    document.getElementById("index_loading").style.display = "none";

    // self.times_list=self.time_line.reverse();
    // self.time_line.forEach(e => {
    //   if (e.status == 0) {
    //     e.status = "待处理";
    //   } else if (e.status == 1) {
    //     e.status = "处理中";
    //   } else if (e.status == 2) {
    //     e.status = "已完成";
    //   }
    // });
  },
  methods: {
    bianse(index) {
      if (index == 1) {
        this.jintian = true;
        this.mintian = false;
        this.sishow = false;
        this.istrue = true;
      } else if (index == 2) {
        this.mintian = true;
        this.jintian = false;
        this.sishow = false;
        this.istrue = true;
      }
    },

    getLocalTime1(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17);
    },
    //       setBegin(value){
    //          this.jintian=false
    //         this.mintian=false
    //         this.sishow=true

    //         let owishdate = this.getownTime(value);
    //         if(owishdate <= Date.parse(new Date())){
    //           this.dialog_title="提示";
    //           this.confirm_content="开始时间应该大于当前时间";
    //           this.confirm_show=true;
    //           this.date_mark=0;
    //         }else{
    //           let timestamp2 = Date.parse(new Date(value));
    //           timestamp2=timestamp2/1000;
    // //          this.wishdate=timestamp2;
    //           this.date_mark=1;

    //           this.owishdate=owishdate;
    //           var date=new Date(this.owishdate)
    //           var yue= date.getMonth()+1
    //           var ri=date.getDate()
    //           this.year=date.getFullYear()
    //           this.yueri=yue+'-'+ri
    //           this.istrue=false
    //         }

    //       },

    //新的
    setBegin(value) {
      console.log(value);
      this.timeshow = value;
      this.selectday = true;
      this.tomorrow = false;
      this.colortoday = false;
      let owishdate = this.getownTime(value);
      let date = new Date(owishdate);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.selecttime = year + "年";
      this.shijianselect = month + "-" + day;

      console.log(owishdate, "owishdate");
      if (owishdate < Date.parse(new Date()) - 60 * 1000) {
        this.dialog_title = "提示";
        this.confirm_content = "开始时间应该大于当前时间";
        this.confirm_show = true;
        this.date_mark = 0;
      } else {
        let timestamp2 = Date.parse(new Date(value));
        timestamp2 = timestamp2 / 1000;
        this.date_mark = 1;
        this.owishdate = owishdate;
      }
    },
    setBegin1(value) {
      this.selectday = false;
      this.tomorrow = false;
      this.colortoday = true;
      console.log(value);
      var sj = new Date();
      var timemi = sj.getTime();
      var year = sj.getFullYear();
      var monthtoday = sj.getMonth() + 1;
      var datetoday = sj.getDate();
      if (datetoday < 10) {
        datetoday = "0" + datetoday;
      }
      value = year + "-" + monthtoday + "-" + datetoday + " " + value;
      this.timeshow = value;

      let owishdate = this.getownTime(value);
      console.log(owishdate, "owishdate");
      if (owishdate < Date.parse(new Date()) - 60 * 1000) {
        this.dialog_title = "提示";
        this.confirm_content = "开始时间应该大于当前时间";
        this.confirm_show = true;
        this.date_mark = 0;
      } else {
        let timestamp2 = Date.parse(new Date(value));
        timestamp2 = timestamp2 / 1000;
        this.date_mark = 1;
        this.owishdate = owishdate;
      }
    },
    setBegin2(value) {
      this.colortoday = false;
      this.selectday = false;
      this.tomorrow = true;
      console.log(value);
      var sj = new Date();
      console.log(sj);
      var timemi = sj.getTime();
      var newtimemi = timemi + 24 * 3600 * 1000;
      var newsj = new Date(newtimemi);
      var year = sj.getFullYear();
      console.log(newsj);
      var monthtorrow = newsj.getMonth() + 1;
      var datetomorrow = newsj.getDate();
      if (datetomorrow < 10) {
        datetomorrow = "0" + datetomorrow;
      }
      value = year + "-" + monthtorrow + "-" + datetomorrow + " " + value;
      this.timeshow = value;
      let owishdate = this.getownTime(value);
      console.log(owishdate, "owishdate");
      if (owishdate < Date.parse(new Date()) - 60 * 1000) {
        this.dialog_title = "提示";
        this.confirm_content = "开始时间应该大于当前时间";
        this.confirm_show = true;
        this.date_mark = 0;
      } else {
        let timestamp2 = Date.parse(new Date(value));
        timestamp2 = timestamp2 / 1000;
        this.date_mark = 1;
        this.owishdate = owishdate;
      }
    },
    getownTime(time) {
      var arr = time.split(/[- :]/);

      return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]).getTime();
    },
    itemclick() {},
    save_msg() {
      console.log(this.wishdate, "wishdate");
      if (this.route_type == 1 && !this.area) {
        this.dialog_title = "提示";
        this.confirm_content = "需要填写数量信息";
        this.confirm_show = true;
        return;
      }
      // if(!this.wishdate){
      //   this.dialog_title="提示";
      //   this.confirm_content="需要填写期望时间";
      //   this.confirm_show=true;
      //   return;
      // }
      if (!this.date_mark) {
        this.dialog_title = "提示";
        this.confirm_content = "请正确选择期望时间";
        this.confirm_show = true;
        return;
      }
      // this.isLoading=true;
      // this.alert_text="保存中";
      if (this.timeshow) {
        this.wishdate = this.timeshow;
      } else {
        this.dialog_title = "提示";
        this.confirm_content = "需要填写期望时间";
        this.confirm_show = true;
        return;
      }
      this.isLoading = true;
      this.alert_text = "保存中";
      const item = {
        name: this.user_name,
        sex: this.sex,
        tel: this.user_tel,
        address: this.user_address,
        id: this.id,
        content: this.content,
        hope_reserve: this.wishdate
      };
      const item2 = {
        name: this.user_name,
        sex: this.sex,
        tel: this.user_tel,
        address: this.user_address,
        id: this.id,
        content: this.content,
        hope_reserve: this.wishdate,
        number: this.area,
        total_price: this.total_price
      };
      if (service_url) {
        if (this.route_type === 1) {
          this.$http.post(service_url + "/o2o/hk/wx/save", item2).then(data => {
            this.isLoading = false;
            if (data.body.status === 0) {
              this.show_toast = true;
              this.toast_text = "保存成功";
              setTimeout(this.go_next, 1000);
              /*this.$router.push({
                   path:"reserve_success",query:{
                   route_type:9,type:1
                   }
                   })*/
            } else {
              this.dialog_title = "提示";
              this.confirm_content = data.body.error_reason;
              this.confirm_show = true;
            }
          });
        } else {
          this.$http
            .post(service_url + "/o2o/reno/wx/save", item)
            .then(data => {
              this.isLoading = false;
              if (data.body.status === 0) {
                this.show_toast = true;
                this.toast_text = "保存成功";
                setTimeout(this.go_next, 1000);
                /*this.$router.push({
                   path:"reserve_success",query:{
                   route_type:9,type:2
                   }
                   })*/
              } else {
                this.dialog_title = "提示";
                this.confirm_content = data.body.error_reason;
                this.confirm_show = true;
              }
            });
        }
      } else {
        this.isLoading = false;
        this.show_toast = true;
        this.toast_text = "保存成功";
        setTimeout(this.go_next, 1000);
      }
    },
    go_next() {
      if (this.route_type === 1) {
        this.$router.push({ path: "common_order/2" });
      } else if (this.route_type === 2) {
        this.$router.push({ path: "common_order/1" });
      }
    },
    cancel_reserve() {
      this.show = true;
      this.confirm_text = "是否取消预约？";
    },
    onConfirm() {
      this.isLoading = true;
      this.alert_text = "取消中";
      let get_url;
      if (this.route_type === 1) {
        get_url = service_url + "/o2o/hk/wx/cancel?id=" + this.order_id;
      } else {
        get_url = service_url + "/o2o/reno/wx/cancel?id=" + this.order_id;
      }
      if (service_url) {
        this.$http.get(get_url).then(data => {
          this.isLoading = false;
          if (data.body.status === 0) {
            this.show_toast = true;
            this.toast_text = "取消预约成功";
            setTimeout(this.go_back, 1000);
            //            self.$router.push({path:'/reserve_success',query:{route_type:10,type:type}});
          } else {
            this.confirm_show = true;
            this.confirm_content = data.body.error_reason;
          }
        });
      } else {
        this.isLoading = false;
        this.show_toast = true;
        this.toast_text = "取消预约成功";
        setTimeout(this.go_back, 1000);
      }
    },
    go_back() {
      this.$router.go(-1);
    },
    change(value) {
      //加的
      var singprice = value * 1;
      // this.total_price=this.area*this.unitprice;
      this.total_price = singprice * this.unitprice;
      console.log(this.total_price);
    }
  }
};
</script>
<style>
.vux-x-input.disabled {
  color: rgba(0, 0, 0, 1) !important;
  -webkit-opacity: 1;
  opacity: 1;
}
.vux-x-input.disabled .weui-input {
  -webkit-opacity: 1;
  opacity: 1;
}
.vux-timeline {
  padding: 0.5rem;
}
.vux-timeline-item-content {
  padding: 0 0 0.5rem 0.6rem;
}
#selectbsbx .weui-cell_access .weui-cell__ft:after {
  content: none !important;
  display: none;
  border-style: none !important;
}
#selectbsbx a {
  text-align: center;
  display: inline-block;
  color: #c2c2c2;
  font-size: 0.36rem;
}
#selectbsbx .color {
  text-align: center;
  display: inline-block;
  background: #915baf !important;
  font-size: 0.36rem;
  color: #fff;
}
</style>
<style scoped>
.demo5-item {
  border: 1px solid #ad7de7;
  border-radius: 5px;
  padding: 2px 15px;
  margin: 5px;
}
.demo5-item-selected {
  /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
  color: white;
  background-color: #ad7de7;
}

/* .sjan{background:url(./riqi.png) no-repeat center center;background-size:0.9rem 0.9rem;top:-0.6rem;}
  .sjan:after{border:0}
  .shijian{top:-0.6rem}
  .shijian:after{border:0}
.jintian,.mintian,.showtime{background:#ad7de7!important;overflow:hidden}
  .showtime button{background:#ad7de7!important}
   #jintian .weui-cell{display:none} */
</style>
<style>
textarea:disabled {
  background: #fff !important;
}
</style>
