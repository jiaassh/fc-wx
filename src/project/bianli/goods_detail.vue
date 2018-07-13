<template>
  <div>
    <div class="padding_bottom">
      <swiper auto :aspect-ratio="550/750">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in swiper_imgs" :key="index"><img style="height:100%;width:100%;object-fit: cover;" :src="item.img"></swiper-item>
      </swiper>
      <!--<Swiper :list="swiper_imgs" :index="swiper_index" @on-index-change="swiperChange" height="8rem"></Swiper>-->
      <group gutter="0">
        <div style="padding:.2rem .5rem;">
          <div style="font-size:.45rem">{{goods_name}}</div>
          <div class="weui_flex">
            <div class="bld_food_price">￥{{max_price===min_price?max_price:min_price+"~"+max_price}}</div>
            <div style="font-size:.35rem;color:#999;margin-left:.2rem;flex:1;">已销{{sale_num}}件</div>
            <div class="border_add" @click="show_cart">加入购物车</div>
          </div>
        </div>
      </group>
      <group gutter="10px">
        <cell title=""></cell>
        <div class="tw_detail">
          <div class="w_detail">
            <pre>{{desc}}</pre>
          </div>
          <div><img v-for="item in detailimgs" :src="item" class="object_fit" style="width:100%;height:100%;margin-top:5px;"/></div>
        </div>
      </group>
    </div>
    <transition name="toggle-cart">
      <section class="cart_food_list" v-show="showcartList&&cartList1.length">
        <header>
          <h4>购物车</h4>
          <div @click="clearCart">
            <span class="clear_cart">清空</span>
          </div>
        </header>
        <section class="cart_food_details" id="cartFood">
          <div v-for="items in cartList1" >
            <div style="padding:10px 15px;border-bottom:1px solid #ececec;" class="weui_flex" v-for="item in items.models" v-if="item.len>0">
              <div style="width:4rem">
                <div >{{items.name}}</div>
                <div style="font-size:.35rem;color:#999;">{{item.name}}</div>
              </div>
              <div class="bld_food_price" style="flex:1"><span style="width:.5rem"></span>{{item.price}}</div>
              <div>
                <transition name="showReduce">
                  <a @click="reduceCartNum(items.goods_id,item.modelid)"><svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></a>
                </transition>
                <span style="vertical-align: super;font-size:20px;">{{item.len}}</span>
                <a @click="addCartNum(items.goods_id,item.modelid)"><svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
              </div>
              <!--<cart :foods='items' @toggleCart="toggleCart" @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></cart>-->
            </div>
          </div>
        </section>
      </section>
    </transition>
    <transition name="fade">
      <div class="screen_cover" v-show="showcartList&&cartList1.length" @click="togglecartList"></div>
    </transition>
    <section class="buy_cart_container">
      <section @click="togglecartList" class="cart_icon_num">
        <div class="cart_icon_container" :class="{ move_in_cart:receiveInCart}" ref="cartContainer">
                <span v-if="totalNum" class="cart_list_length">
                    {{totalNum}}
                </span>
          <img v-if="totalNum" style="width:100%;height:100%;" src = "../../../static/img/cart_hc.png"/>
          <img v-else style="width:100%;height:100%;" src = "../../../static/img/cart_nc.png"/>
        </div>
        <div class="bld_cart_num">
          <div :style="{color: totalPrice? 'red':'#999'}" :class="{bld_food_price:totalPrice}"><span style="font-size:.5rem;">￥</span>{{totalPrice?totalPrice:"未选购商品"}}</div>
        </div>
      </section>
      <!--<router-link :to="{path:'/confirmOrder'}" :class="{gotopay_button_style:true,gotopay_choose:totalPrice}">选好了</router-link>-->
      <div @click="get_orderNum" :class="{gotopay_button_style:true,gotopay_choose:totalPrice}">选好了</div>
    </section>
    <popup v-model="popup_model" position="bottom" style="background-color:white">
      <div class="bld_img_border">
        <div style="width:120px;height:120px;">
          <img class="object_fit" style="width:100%;height:100%;"
               :src="alert_img"/>
        </div>
      </div>
      <div style="display:inline-block;vertical-align: top;padding:10px;">
        <div style="font-size:.5rem;">{{goods_name}}</div>
        <div style="font-size:25px;color:red"><span style="font-size:18px">￥</span>{{select_price}}</div>
        <div style="font-size:14px;color:#999">{{choose_item?"已选'"+choose_item+"'":'请选择规格'}}</div>
      </div>
      <div style="padding:0 0 10px;margin:0 10px;border-top:1px solid #ececec;">
        <p style="padding: 5px;color:black">规格</p>
        <checker
          v-model="choose_item"
          default-item-class="bld-item"
          selected-item-class="bld-item-selected">
          <checker-item  v-for="item in models" style="margin-bottom: 5px;" :key="item.name" :value="item.name" @on-item-click="itemclick">{{item.name}}</checker-item>
        </checker>
      </div>
      <!--<x-number :title="num_title" v-model="roundValue" :min="1" @on-change="change"></x-number>-->
      <div style ="display:flex;padding:10px 0 5px;margin:0 10px;border-top:1px solid #ececec;border-bottom:1px solid #ececec;">
        <div style="flex:1;">数量</div>
        <div style="text-align: right;">
          <transition name="showReduce">
            <a @click="reduceNum"><svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></a>
          </transition>
          <span style="vertical-align: super;font-size:20px;margin:0 5px;">{{num}}</span>
          <a @click="addNum"><svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
        </div>
      </div>
      <div class="bld_confirm_button" @click="addToCart">加入购物车</div>
    </popup>
    <transition
      appear
      @after-appear = 'afterEnter'
      @before-appear="beforeEnter"
      v-for="(item,index) in showMoveDot"
      :key="item"
    >
      <div class="bld_move_dot" v-if="item">
        <div class="move_liner">
          <span style="display:inline-block;background-color:#2196f3;width:12px;height:12px;border-radius:50%"></span>
        </div>
      </div>
    </transition>
    <loading v-model="showLoading"></loading>
  </div>
