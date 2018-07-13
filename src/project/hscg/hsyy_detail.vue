<template>
  <div>
      <div style="position:fixed;top:0;left:0;background:#fff;width:100%;height:100%;z-index:-1"></div>
      <div>
        <swiper auto :aspect-ratio="325/750">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item"></swiper-item>
        </swiper>
      </div>
      <div>
          <group gutter='0'>
              <cell :title="address"><img slot='icon' width='20' style="display:block;margin-right:0.267rem;" src="./position.png"></cell>
              <cell :title="phone"><img slot='icon' width='20' style="display:block;margin-right:0.267rem;" src="./phone.png"></cell>
          </group>
      </div>
      <div>
          <div class='contentwrap'>
              <div class="title">场馆介绍</div>
              <p class='desc'>{{desc}}</p>
          </div>
      </div>
      <div class="comments">
        <group gutter="10px">
          <div style="padding:10px 15px;">用户评价<span style="color:#999;font-size:14px;margin-left:5px;">{{'('+evaluate.length+')'}}</span></div>
          <div class="pj_detail" v-for="item in evaluate">
            <div class="f_flex" style="font-size:13px;">
                <div class="pj_img_div">
                    <img :src="item.eva_img"/>
                </div>
                <div class="flex_1">
                    <div><p class="pj_name text_ellipsis">{{item.eva_name}}</p><span style="float:right;color:#999;">{{item.eva_time}}</span></div>
                    <rater v-model="item.eva_score" :font-size="15" active-color="#ff9500" disabled></rater>
                    <div style="font-size:15px;">{{item.eva_content}}</div>
                </div>
            </div>
          </div>
        </group>
      </div>
      <div :class="{submit:true,'bgcolor':isReserve}" @click="appoint">立即预约</div>
       <Alert v-model="confirm_show" title='提示'>{{content}}</Alert>
  </div>
</template>
<script>
import {
  Swiper,
  SwiperItem,
  Actionsheet,
  Alert,
  Group,
  Cell,
  Rater
} from "vux";
import { setTitle } from "@/common/js/common";

export default {
  data() {
    return {
      demo06_list: [],
      isReserve:false,
      address:'',
      phone:'',
      desc:'',
      confirm_show:false,
      content:'',
      projectId:'',
      clubid:'',
      titlename:'',//标题名称
      //评价
      evaluate: []
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Actionsheet,
    Alert,
    Group,
    Cell,
    Rater,
  },
  mounted() {
    // this.getSwiper();
    var self = this;
    var jh =this.$route.query.titlename;
    this.titlename=jh
    this.projectId=this.$route.query.projectid
    this.clubid=this.$route.query.clubid
    console.log(this.clubid,'clubid')
    console.log(this.projectId)
    this.$http.post(service_url+'/o2o-club-webAndroid/wx/getProjectDetail.do',{
      "projectId":self.projectId
    }).then((res)=>{
      if(res.body.state==0){
        var data=res.body.data
        self.demo06_list=data.serviceSlideshow.split(',')
        if(data.isReserve){
          self.isReserve=true
        }
        self.address=data.address
        self.phone=data.phone
        self.desc=data.desc
      }else{
          that.confirm_show=true
          that.content=res.body.msg
      }
    })
    setTitle(jh);
    // this.$
    if (service_url) {
      const item = {
        project_id: this.project_id
      };
      this.$http
        .post(service_url + "/o2o/club/wx/projectDetail", item)
        .then(data => {
          self.evaluate = data.body.data.evaluate;
          self.goods_content = data.body.data.desc;
          self.project_score = data.body.data.score || 5;
          self.project_address = data.body.data.address;
          self.project_name = data.body.data.name;
          self.project_time = data.body.data.worktime;
          self.project_tel = data.body.data.tel;
          self.img = data.body.data.img;
          self.eva_num = "用户评价(" + data.body.data.evaluate.length + ")";
        });
    } else {
      this.$http.get("/api/area_detail").then(data => {
        self.evaluate = data.body.data.data.evaluate.eva_detail;
        self.goods_content = data.body.data.data.desc;
        self.img = data.body.data.data.img;
        self.project_score = parseInt(data.body.data.data.score) || 5;
        self.project_address = data.body.data.data.address;
        self.project_name = data.body.data.data.name;
        self.project_time = data.body.data.data.worktime;
        self.project_tel = data.body.data.data.tel;
        self.eva_num =
          "用户评价(" + data.body.data.data.evaluate.eva_detail.length + ")";
      });
    }
    document.getElementById("index_loading").style.display = "none";
  },
  methods: {
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
    // 进入预约页面
    appoint(){
      var that=this
      if(this.isReserve==true){
        that.confirm_show=true
        that.content='请到会所前台联系客服人员办理会员'
          return
      }
      this.$router.push({path:'Timeselect',query:{projectId:this.projectId,clubid:this.clubid,titlename:this.titlename}})
    }
  }
};
</script>
<style scoped>
.contentwrap {
  margin: 0.267rem 0.4rem;
  border: 1px solid #f9e3ff;
}
.contentwrap .title {
  padding: 0.227rem 0.267rem;
  font-size: 0.373rem;
  color: #444444;
  background: #f9e3ff;
}
.contentwrap .desc {
  margin: 0.267rem;
}

/* 评价 */
.pj_detail {
  border-top: 1px solid #e5e5e5;
  padding: 10px 10px 10px 0;
  margin-left: 15px;
}
.f_flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.pj_img_div {
  width: 45px;
  height: 45px;
  margin-right: 1rem;
}
.pj_img_div img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.flex_1 {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.pj_name {
  display: inline-block;
  width: 130px;
  line-height: 15px;
  font-size: 15px;
}
.submit{
    width:9.167rem;
    margin:0 auto;
    color:#fff;
    line-height: 1.222rem;
    background:#763898;
    text-align: center;
    font-size:0.427rem;
    border-radius: 5px;
    margin-top:0.4rem;
    margin-bottom:0.4rem
}
.bgcolor{
  background:#888
}
</style>

