<template>
  <div>
    <!--<Loading v-if="loading"></Loading>-->
    <div>
      <search  style="position:fixed;top:0;z-index:1;width:88%;" @on-submit="onSubmit" v-model="value2" @on-focus="onFocus" @on-cancel="onCancel"></search>
      <div @click="add_goods" class="common_color" style="position:fixed;top:0;z-index:1;min-width:30px;right:0;background-color:#EFEFF4;padding:11px 9px;text-align: right;">发布</div>
      <Scroller :on-refresh="onRefresh" :on-infinite="onInfinite">
        <swiper auto :aspect-ratio="400/750">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item.picture"></swiper-item>
        </swiper>
        <div class="weui_flex" style="font-size:14px">
          <div class="flex_tab f_flex f_ac f_vc common_color">
            <div style="padding:5px" @click="showActionsheet2">{{current_rack}}</div>
            <i class="arrow"></i>
          </div>
          <div class="flex_tab f_flex f_ac f_vc common_color">
            <div style="padding:5px" @click="showActionsheet">{{current_sort}}</div>
            <i class="arrow"></i>
          </div>
        </div>

        <load-more v-if="totalpage===0" :show-loading="false" tip="暂无商品数据" background-color="#efeff4"></load-more>
        <div v-else class="center_content font_1_2">
          <goodslist :goodsItem="goodsItem" :enter_type="2"></goodslist>
        </div>
       <!-- <div class="center_content font_1_2" style="border-top:1px solid #ddd">
          <div v-if="totalpage===0"><load-more :show-loading="false" tip="暂无商品数据" background-color="#efeff4"></load-more></div>
          <goodslist v-else :goodsItem="goodsItem" :enter_type="2"></goodslist>
        </div>-->
      </Scroller>

    </div>
    <actionsheet v-model="show_sort" :menus="sort" @on-click-menu="click_sort"></actionsheet>
    <!-- <actionsheet v-model="show_rack" :menus="rack" @on-click-menu="click_rack"></actionsheet> -->

  <!-- 加的 -->
    <popup-picker :show="show_rack" :show-cell="false"  :data="rack" @on-hide="show_rack=false" @on-change="click_rack"></popup-picker>



    <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
  </div>
</template>

