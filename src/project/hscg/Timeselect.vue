<template>
  <div>
    <div style="position:fixed;top:0;left:0;background:#fff;width:100%;height:100%;z-index:-1"></div>  
      <div>
        <div class="toptitle">选择场馆</div>
        <div class="tophead">
          <div class="headwrap">
            <div v-for="(item,index) in list" :key="index" :class="{headitem:true,'choosevs':index2===index}" @click="choosevenues(item,index)">
              <div class="item">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="toptitle">选择时间</div>
          <div class="centerwrap">
            <div :class="{centertop:true,'bgchoose':index1===index}" v-for="(week,index) in weeks" :key="index" @click="choosedate(index,week)">
              <p style="margin-bottom:0.194rem">{{week.name}}</p>
              <p>{{week.time}}</p>
              <div class="trgle" v-show="index1===index"></div>
            </div>
          </div>
          <div class="centermid">
              <!-- <div :class="{midmiddle:true,'selected':dateitem.selected,noselect:dateitem.nochoose}" v-for="dateitem in datelist" @click="choosetime(dateitem)"><span>{{dateitem.start_time}}</span>-<span>{{dateitem.end_time}}</span></div> -->
              <div :class="{midmiddle:true,'selected':dateitem.selected,noselect:dateitem.nochoose}" v-for="(dateitem,index) in datelist" :key="index" @click="choosetime(dateitem)">{{dateitem.section}}</div>
              
            </div>
      </div>
      <!-- <div class="bot">
        <div class="toptitle">预约信息</div>
        <group gutter='0'>
          <cell title="预约场馆" :value='venues'></cell>
          <cell title="预约时间" slot="default">
            <div v-for="timeitem in timelist">{{timeitem.title}}</div>
          </cell>
          <div></div>
        </group>
      </div>
      <div class="footer">
        <p>取消预订需至少提前2小时,否则照常收费或可能取消预订资格</p>
        <p>为了保障服务,相关不明事项请咨询服务台</p>
      </div> -->
      <div :class="{sendmsg:true,nomsg:timeids.length===0}" @click="nextdetail">下一步</div>
      <Alert v-model="confirm_show" title='提示'>{{content}}</Alert>
  </div>
