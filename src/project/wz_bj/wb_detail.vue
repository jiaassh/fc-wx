<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div>
      <div style="padding-bottom:62px;background:#fff">
        <!--顶部图片-->
        <!-- 加的轮播图 -->
        <swiper auto :aspect-ratio="400/750">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in img" :key="index"><img style="height:100%;width:100%;object-fit: cover;" :src="item"></swiper-item>
        </swiper>
        <!-- <div :style="imageheight">
          <img style="width:100%;height:100%;" :src = "img"/>
        </div> -->
         <group gutter="10px" style="margin:0 0.4rem;">
          <cell title="服务介绍"  style="background:#f9e3ff"></cell>
          <div style="text-indent: 2em;padding:10px 15px;border:1px solid #f9e3ff;margin-bottom:0.2667rem">
            {{content}}
          </div>
        </group>
        <!--服务流程图-->
        <group gutter ="0"  style="margin:0 0.4rem;border:1px solid #f9e3ff;">
          <cell title="服务流程" style="background:#f9e3ff"></cell>
          <!-- <div style="border:1px solid #f9e3ff;padding:0.53rem;margin-bottom:0.53rem"><img :src = "procedure_img" style="width:100%;height:auto;"/></div> -->
          <div style="padding:0.267rem;" v-for="procedureitem in procedure_img"><img :src = "procedureitem" style="width:100%;height:auto;"/></div>          
          <!-- <div class="liuchengzong">
              <div class="liuchengsingle">
                <img :src="procedure_img" style="width:4rem;height:2.5rem">
                <p>1.13</p>
              </div>
              <div class="liuchengsingle">
                <img :src="procedure_img" style="width:4rem;height:2.5rem">
                <p>1.成品保护,菜鸟进场</p>
              </div>
              <div class="liuchengsingle">
                <img :src="procedure_img" style="width:4rem;height:2.5rem">
                <p>1.成品保护,菜鸟进场</p>
              </div>
          </div> -->
       
          
        </group>
       
        <!-- <group v-if="route_type===1" gutter="10px">
          <cell title="服务价格" :value="this_price"></cell>
        </group> -->
        <group gutter="10px">
          <cell :title="eva_num"></cell>
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
      <div style="position:fixed;bottom:0;left:0;right:0;padding:10px;background-color:white;border-top:1px solid #ececec;z-index:20">
        <flexbox>
          <flexbox-item>
            <x-button type="primary" class="zj_button" @click.native="go_tel">电话咨询</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" class="zj_button" @click.native="go_reserve">{{route_type===1?"预约":"预约"}}</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '@/components/loading/dataLoading';
  import {setTitle} from '@/common/js/common';
  import {Group,Cell,Rater,CellBox,Flexbox,FlexboxItem,XButton,XTable,Swiper,SwiperItem} from 'vux';

  export default{
    data(){
      return{
          id:"",
        loading:true,
        eva_num:0,
        evaluate:[],
        content:"",
        tel:"",
        img:"",
        procedure_img:"",
        route_type:0,
        this_price:"",
        product:"产品"
      }
    },
    computed:{
      imageheight(){
        return {"height":(document.body.clientWidth)*5/9+"px"}
      }
    },
    components:{
      loading,Group,Cell,Rater,CellBox,Flexbox,FlexboxItem,XButton,XTable,Swiper,SwiperItem
    },
    mounted(){
        this.id=this.$route.query.id;
        setTitle("服务详情");
        this.route_type=parseInt(this.$route.query.route_type);//1保洁 2微装
        let self = this;
        if(service_url){
            if(this.route_type===1){
              this.$http.get(service_url+"/o2o/hk/wx/details?id="+this.id).then((data)=>{
                self.evaluate= data.body.data.evaluate;
                self.content= data.body.data.content;
                self.this_price=data.body.data.unitprice+data.body.data.calunit;
                self.tel= data.body.data.tel;
                // self.img= data.body.data.img;
                // self.img= data.body.data.img.split(",");
                self.img= data.body.data.img.split(",");
                 let imgarr=[]
                self.img.map(function (value) {
                  if(value==''||value=="''"){
                    return
                  }else{
                    imgarr.push(value)
                  }
                })
                console.log(imgarr)
                self.img=imgarr
                // self.procedure_img= data.body.data.procedure_img;
                self.procedure_img= data.body.data.procedure_img.split(',');
                 let procedurearr=[]
                self.procedure_img.map(function (value) {
                  if(value==''||value=="''"){
                    return
                  }else{
                    procedurearr.push(value)
                  }
                })
                console.log(procedurearr)
                self.procedure_img=procedurearr
                self.eva_num = "用户评价（"+data.body.data.evaluate.length+"）";
              })
            }else{
              this.$http.get(service_url+"/o2o/reno/wx/details?id="+this.id).then((data)=>{
                self.evaluate= data.body.data.evaluate;
                self.content= data.body.data.content;
                self.tel= data.body.data.tel;
                self.img= data.body.data.img;
                self.img= data.body.data.img.split(",");
                 let imgarr=[]
                self.img.map(function (value) {
                  if(value==''||value=="''"){
                    return
                  }else{
                    imgarr.push(value)
                  }
                })
                console.log(imgarr)
                self.img=imgarr
                console.log(self.img)            
                self.procedure_img= data.body.data.procedure_img.split(',');
                let procedurearr=[]
                self.procedure_img.map(function (value) {
                  if(value==''||value=="''"){
                    return
                  }else{
                    procedurearr.push(value)
                  }
                })
                console.log(procedurearr)
                self.procedure_img=procedurearr
                self.eva_num = "用户评价（"+data.body.data.evaluate.length+"）";
              })
            }

        }else{
            this.$http.get("/api/wb_detail").then((data)=>{
                self.evaluate= data.body.data.data.evaluate;
                self.content= data.body.data.data.content;
                self.tel= data.body.data.data.tel;
                // self.img= data.body.data.data.img;
                self.img= "'',,http://115.29.175.133:8899/fileserver/17/12/06/1512549822209.jpg,http://115.29.175.133:8899/fileserver/17/12/06/1512549825529.jpg,http://115.29.175.133:8899/fileserver/17/12/06/1512549828567.jpg";  
                self.img=self.img.split(',')  
                var imgarr=[]
                self.img.map(function (value) {
                  if(value==''||value=="''"){
                    return
                  }else{
                    imgarr.push(value)
                  }
                })
                console.log(imgarr)
                self.img=imgarr
                console.log(self.img,'img')
                // self.procedure_img= data.body.data.data.procedure_img;
                self.procedure_img="http://115.29.175.133:8899/fileserver/17/12/06/1512549832032.jpg,http://115.29.175.133:8899/fileserver/17/12/06/1512549834402.jpg"
                self.procedure_img= self.procedure_img.split(',');
                self.eva_num = "用户评价（"+data.body.data.data.evaluate.length+"）";
            })
        }
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      go_tel(){
        window.location.href = 'tel:' + this.tel;
      },
      go_reserve(){
        this.$router.push({path:'wb_reserve',query:{id:this.id,route_type:this.route_type,wb_type:1}});
      }
    }
  }
</script>

<style scoped>
  .pj_detail {
    border-top: 1px solid #e5e5e5;
    padding: 10px 10px 10px 0;
    margin-left:15px;
  }
  .f_flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .flex_1{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
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
  .pj_name {
    display: inline-block;
    width: 130px;
    line-height:15px;
    font-size:15px;
  }
  .button_c{
    color:white;
    background-color:#ad7de7;
  }
  .button_c:active{
    background-color:red;
  }
  .liuchengzong{display:flex;flex-wrap:wrap}
  .liuchengzong .liuchengsingle{width:50%;padding:0.2rem;box-sizing:border-box;text-align:center;border:1px solid #f00}
  .liuchengsingle p{line-height:1rem;font-size:0.2rem}
</style>