</template>
<script>
  import {setTitle} from '@/common/js/common';
  import {Swiper,SwiperItem,Group,Cell,Popup,CheckerItem,Checker,Loading} from 'vux';
  import {mapState, mapMutations} from 'vuex'

  export default{
      data(){
          return{
            swiper_index:0,
            swiper_imgs:[],
            alert_img:"",
            goods_name:"",
            max_price:0,
            min_price:0,
            sale_num:0,
            models:[],
            desc:"",
            detailimgs:[],
            choose_item:"",
            select_price:0,
            popup_model:false,
            num:1,
            showMoveDot:[],
            showLoading:false,
            totalNum:0,
            totalPrice:0,
            showcartList:false,
            receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
          }
      },
      components:{
        Swiper,Group,Cell,Popup,CheckerItem,Checker,Loading,SwiperItem
      },
    computed: {
      ...mapState([
        'cartList1'
      ])
    },
      mounted(){
        setTitle("商品详情");
        this.goods_id=this.$route.query.goods_id;
        console.log(this.goods_id,1)
        if(this.cartList1.length>0){
          for(let i=0;i<this.cartList1.length;i++){
            for(let j=0;j<this.cartList1[i].models.length;j++){
              this.totalNum+=this.cartList1[i].models[j].len;
              this.totalPrice+=this.cartList1[i].models[j].len*parseFloat(this.cartList1[i].models[j].price);
            }
          }
        }
        if(service_url) {
          const senddata = {
            "goods_id": this.goods_id
          };
          this.$http.post(service_url+'/o2o/shop/wx/goodinfo.do',senddata).then((data) => {
            this.show_goods=data.body.fields;
            this.swiper_imgs = data.body.fields.wximgs;
            this.alert_img = data.body.fields.wximgs[0].img;
            this.goods_name = data.body.fields.name;
            this.max_price = data.body.fields.max_price;
            this.min_price = data.body.fields.price;
            this.sale_num = data.body.fields.sale_num;
            this.models = data.body.fields.models;
            this.choose_item=this.models[0].name;
            this.select_price=this.models[0].price;
            this.desc = data.body.fields.desc;
            this.detailimgs = data.body.fields.detailimgs;
          })
        }else{
          this.$http.get('/api/goodsDetails').then((data) => {
            this.show_goods=data.body.data;
            this.swiper_imgs = data.body.data.wximgs;
            this.alert_img = data.body.data.wximgs[0].img;
            this.goods_name = data.body.data.name;
            this.max_price = data.body.data.max_price;
            this.min_price = data.body.data.price;
            this.sale_num = data.body.data.sale_num;
            this.models = data.body.data.models;
            this.choose_item=this.models[0].name;
            this.select_price=this.models[0].price;
            this.desc = data.body.data.desc;
            this.detailimgs = data.body.data.detailimgs;
          })
        }
        document.getElementById("index_loading").style.display="none";
      },
      methods:{
        ...mapMutations([
          'RESET_STORE1',
        ]),
        swiperChange(){

        },
        reduceNum(){
          if(this.num>1){
            this.num--;
          }
        },
        addNum(){
          this.num++;
        },
        addCartNum(goods_id,model_id){
          for(let i=0;i<this.cartList1.length;i++){
            console.log(this.cartList1[i].goods_id);
            if(goods_id==this.cartList1[i].goods_id){
              for(let j=0;j<this.cartList1[i].models.length;j++){
                if(model_id==this.cartList1[i].models[j].modelid){
                  this.cartList1[i].models[j].len+=1;
                  this.totalNum+=1;
                  this.totalPrice+=parseFloat(this.cartList1[i].models[j].price);
                }
              }
            }
          }
        },
        reduceCartNum(goods_id,model_id){
          let mark=0;
          for(let i=0;i<this.cartList1.length;i++){
            console.log(this.cartList1[i].goods_id);
            if(goods_id==this.cartList1[i].goods_id){
              for(let j=0;j<this.cartList1[i].models.length;j++){
                if(model_id==this.cartList1[i].models[j].modelid){
                  this.cartList1[i].models[j].len-=1;
                  this.totalNum-=1;
                  this.totalPrice-=parseFloat(this.cartList1[i].models[j].price);
                }
                console.log("this.cartList1[i].models[j].len"+this.cartList1[i].models[j].len);
                if(this.cartList1[i].models[j].len===0){
//                      this.cartList1[i].models.splice(j,1);
                }else{
                  mark=1;
                }
              }
            }
          }
          console.log(mark);
          if(mark!==1){
            this.togglecartList();
          }
        },
        get_orderNum(){
          console.log(456)
          if(service_url){
            const send_data={
              data:this.cartList1
            };
            this.$http.post(service_url+"/o2o/shop/wx/freedownorder.do",send_data).then((data)=>{
              if(data.body.status===0){
                let ordernums=JSON.stringify(data.body.ordernums);
                this.$router.push({path:"/goods_order",query:{type:1,ordernum:ordernums}});
              }
            });
          }else{
            this.$http.get("/api/bld_index").then((data)=>{
              this.menuList=data.body.data.data;
              // this.hideLoading();
            });
          }
        },
        addToCart(){
          let obj={};
          this.show_goods.models.forEach((items,index) => {
            if(items.name===this.choose_item){
              obj=this.show_goods.models[index];
            }
          });
          if(this.cartList1.length){
            this.cartList1.every(items => {
              if(items.goods_id == this.show_goods.goods_id) {
                items.models.every(item => {
                  if(item.name===this.choose_item){
                    item.len+=this.num;
                    this.totalNum+=this.num;
                    this.totalPrice+=this.num*parseFloat(item.price);
                    return false;
                  }else{
                    obj.len=this.num;
                    this.totalNum+=this.num;
                    this.totalPrice+=this.num*parseFloat(obj.price);
                    items.models.push(obj);
                    return false;
                  }
                });
                return false;
              }else{
                let goods_obj={};
                Object.assign(goods_obj, this.show_goods);
                goods_obj.models=[];
                obj.len=this.num;
                this.totalNum+=this.num;
                this.totalPrice+=this.num*parseFloat(obj.price);
                goods_obj.models.push(obj);
                this.cartList1.push(goods_obj);
                return false;
              }
            })
          }else{
            let goods_obj={};
            Object.assign(goods_obj, this.show_goods);
            goods_obj.models=[];
            obj.len=this.num;
            this.totalNum+=this.num;
            this.totalPrice+=this.num*parseFloat(obj.price);
            goods_obj.models.push(obj);
            this.cartList1.push(goods_obj);
          }
          this.popup_model=false;
//          window.sessionStorage.setItem("totalPrice",this.totalPrice)
//          window.sessionStorage.setItem("totalNum",this.totalNum)

        },
        itemclick(val){
          this.choose_item=val;
          for(let i = 0;i<this.show_goods.models.length;i++){
            if(val===this.show_goods.models[i].name){
              this.select_price=this.show_goods.models[i].price;
            }
          }
        },
        show_cart(){
            this.popup_model=true;
        },
        togglecartList(){
          this.cartList1.length ? this.showcartList = !this.showcartList : true;
        },
        clearCart(){
          this.RESET_STORE1();
          this.totalNum=0;
          this.totalPrice=0;
          this.popup_model=false;
        }
      }
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
  .border_add{
    color:#3190e8;
    border-radius:.6rem;
    padding:.1rem .6rem;
    border:1px solid #999;
    text-align:right;
  }
  .tw_detail{
    padding:.3rem .5rem;
    border-top:1px solid #ececec;
  }
  .w_detail{
    border-radius: .2rem;
    border: 1px solid purple;
    padding: .2rem;
    font-size:.45rem;
    background-color: rgba(234, 213, 104, 0.18);
  }
  .padding_bottom{
    padding-bottom:1.3rem;
  }
</style>