<script>
  import { Swiper,Search,Selector, Group,Actionsheet,SwiperItem,LoadMore,Alert,PopupPicker} from 'vux'
  import marketList from '@/project/tzsc/market_list';
  import Scroller from '@/components/scroller_me/scroller';
  import Loading from '@/components/loading/dataLoading';
  import {setTitle} from '@/common/js/common';
  import goodslist from '@/project/pzsh/goods_list';


  export default{
      data(){
        return{
          loading:true,
          value2:"",
          demo06_list:[],
          demo06_index: 0,
          current_rack:'全部',
          current_sort:'默认',
          show_sort:false,
          show_rack:false,
          sort:[],
          rack:[],
          racklist:[],
          // rack:['1', '2', '3', '4', '5'],
          pageno:1,
          pagesize:4,
          current_sort_key:0,
          current_rack_key:null,
          totalpage:[],
          goodsItem:[],
          confirm_show:false,
          dialog_title:"",
          confirm_content:""
        }
      },
      components:{
        Swiper,Search,Selector, Group,Actionsheet,Scroller,Loading,marketList,goodslist,SwiperItem,LoadMore,Alert,PopupPicker
      },
      mounted(){
        setTitle("跳蚤市场首页");
        document.getElementById("index_loading").style.display="none";
        this.getlist();
        this.getSwiper();
      },
    computed:{
      swiper_height(){
        return (document.body.clientWidth)/75*31+"px"
      }
    },
      methods: {
        getSwiper(){
          if(service_url){
            this.$http.get(service_url+"/o2o/notice/wx/newsIndex?ntype=2&sum=5&itemid=11").then((data)=>{
              /*let newsIndex = data.body.data;
              for(let i in newsIndex){
                this.demo06_list.push(newsIndex[i].picture);
              }*/
              this.demo06_list=data.body.data;
            })
          }else{
            this.$http.get("/api/newsIndex").then((data)=>{
              this.demo06_list=data.body.data.data;
            })
          }
        },
        getlist(){
          const self = this;
          const senddata = {
              "pageno":this.pageno,
              "pagesize":this.pagesize,
              "sort":this.current_sort_key,
              "rack":this.current_rack_key,
              "searchValue":this.value2,
              "uservid":userProfile.vid
          };
          if(service_url){
            this.$http.post(service_url+'/o2o/flea/wx/indexFlea',senddata).then( (data)=> {
              console.log(data.body.result.status);
              if(data.body.result.status===0){
                self.totalpage=data.body.result.totalpage;
                console.log(self.totalpage);
                if(self.totalpage===1||self.totalpage===0){
                  this.$el.querySelector('.load-more').style.display = 'none';
                }else{
                  this.$el.querySelector('.load-more').style.display = 'block';
                }
                self.goodsItem=data.body.result.data.goodsList;

                let arr_sort=data.body.result.data.sort;
                console.log("123"+arr_sort);
                let json_sort={};
                for(var i=0;i<arr_sort.length;i++)
                {
                  json_sort[arr_sort[i].key]=arr_sort[i].value
                }
                self.sort=json_sort;

                let arr_rack=data.body.result.data.rack;
              //自己加的
                 self.racklist=arr_rack
               let json_rack=[]
            //  for(let j=0;j<arr_rack.length;j++)
            //  {
            //  json_rack[arr_rack[j].key]=arr_rack[j].value
            //  }
            for(let j=0;j<arr_rack.length;j++)
             {
             json_rack.push(arr_rack[j].value)
             }
            //  self.rack=json_rack;
            self.rack=[]
             self.rack.push(json_rack);
              }else{
                this.dialog_title="提示";
                this.confirm_content=data.body.result.error_reason;
                this.confirm_show=true;
              }


            },()=>{
              console.log(2);
            });
          }else{
            this.$http.get('/api/goodsIndex').then((data) => {
              console.log(data.body.data.fields)
             self.totalpage=data.body.data.totalpage;
//             self.totalpage=0;
              console.log(self.totalpage);
              if(self.totalpage===1||self.totalpage===0){
                this.$el.querySelector('.load-more').style.display = 'none';
              }else{
                this.$el.querySelector('.load-more').style.display = 'block';
              }
             self.goodsItem=data.body.data.fields.goodsList;
             let arr_sort=data.body.data.fields.sort;
             let json_sort={};
             for(let i=0;i<arr_sort.length;i++)
             {
             json_sort[arr_sort[i].key]=arr_sort[i].value
             }
             self.sort=json_sort;

             let arr_rack=data.body.data.fields.rack;
             self.racklist=arr_rack
            //  let json_rack={};
            let json_rack=[]
            //  for(let j=0;j<arr_rack.length;j++)
            //  {
            //  json_rack[arr_rack[j].key]=arr_rack[j].value
            //  }
            for(let j=0;j<arr_rack.length;j++)
             {
             json_rack.push(arr_rack[j].value)
             }
            //  self.rack=json_rack;
            self.rack=[]
             self.rack.push(json_rack);
             console.log(self.rack,'rack')

             }, () => {
             console.log(2);
             });
          }

        },
        demo06_onIndexChange (index) {
          this.demo06_index = index
        },
        onSubmit (val) {
          this.value2=val;
          this.getlist();
        },
        onFocus () {
          console.log('on focus')
        },
        onCancel () {
          this.value2="";
          this.getlist();
        },
        showActionsheet () {
          this.show_sort=true;
        },
        showActionsheet2 () {
          this.show_rack=true;
        },
        click_sort(key){
          this.pageno=1;
          this.current_sort_key=parseInt(key);
          this.getlist();
          for(let i in this.sort){
            if(i==key){        //item 表示Json串中的属性，如'name'
              let jValue=this.sort[i];//key所对应的value
              this.current_sort=jValue;
            }
          }
        },
        click_rack(val){
          console.log(val[0],'key')
          this.pageno=1;

          // this.current_rack_key=parseInt(key);

          //加的
          for(var i=0;i<this.rack[0].length;i++){
            console.log(this.rack[0][i])
              if(val[0]==this.rack[0][i]){
                this.current_rack_key=parseInt(this.racklist[i].key)
              }
          }
          console.log(this.current_rack_key,'rack_key')
          console.log(this.rack,'rack')
          this.getlist();
          //加的

          this.current_rack=val[0]
          // for(let i in this.rack){
          //   if(i==key){        //item 表示Json串中的属性，如'name'
          //     let jValue=this.rack[i];//key所对应的value
          //     this.current_rack=jValue;
          //   }
          // }
        },
        onInfinite(done) {
          console.log("onInfinite")
          let self = this;
          if(this.pageno>this.totalpage-1){
            this.$el.querySelector('.load-more').style.display = 'none';
            return;
          }else{
            this.pageno++;
            const senddata = {
                "pageno":this.pageno,
                "pagesize":this.pagesize,
                "sort":this.current_sort_key,
                "rack":this.current_rack_key,
                "searchdata":this.value2,
                "uservid":userProfile.vid
            };
              if(service_url){
                this.$http.post(service_url+'/o2o/flea/wx/indexFlea',senddata).then( (data)=> {
                  self.totalpage=data.body.result.totalpage;
                  let goodsList = data.body.result.data.goodsList;
                  for(let i =0;i<goodsList.length;i++){
                    self.goodsItem.push(goodsList[i]);
                  }
                  done();
                })
              }else{
                this.$http.get('/api/goodsIndex').then((data) => {
                 self.totalpage = data.body.data.totalpage;
                 let goodsList = data.body.data.fields.goodsList;
                 for(let i =0;i<goodsList.length;i++){
                 self.goodsItem.push(goodsList[i]);
                 }
                 })
              }
          }
        },
        onRefresh(done) {
          this.pageno=1;
          console.log("onRefresh")
  //        this.getlist();

          done() // call done
        },
        add_goods(){
            this.$router.push({
              path:"add_market_goods",query:{
                  "enter_type":1
              }
            })
        },
        go_link(url,id){
          if(service_url){
            url && this.$http.get(service_url+"/o2o/notice/wx/gclick?nid="+id).then(data=>{
              if(data.body.statusCode==="ok"){
                window.location.href=decodeURIComponent(url);
              }
            })
          }else{
            window.location.href=url;
          }
        }
      },

  }
</script>

<style scoped>
  .weui_flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    outline: 0;
    -webkit-align-items: center;
    align-items: center;
  }
  .f_flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .f_vc{
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
  }
  .f_ac{
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .weui_flex .flex_tab{
    -webkit-box-flex: 1;
    position: relative;
    /*padding: .5em;*/
    width: 0;
    color: #000;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
  }
  .weui_flex .flex_tab.focus{
    color:#24b8f1
  }
  .weui_flex .flex_tab .arrow{
    display: block;
    border-width: 6px 4px 0;
    border-style: solid;
    border-right-color: transparent;
    border-left-color: transparent;
    width: 0;
    height: 0;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
  }
  .center_content{
    padding:1.6% 0;
    border-top:1px solid #999;
    border-bottom:1px solid #999;
    overflow: hidden;
    background:#ececec;
  }
</style>
