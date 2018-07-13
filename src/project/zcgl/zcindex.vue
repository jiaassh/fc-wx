<template>
  <div style="background:#fff"> 
    <div style="position:fixed;width:100%;height:100%;background:#fff;z-index:-1"></div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div>
      <swiper auto :aspect-ratio="400/750">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item.picture"></swiper-item>
      </swiper>
      <load-more v-if="this_list.length===0" :show-loading="false" tip="您还有没有服务数据呢" background-color="#efeff4"></load-more>
      <!-- <group gutter="10px" v-for="item in this_list" :key="item.id" @click.native="goDetail(item.id)" class="contentwrap">
        <div :style="imageurl" class="imgwrap">
          <img style="width: 100%;height:100%;" :src = "item.img"/>
        </div>
        <cell :title="item.name">
          已有{{item.has_choose}}人选择
        </cell>
      </group> -->
      <div class="contentwrap" v-for="(item,index) in this_list" @click="goDetail(index,item.id)">
          <div class="contentmsg">
            <p style="color:#000;font-size:0.56rem">{{item.name}}</p>
            <p class="msgbottom">{{item.desc}}</p>
          </div>
          <div class="imgwrap">
            <img :src="item.surfaceplot" > 
          </div>
      </div>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
  </div>
</template>

<script>
  import loading from '@/components/loading/dataLoading';
  import {setTitle} from '@/common/js/common';
  import {Swiper,Cell,Group,SwiperItem,Alert,LoadMore} from 'vux';

  export default{
    data(){
      return{
        loading:true,
        route_type:0,
        this_list: [],
        demo06_list:[],
        demo06_index:0,
        confirm_show:false,
        dialog_title:"",
        confirm_content:""
      }
    },
    computed:{
      imageurl(){
        return {"height":(document.body.clientWidth)*5/9+"px"}
      },
      imageheight(){
        return (document.body.clientWidth)/75*31+"px"
      }
    },
    components:{
      loading,Swiper,Cell,Group,SwiperItem,Alert,LoadMore
    },
    mounted(){
      let self =this;
      setTitle("资产管理")
      if(service_url){
        this.getSwiper()

        /*let get_url = service_url+"/o2o/notice/wx/newsIndex?ntype="+2+"&sum="+4+"&itemid=";
        let url = this.route_type===1?get_url+8:get_url+9;
        this.$http.get(url).then((data)=>{
            console.log(data);
          if(data.body.status==="ok"){
            self.demo06_list=data.body.data;
          }else{
            alert("访问失败");
          }
        });*/


        self.$http.get(service_url+"/o2o-assets-webAndroid/wx/index").then((data)=>{
            if(data.body.status===0){
              self.this_list=data.body.data;
            }else{
              this.dialog_title="提示";
              this.confirm_content=data.body.error_reason;
              this.confirm_show=true;
            }
            })
              
        // if(this.route_type===1){
        //   this.getSwiper();
        //   self.$http.get(service_url+"/o2o/hk/wx/index").then((data)=>{
        //     if(data.body.status===0){
        //       self.this_list=data.body.data;
        //     }else{
        //       this.dialog_title="提示";
        //       this.confirm_content=data.body.error_reason;
        //       this.confirm_show=true;
        //     }
        //   });
        // }else{
        //   this.getSwiper();
        //   self.$http.get(service_url+"/o2o/reno/wx/index").then((data)=>{
        //     if(data.body.status===0){
        //       self.this_list=data.body.data;
        //     }else{
        //       this.dialog_title="提示";
        //       this.confirm_content=data.body.error_reason;
        //       this.confirm_show=true;
        //     }
          // });
        // }

      }else{
        // this.getSwiper();
        this.$http.get("/api/wb_bj").then((data)=>{
          self.this_list=data.body.data.data;
          self.this_list.map(function (value) {
            value.desc='厨房的清洁度直接关乎家庭成员饮食的安全和健康，却也是家庭保洁中最艰难的环节。丰诚物业厨房保养，使用专业工具和清洁剂，高效去除油污、全方位消毒抑菌，为厨房提供高品质的清洗和养护。建议每年做2次厨房保养。'
          })
          
          
          // self.this_list=data.body.data.data;
        })
      }
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      getSwiper(){
        if(service_url){
          this.$http.get(service_url+'/o2o/notice/wx/newsIndex?ntype=2&sum=5&itemid=12').then((data)=>{
            this.demo06_list = data.body.data;
          })
        }else{
          this.$http.get("/api/newsIndex").then((data)=>{
            // this.demo06_list=data.body.data.data;
            this.demo06_list=['static/imgs/lottery_2/zclunbo.png'];
            console.log(this.demo06_list)
          })
        }
      },
      success (src, ele) {
        console.log('success load', src)
        const span = ele.parentNode.querySelector('span')
        ele.parentNode.removeChild(span)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'load error'
      },
      demo06_onIndexChange(index){
        this.demo06_index = index
      },
      goDetail(index,id){
        this.$router.push({path:'house_info',query:{index:index,assignid:id}})
      },
      go_link(url,id){
        if(service_url){
          this.$http.get(service_url+"/o2o/notice/wx/gclick?nid="+id).then(data=>{
            if(data.body.statusCode==="ok"){
              window.location.href=url;
            }
          })
        }else{
          window.location.href=url;
        }
      }
    }
  }
</script>

<style scoped>
  .ximg-demo {
    width: 100%;
    height: auto;
  }
  .ximg-error {
    background-color: yellow;
  }
  .ximg-error:after {
    content: '加载失败';
    color: red;
  }
  .contentwrap{display:flex;height:2.667rem;margin:0.4rem;background:#fff;box-shadow:0 1px 20px rgba(38,9,56,0.1)}
  .contentmsg{width:70%;}
  .contentmsg p{margin-top:0.55rem;margin-left:0.853rem;font-size:0.5rem;}
  .contentmsg .msgbottom{margin-top:0;font-size:0.427rem;color:#A7A7A7;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width:4rem}
  .imgwrap{
    width:2.13rem;
    height:2.13rem;
    box-sizing:border-box;
    margin:0.267rem;
    position:relative
  }
  .imgwrap img{
 width:100%;
 height:100%
  /* transform:translateX(-50%) translateY(-50%) */
  }
</style>
