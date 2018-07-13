<template>
  <div>
    <div style="position:fixed;top:0;left:0;background:#fff;width:100%;height:100%;z-index:-1"></div>  
      <div>
        <div class="toptitle">选择场馆</div>
        <div class="tophead">
          <div class="headwrap">
            <div v-for="(item,index) in list" :class="{headitem:true,'choosevs':index2==index}" @click="choosevenues(item,index)">
              <div class="item">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="toptitle">选择时间</div>
          <div class="centerwrap">
            <div :class="{centertop:true,'bgchoose':index1==index}" v-for="(week,index) in weeks" @click="choosedate(index,week)">
              <p style="margin-bottom:0.194rem">{{week.week}}</p>
              <p>{{week.date}}</p>
              <div class="trgle" v-show="index1==index"></div>
            </div>
          </div>
          <div class="centermid">
              <div :class="{midmiddle:true,'selected':dateitem.selected,noselect:dateitem.nochoose}" v-for="dateitem in datelist" @click="choosetime(dateitem)">{{dateitem.date}}</div>
            </div>
      </div>
      <div class="bot">
        <div class="toptitle">预约信息</div>
        <group gutter='0'>
          <cell title="预约场馆" :value='venues'></cell>
          <cell title="预约时间" :value='appottime'></cell>
        </group>
      </div>
      <div class="footer">
        <p>取消预订需至少提前2小时,否则照常收费或可能取消预订资格</p>
        <p>为了保障服务,相关不明事项请咨询服务台</p>
      </div>
      <div class="sendmsg">提交</div>
  </div>
</template>
<script>
import { setTitle } from "@/common/js/common";
import { Group, Cell } from "vux";
export default {
  data() {
    return {
      list: [
        {
          name: "棋牌室1"
        },
        {
          name: "棋牌室2"
        },
        {
          name: "棋牌室3"
        },
        {
          name: "棋牌室4"
        },
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
        {
          week: "今天",
          date: "12-23"
        },
        {
          week: "明天",
          date: "12-23"
        },
        {
          week: "周一",
          date: "12-23"
        },
        {
          week: "周二",
          date: "12-23"
        },
        {
          week: "周三",
          date: "12-23"
        }
      ],
      datelist: [
        {
          date: "9:00-9:30", //date为显示文字，nochoose为是否可选，selected为选中的
          nochoose: true,
          id:1
        },
        {
          date: "9:30-10:00",
          nochoose: false,
          selected: false,
          id:2
        },
        {
          date: "10:00-10:30",
          nochoose: false,
          selected: false,
          id:3
        },
        {
          date: "10:30-11:00",
          nochoose: false,
          selected: false,
          id:4
        },
        {
          date: "11:00-11:30",
          nochoose: false,
          selected: false,
          id:5
        },
        {
          date: "11:30-12:00",
          nochoose: false,
          selected: false,
          id:6
        },
        {
          date: "12:00-12:30",
          nochoose: false,
          selected: false,
          id:7
        },
        {
          date: "12:30-13:00",
          nochoose: false,
          selected: false,
          id:8
        },
        {
          date: "13:00-13:30",
          nochoose: false,
          selected: false,
          id:9
        },
        {
          date: "13:30-14:00",
          nochoose: false,
          selected: false,
          id:10
        },
        {
          date: "14:00-14:30",
          nochoose: false,
          selected: false,
          id:11
        },
        {
          date: "14:30-15:00",
          nochoose: false,
          selected: false,
          id:12
        },
        {
          date: "15:00-15:30",
          nochoose: false,
          selected: false,
          id:13
        },
        {
          date: "15:30-16:00",
          nochoose: false,
          selected: false,
          id:14
        },
        {
          date: "16:00-16:30",
          nochoose: false,
          selected: false,
          id:15
        },
        {
          date: "16:30-17:00",
          nochoose: false,
          selected: false,
          id:16
        },
        {
          date: "17:00-17:30",
          nochoose: false,
          selected: false,
          id:17
        },
        {
          date: "17:30-18:00",
          nochoose: false,
          selected: false,
          id:18
        }
      ],
      istrue: false,
      index1: "",
      index2: "", //选择的棋牌室index
      venues: "", //选择的棋牌室名
      appottime:'',//选择的时间
      chooseDate:'',
      chooseTime:[],
      timeids:[]
    };
  },
  mounted() {
    setTitle("棋牌室预约");
    // 获取星期
    this.getweek();
    document.getElementById("index_loading").style.display = "none";
  },
  components: {
    Group,
    Cell
  },
  methods: {
    //获取星期
    getweek() {
      var date = new Date();
      var week = date.getDay();
      console.log(week);
    },

    //选择棋牌室
    choosevenues(obj, index) {
      this.index2 = index;
      this.venues = obj.name;
    },
    //选择星期
    choosedate(index,week) {
      this.index1 = index;
      this.chooseDate=week.date
      console.log(this.chooseDate,'date')
    },
    //选择时间
    choosetime(obj) {
      console.log(obj);
      if (obj.nochoose) {
        return;
      }
      obj.selected = !obj.selected;


      //得到选中的时间数组，确定是新增还是删除
      var index=this.chooseTime.indexOf(obj.date)
      if(index==-1){

        //合并时间段
        this.chooseTime.map((value)=>{
          var newtime=value.split('-')
          var splittime=obj.date.split('-')
          console.log(splittime,'splittime')
          // newtime.
          console.log(newtime)
        })

        // id合集
        this.timeids.push(obj.id)
        this.chooseTime.push(obj.date)
        console.log(this.timeids,'timeids')
        console.log(this.chooseTime,'choosetime')
      }else{
        this.chooseTime.splice(index,1)
        this.timeids.splice(index,1)
        console.log(this.timeids,'timeids')
        console.log(this.chooseTime,'choosetime')
      }
      var timestrs=this.chooseTime.join(',')
      console.log(this.chooseDate)
      this.appottime=this.chooseDate+' '+timestrs

    }
  }
};
</script>
<style scoped>
.toptitle {
  color: #888888;
  line-height: 1.181rem;
  padding-left: 0.417rem;
  background: #dcdcda;
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
  width: 1.667rem;
  height: 1.667rem;
  font-size: 0.333rem;
  background: #efeff4;
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
  padding-bottom:0.25rem
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
}
.middle .centertop .trgle {
  position: absolute;
  border: 0.168rem solid #915baf;
  /* border-right:transparent; */
  left: 50%;
  bottom: -0.168rem;
  transform: translateX(-50%) scaleX(0.9) rotate(45deg);
  z-index: -1;
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

::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