</template>
<script>
import { setTitle } from "@/common/js/common";
import { Group, Cell, Alert } from "vux";
export default {
  data() {
    return {
      confirm_show: false,
      content: "",
      list: [
        // {
        //   id: 1,
        //   name: "棋牌室1"
        // },
        // {
        //   id: 2,
        //   name: "棋牌室2"
        // },
        // {
        //   id: 3,
        //   name: "棋牌室3"
        // },
        // {
        //   id: 4,
        //   name: "棋牌室4"
        // },
        // {
        //   name: "棋牌室1"
        // },
        // {
        //   name: "棋牌室1"
        // },
        // {
        //   name: "棋牌室1"
        // }
      ],
      weeks: [
        // {
        //   name: "今天",
        //   time: "12-23"
        // },
        // {
        //   name: "明天",
        //   time: "12-23"
        // },
        // {
        //   name: "周一",
        //   time: "12-23"
        // },
        // {
        //   name: "周二",
        //   time: "12-23"
        // },
        // {
        //   name: "周三",
        //   time: "12-23"
        // },
        // {
        //   name: "周二",
        //   time: "12-23"
        // },
        // {
        //   name: "周三",
        //   time: "12-23"
        // }
      ],
      datelist: [
        // {
        //   start_time: "09:00",
        //   end_time: "09:30",
        //   key: 9,
        //   status: 100,
        //   selected: false,
        //   section: "09:00-09:30"
        // },
        // {
        //   start_time: "09:30",
        //   end_time: "10:00",
        //   key: 10,
        //   status: 100,
        //   selected: false,
        //   section: "09:30-10:00"
        // },
        // // {
        // //   start_time: "09:30",
        // //   end_time: "10:00",
        // //   key: 11,
        // //   status: 100,
        // //   selected: false,
        // //   section: "09:30-10:00"
        // // },
        // {
        //   start_time: "10:00",
        //   end_time: "10:30",
        //   key: 12,
        //   nochoose: true,
        //   selected: false,
        //   status: 100,
        //   section: "10:00-10:30"
        // },
        // {
        //   start_time: "10:30",
        //   end_time: "11:00",
        //   key: 13,
        //   nochoose: true,
        //   selected: false,
        //   status: 100,
        //   section: "已预约"
        // },
        // {
        //   start_time: "11:00",
        //   end_time: "11:30",
        //   key: 14,
        //   selected: false,
        //   status: 100,
        //   section: "11:00-11:30"
        // },
        // {
        //   start_time: "11:30",
        //   end_time: "12:00",
        //   key: 15,
        //   status: 100,
        //   selected: false,
        //   section: "11:30-12:00"
        // },
        // {
        //   start_time: "12:00",
        //   end_time: "12:30",
        //   key: 16,
        //   selected: false,
        //   status: 100,
        //   section: "12:00-12:30"
        // },
        // {
        //   start_time: "12:30",
        //   end_time: "13:00",
        //   key: 17,
        //   status: 100,
        //   selected: false,
        //   section: "12:30-13:00"
        // },
        // {
        //   start_time: "13:00",
        //   end_time: "13:30",
        //   key: 18,
        //   selected: false,
        //   status: 100,
        //   section: "13:00-13:30"
        // },
        // {
        //   start_time: "13:30",
        //   end_time: "14:00",
        //   key: 19,
        //   selected: false,
        //   status: 100,
        //   section: "13:30-14:00"
        // },
        // {
        //   start_time: "14:00",
        //   end_time: "14:30",
        //   key: 20,
        //   selected: false,
        //   status: 100,
        //   section: "14:30-15:00"
        // },
        // {
        //   start_time: "15:00",
        //   end_time: "15:30",
        //   key: 21,
        //   selected: false,
        //   status: 100,
        //   section: "15:00-15:30"
        // },
        // {
        //   start_time: "15:30",
        //   end_time: "16:00",
        //   key: 22,
        //   selected: false,
        //   status: 100,
        //   section: "15:30-16:00"
        // },
        // {
        //   start_time: "16:00",
        //   end_time: "16:30",
        //   key: 23,
        //   selected: false,
        //   status: 100,
        //   section: "16:00-16:30"
        // },
        // {
        //   start_time: "16:30",
        //   end_time: "17:00",
        //   key: 24,
        //   selected: false,
        //   status: 100,
        //   section: "16:30-17:00"
        // },
        // {
        //   start_time: "17:00",
        //   end_time: "17:30",
        //   key: 25,
        //   selected: false,
        //   status: 100,
        //   section: "17:00-17:30"
        // },
        // {
        //   start_time: "17:30",
        //   end_time: "18:00",
        //   key: 26,
        //   selected: false,
        //   status: 100,
        //   section: "17:30-18:00"
        // }
      ],
      timelist: [],

      istrue: false,
      index1: 0,
      index2: 0, //选择的棋牌室index
      venues: "", //选择的棋牌室名
      appottime: "", //选择的时间
      chooseDate: "", //选择的日期
      singleTimelist: [], //单个时间数组
      projectId: "", //项目编号
      clubid: "", //会所编号
      siteId: "", //场馆编号
      timestring: "",
      titlename: "", //标题名称
      timeids: []
    };
  },
  mounted() {
    var that = this;
    this.index2 = 0;
    this.titlename = this.$route.query.titlename;
    var gh = this.$route.query.titlename + "预约";
    setTitle(gh);
    this.projectId = this.$route.query.projectId;
    this.clubid = this.$route.query.clubid;
    console.log(this.clubid, "clubid");
    console.log(this.projectId);
    this.$http
      .post(service_url + "/o2o-club-webAndroid/wx/getProjectToSite.do", {
        clubId: that.clubid,
        projectId: that.projectId
      })
      .then(res => {
        if (res.body.state == 0) {
          that.list = res.body.data;
          that.siteId = that.list[0].id;
          that.venues = that.list[0].name;
          //加的
          that.$http
            .post(
              service_url + "/o2o-club-webAndroid/wx/openSubscribeTime.do",
              {
                siteId: that.siteId,
                projectId: that.projectId
              }
            )
            .then(res => {
              if (res.body.state == 0) {
                that.weeks = res.body.data;
                that.chooseDate = that.weeks[0].time;

                //加的
                that.$http
                  .post(
                    service_url +
                      "/o2o-club-webAndroid/wx/getSiteOpenPeriod.do",
                    {
                      siteId: that.siteId,
                      chooseDate: that.chooseDate
                    }
                  )
                  .then(res => {
                    if (res.body.state == 0) {
                      var datas = res.body.data;
                      datas.map(val => {
                        val.start_time = val.section.split("-")[0];
                        val.end_time = val.section.split("-")[1];
                        val.id = val.key;
                        if (val.status == 100) {
                          val.selected = false;
                        } else if (val.status == 0) {
                          val.section = "已预约";
                          val.nochoose = true;
                          val.selected = false;
                        } else {
                          val.nochoose = true;
                          val.selected = false;
                        }
                      });
                      that.datelist = datas;
                    } else {
                      that.confirm_show = true;
                      that.content = res.body.msg;
                      
                    }
                  });
              } else {
                that.confirm_show = true;
                that.content = res.body.msg;
              }
            });
        } else {
          that.confirm_show = true;
          that.content = res.body.msg;
        }
      });
    // 获取星期
    // this.getweek();
    document.getElementById("index_loading").style.display = "none";
  },
  components: {
    Group,
    Cell,
    Alert
  },
  methods: {
    //选择棋牌室
    choosevenues(obj, index) {
      console.log(obj);
      var that = this;
      this.index2 = index;
      this.venues = obj.name;
      this.siteId = obj.id;
      this.$http
        .post(service_url + "/o2o-club-webAndroid/wx/openSubscribeTime.do", {
          siteId: that.siteId,
          projectId: that.projectId
        })
        .then(res => {
          if (res.body.state == 0) {
            that.weeks = res.body.data;
            that.chooseDate = that.weeks[0].time;

            //加的
            that.$http
              .post(
                service_url + "/o2o-club-webAndroid/wx/getSiteOpenPeriod.do",
                {
                  siteId: that.siteId,
                  chooseDate: that.chooseDate
                }
              )
              .then(res => {
                if (res.body.state == 0) {
                  var datas = res.body.data;
                  datas.map(val => {
                    val.start_time = val.section.split("-")[0];
                    val.end_time = val.section.split("-")[1];
                    val.id = val.key;
                    if (val.status == 100) {
                      val.selected = false;
                    } else if (val.status == 0) {
                      val.section = "已预约";
                      val.nochoose = true;
                      val.selected = false;
                    } else {
                      val.nochoose = true;
                      val.selected = false;
                    }
                  });
                  that.datelist = datas;
                } else {
                  that.datelist=[];
                  that.confirm_show = true;
                  that.content = res.body.msg;
                }
              });
          } else {
            that.weeks=[];
            that.confirm_show = true;
            that.content = res.body.msg;
            
          }
        });
    },
    //选择星期
    choosedate(index, week) {
      console.log(week);
      var that = this;
      this.index1 = index;
      this.chooseDate = week.time;

      this.$http
        .post(service_url + "/o2o-club-webAndroid/wx/getSiteOpenPeriod.do", {
          siteId: that.siteId,
          chooseDate: that.chooseDate
        })
        .then(res => {
          if (res.body.state == 0) {
            var datas = res.body.data;
            datas.map(val => {
              val.start_time = val.section.split("-")[0];
              val.end_time = val.section.split("-")[1];
              val.id = val.key;
              if (val.status == 100) {
                val.selected = false;
              } else if (val.status == 0) {
                val.section = "已预约";
                val.nochoose = true;
                val.selected = false;
              } else {
                val.nochoose = true;
                val.selected = false;
              }
            });
            that.datelist = datas;
          } else {
            that.datelist=[];
            that.confirm_show = true;
            that.content = res.body.msg;
          }
        });
    },
    // 下一步
    nextdetail() {
      if (this.timeids.length === 0) {
        return;
      } else {
        this.$router.push({
          path: "select_detail",
          query: {
            siteid: this.siteId,
            venues: this.venues,
            timestring: this.timestring,
            titlename: this.titlename
          }
        });
      }
    },
    //选择时间
    choosetime(obj) {
      var that = this;
      // console.log(obj);
      if (obj.nochoose) {
        return;
      }

      // console.log(obj1,'obj1')
      obj.selected = !obj.selected;
      var newlist = [];
      for (let i = 0; i < this.datelist.length; i++) {
        let obj = JSON.parse(JSON.stringify(this.datelist[i]));
        // obj.key=255
        newlist.push(obj);
      }
      var newtimelist = [];
      let timeid = [];
      // var newlist=this.datelist.concat()

      // newlist.map(function(val){
      //   val.key=3
      // })
      console.log(newlist, "newlist");
      this.datelist.map(val => {
        if (val.selected) {
          newlist.map(val2 => {
            if (val2.key == val.key) {
              newtimelist.push(val2);
              timeid.push(val.key);
            }
          });
        }
      });
      console.log(this.datelist);
      console.log(timeid, "timeids");
      that.timeids = timeid;
      console.log(that.timeids, "timeids");
      console.log(newtimelist, "newtime");

      var sorttime = this.timesort(newtimelist);
      console.log(sorttime, "sorttime");
      var mergetime = this.merge(sorttime);
      var firstdate = mergetime[0];
      console.log(that.chooseDate);
      var timeobj = {
        date: that.chooseDate,
        times: mergetime,
        timeid: timeid
      };
      that.timestring = JSON.stringify(timeobj);

      // console.log(mergetime, "mergetime");
    },
    //时间排列方法
    timesort(arr) {
      var arr2 = [];
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].key > arr[j].key) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
      arr2 = arr;
      return arr2;
    },
    //时间合并
    merge(arr) {
      var arr1 = [];
      for (var i = 0; i < arr.length - 1; i++) {
        var time = 0;
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].end_time == arr[j].start_time) {
            arr[i].end_time = arr[j].end_time;
            arr.splice(j, 1);
            console.log(arr, time++);
            this.merge(arr);
          }
        }
      }
      arr1 = arr;
      return arr1;
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
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.tophead {
  padding: 0.427rem 0.417rem;
  width: 100%;
  box-sizing: border-box;
}
.headwrap {
  display: -webkit-box;
  /* display: -webkit-flex; */
  /* display: flex; */
  flex-wrap: nowrap;
  overflow: scroll;
}
.headwrap .choosevs {
  background: #915baf;
  color: #fff;
}
.headitem {
  margin-right: 0.694rem;
  padding:0 0.2rem;
  height: 1.667rem;
  font-size: 0.333rem;
  background: #efeff4;
  border-radius: 5px;
}
.headitem .item {
  line-height: 1.667rem;
  text-align: center;
}
.headitem:last-child {
  margin-right: 0;
}

