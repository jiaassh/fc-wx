<template>
  <div>
      <group gutter='0'>
        <div @click='changeclub' style="line-height:0.96rem;text-align:center;height:0.96rem">{{clubname}}</div>
        <popup-picker :show="show_rack" :show-cell="false" :data='clublist' @on-hide="show_rack=false" @on-change="clubchange"></popup-picker>
      </group>
      <div>
        <swiper auto :aspect-ratio="350/750">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item.picture"></swiper-item>
        </swiper>
      </div>
      <div class="contentwrap">
          <div class="content" v-for="item in contentlist" @click="godetail(item.id,clubid,item.name)">
              <div class="titlewrap">
                  <p class="title">{{item.name}}</p>
                  <p class="desc">{{item.serviceSlogan}}</p>
              </div>
              <div class="imgwrap">
                  <img :src="item.coverImage" alt="" style="width:2.133rem;height:2.133rem">
              </div>
          </div>
      </div>
      <Alert v-model="confirm_show" title='提示'>{{content}}</Alert>
  </div>
</template>
<script>
import {
  Cell,
  Swiper,
  SwiperItem,
  Actionsheet,
  Alert,
  PopupPicker,
  Group
} from "vux";
import { setTitle } from "@/common/js/common";

export default {
  data() {
    return {
      datalist: [
        // {
        //   key: 1,
        //   name: "艺庭会所",
        //   checked: 1
        // },
        // {
        //   key: 2,
        //   name: "艺庭会所2",
        //   checked: 1
        // },
        // {
        //   key: 3,
        //   name: "艺庭会所3",
        //   checked: 1
        // },
        // {
        //   key: 4,
        //   name: "艺庭会所4",
        //   checked: 1
        // }
      ], //会所原始数据
      //会所列表切换
      clublist: [],
      show_rack: false,
      confirm_show: false,
      content: "",
      //会所id
      clubid: 0,
      demo06_list: [],
      // 会所名称
      clubname: "",
      contentlist: [
        // {
        //   id: 1,
        //   name: "羽毛球",
        //   serviceSlogan: "不服来战",
        //   coverImage: "http://192.168.0.40:9999/image/xxx.jpg"
        // },
        // {
        //   id: 1,
        //   name: "羽毛球",
        //   // "serviceSlogan":"不服来战",
        //   coverImage: "http://192.168.0.40:9999/image/xxx.jpg"
        // },
        // {
        //   id: 1,
        //   name: "羽毛球",
        //   serviceSlogan: "不服来战",
        //   coverImage: "http://192.168.0.40:9999/image/xxx.jpg"
        // },
        // {
        //   id: 1,
        //   name: "羽毛球",
        //   serviceSlogan: "不服来战",
        //   coverImage: "http://192.168.0.40:9999/image/xxx.jpg"
        // }
      ],
      
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Actionsheet,
    Alert,
    Group,
    PopupPicker,
    Cell
  },
  mounted() {
    setTitle('会所首页')
    var that = this;
    this.getSwiper();
    this.$http
      .post(service_url + "/o2o-club-webAndroid/wx/getClubindex.do", {
        clubid: that.clubid,
        vid: userProfile.vid,
        userId: userProfile.userid
      })
      .then(res => {
        if (res.body.state == 0) {
          that.datalist = res.body.data.clubList;
          var list = [];
          that.datalist.map(val => {
            if (val.checked == 1) {
              that.clubname = val.name;
              that.clubid = val.key;
            }
            list.push(val.name);
          });

          that.clublist.push(list);
          that.contentlist = res.body.data.projectList;
        } else {
          let data = res.body.data.errorCode;
          if (data == 1) {
            that.confirm_show = true;
            that.content = "页面出现错误了";
          } else if (data == 2) {
            that.confirm_show = true;
            that.content = "登录失效,请重新登录";
          } else if (data == 3) {
            that.confirm_show = true;
            that.content = "当前小区还没有会所,敬请期待";
          }
        }
      });
    document.getElementById("index_loading").style.display = "none";
  },
  methods: {
    go_link(url,id){
      window.location.href=url
    },
    // 切换会所显示
    changeclub() {
      this.show_rack = true;
    },
    clubchange(val) {
      var that = this;
      console.log(val);
      this.clubname = val[0];
      this.datalist.map(value => {
        if (value.name == that.clubname) {
          this.clubid = value.key;
        }
      });

      console.log(this.clubid);
      this.$http.post(service_url + "/o2o-club-webAndroid/wx/getClubindex.do", {
        clubid: that.clubid,
        vid: userProfile.vid,
        userId: userProfile.userid
      }).then((res)=>{
        if(res.body.state==0){
          that.contentlist = res.body.data.projectList;
        }else{
          let data = res.body.data.errorCode;
          if (data == 1) {
            that.confirm_show = true;
            that.content = "页面出现错误了";
          } else if (data == 2) {
            that.confirm_show = true;
            that.content = "登录失效,请重新登录";
          } else if (data == 3) {
            that.confirm_show = true;
            that.content = "当前小区还没有会所,敬请期待";
          }
        }
      })
    },
    getSwiper() {
      if (service_url) {
        this.$http
          .get(service_url + "/o2o/notice/wx/newsIndex?ntype=2&sum=5&itemid=7")
          .then(data => {
            /*let newsIndex = data.body.data;
                    for(let i in newsIndex){
                    this.demo06_list.push(newsIndex[i].picture);
                    }*/
              this.demo06_list = data.body.data;
            
          });
      } else {
        this.$http.get("/api/newsIndex").then(data => {
          /*let newsIndex = data.body.data.data;
                    for(let i in newsIndex){
                    this.demo06_list.push(newsIndex[i].picture);
                    }*/
          this.demo06_list = data.body.data.data;
        });
      }
    },
    // 进入详情页
    godetail(id, clubid, name) {
      this.$router.push({
        path: "hsyy_detail",
        query: { projectid: id, clubid: clubid, titlename: name }
      });
    }
  }
};
</script>
<style scoped>
.contentwrap {
  padding: 0.4rem 0.4rem 0 0.4rem;
}
.content {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  /* height:2.667rem; */
  box-shadow: 0 1px 20px rgba(38, 9, 56, 0.1);
}
.content .title {
  font-size: 0.56rem;
  color: #000;
  max-width: 3.73rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .titlewrap {
  margin: 0.61rem 0 0.253rem 0.967rem;
}
.content .desc {
  color: #a7a7a7;
  font-size: 0.427rem;
  max-width: 3.73rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .imgwrap {
  padding: 0.267rem 0.267rem;
}
</style>