.middle {
  width: 100%;
}
.middle .centerwrap {
  display: -webkit-box;
  overflow-x: scroll;
  padding-bottom: 0.25rem;
}
.middle .centerwrap p {
  font-size: 0.333rem;
  color: #000;
}
.middle .centertop {
  text-align: center;
  width: 20%;
  padding: 0.25rem 0;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  /* z-index: -1 */
}
.middle .centertop .trgle {
  position: absolute;
  border: 0.168rem solid #915baf;
  /* border-right:transparent; */
  left: 50%;
  bottom: -0.168rem;
  transform: translateX(-50%) scaleX(0.9) rotate(45deg);
  z-index: 10;
}
.middle .bgchoose {
  background: #915baf;
}
.middle .bgchoose p {
  color: #fff;
}
.centermid {
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  margin: 0.417rem;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
}
.centermid .midmiddle {
  width: 25%;
  box-sizing: border-box;
  height: 1.458rem;
  text-align: center;
  line-height: 1.458rem;
  font-size: 0.333rem;
  color: #000;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.centermid .noselect {
  background: #e5e5e5;
  color: #888888;
}
.centermid .selected {
  background: #915baf;
  color: #fff;
}

.footer {
  padding: 0.258rem 0.417rem;
  color: #915baf;
  font-size: 0.361rem;
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
.nomsg {
  background: #888888;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

