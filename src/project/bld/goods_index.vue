<!--博联商城的商品首页-->
<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <!--搜索框-->
      <search style="position:fixed;top:0;z-index:1" @on-focus="onFocus"></search>
      <section style="margin-top:45px;">
        <img style="width: 100%;height:100%;" src="../../../static/img/banner.jpg"/>
      </section>
      <section class="food_container">
        <section class="menu_container">
          <!--左侧类别栏-->
          <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
            <ul>
              <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                <span>{{item.rack_name}}</span>
                <!--<span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>-->
              </li>
            </ul>
          </section>
          <!--右侧商品数据栏-->
          <section class="menu_right" ref="menuFoodList">
            <ul style="padding-bottom:100px;">
              <li v-for="(item,index) in menuList" :key="index">
                <header class="menu_detail_header">
                  <section class="menu_detail_header_left">
                    <strong class="menu_item_title">{{item.rack_name+"("+item.goods.length+")"}}</strong>
                  </section>
                </header>
                <section v-for="(foods,foodindex) in item.goods" :key="foodindex" class="menu_detail_list">
                  <router-link  :to="{path: 'goods_detail', query:{goods_id:foods.goods_id}}" tag="div" class="menu_detail_link">
                    <section class="menu_food_img">
                      <img :src="foods.img" class="object_fit">
                    </section>
                    <section class="menu_food_description">
                      <h3 class="food_description_head">
                        <strong class="description_foodname">{{foods.name}}</strong>
                        <span v-if="foods.models.length>1" class="bld_more_model">多规格</span>
                      </h3>
                      <p class="food_description_content">月销{{foods.sale_num}}笔</p>
                    </section>
                  </router-link>
                  <footer class="menu_detail_footer">
                    <section class="bld_food_price">
                      <span style="font-size:16px;">¥</span>
                      <span>{{foods.price}}</span>
                    </section>
                    <!--购物车增加减少组件-->
                    <cart :foods='foods' @toggleCart="toggleCart" @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun" @reduceCart="showReduceFun"></cart>
                    <!--<buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>-->
                  </footer>
                </section>
              </li>
            </ul>
          </section>
        </section>
        <!--购物车列表栏-->
        <transition name="toggle-cart">
          <section class="cart_food_list" v-show="showCartList&&cartList.length">
            <header>
              <h4>购物车</h4>
              <div @click="clearCart">
                <span class="clear_cart">清空</span>
              </div>
            </header>
            <section class="cart_food_details" id="cartFood">
              <div v-for="items in cartList" >
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
          <div class="screen_cover" v-show="showCartList&&cartList.length" @click="toggleCartList"></div>
        </transition>
        <section class="buy_cart_container">
          <section @click="toggleCartList" class="cart_icon_num">
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
            <div @click="get_orderNum" :class="{gotopay_button_style:true,gotopay_choose:totalPrice}">选好了</div>
        </section>
      </section>
    </section>

    <popup v-model="popup_model" position="bottom" style="background-color:white">
      <div class="bld_img_border">
        <div style="width:120px;height:120px;">
          <img class="object_fit" style="width:100%;height:100%;"
               :src="show_goods.img"/>
        </div>
      </div>
      <div style="display:inline-block;vertical-align: top;padding:10px;">
        <div style="font-size:16px;width:160px;" class="text_ellipsis">{{show_goods.name}}</div>
        <div style="font-size:25px;color:red"><span style="font-size:18px">￥</span>{{show_goods.select_price?show_goods.select_price:choose_price}}</div>
        <div style="font-size:14px;color:#999;width:160px;" class="text_ellipsis">{{choose_item?"已选'"+choose_item+"'":'请选择规格'}}</div>
      </div>
      <div style="padding:0 0 10px;margin:0 10px;border-top:1px solid #ececec;">
        <p style="padding: 5px;color:black">规格</p>
        <checker
          v-model="choose_item"
          default-item-class="bld-item"
          selected-item-class="bld-item-selected">
          <checker-item  v-for="item in show_goods.models" style="margin-bottom: 5px;" :key="item.name" :value="item.name" @on-item-click="itemclick">{{item.name}}</checker-item>
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
  import {Loading,Search,Popup,XNumber,Checker,CheckerItem} from 'vux';
  import BScroll from 'better-scroll'
  import {mapState, mapMutations} from 'vuex'
  import Cart from '@/components/buyCart/cart';
  import {setTitle} from '@/common/js/common';

  export default{
      data(){
          return{
            showLoading: true, //显示加载动画
            menuIndex:0,        //已选菜单索引值，默认为0
            menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
            foodScroll: null,  //食品列表scroll
            cartFoodList: [], //购物车商品列表
            receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
            shopListTop: [], //商品列表的高度集合
            windowHeight: null, //屏幕的高度
            showMoveDot: [], //控制下落的小圆点显示隐藏
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
            popup_model:false,//购物车是否上拉
            menuList:[],         //食品列表
            show_goods:{}    ,   //购物车下拉条展示的商品
            choose_item:""    ,   //选中的那条
            choose_price:""    ,   //选中的那条价格
            totalNum:0,
            totalPrice:0,
            num:1    ,   //选中的那条
            showCartList:false
          }
      },
      mounted(){
        setTitle("博联智能家居");
        document.getElementById("index_loading").style.display="none";
//        this.totalPrice=window.sessionStorage.getItem("totalPrice")?parseFloat(window.sessionStorage.getItem("totalPrice")):0;
//        this.totalNum=window.sessionStorage.getItem("totalNum")?parseFloat(window.sessionStorage.getItem("totalPrice")):0;
        if(this.cartList.length>0){
          for(let i=0;i<this.cartList.length;i++){
            for(let j=0;j<this.cartList[i].models.length;j++){
              this.totalNum+=this.cartList[i].models[j].len;
              this.totalPrice+=this.cartList[i].models[j].len*parseFloat(this.cartList[i].models[j].price);
            }
          }
        }
        this.initData();
        this.windowHeight = window.innerHeight;
      },
      computed: {
        ...mapState([
          'cartList'
        ])
      },
      components:{
        Loading ,Search,Cart,Popup,XNumber,Checker,CheckerItem
      },
      methods:{
        ...mapMutations([
          'RESET_STORE',
        ]),
        chooseMenu(index){
          this.menuIndex = index;
          //menuIndexChange解决运动时listenScroll依然监听的bug
          this.menuIndexChange = false;
          this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
          this.foodScroll.on('scrollEnd', () => {
            this.menuIndexChange = true;
          })
        },
        initData(){
          this.getMenuList();
        },
        getMenuList(){
          console.log(123)
          if(service_url){
            console.log(service_url,1)
            this.$http.get(service_url+"/o2o/shop/wx/selectFreeStore.do").then((data)=>{
              this.menuList=data.body.data;
              this.hideLoading();
            });
            }else{
              this.$http.get("/api/bld_index").then((data)=>{
                console.log(data,1)
                this.menuList=data.body.data.data;
                this.hideLoading();
              });
            }

        },
        hideLoading(){
          this.showLoading=false;
        },
        shopCart: function (){

        },
        onFocus(){
          this.$router.push({path:"search_index"});
        },
        //获取食品列表的高度，存入shopListTop
        getFoodListHeight(){
          const listContainer = this.$refs.menuFoodList;
          const listArr = Array.from(listContainer.children[0].children);
          listArr.forEach((item, index) => {
            this.shopListTop[index] = item.offsetTop;
          });
          this.listenScroll(listContainer)
        },
        initCategoryNum(){

        },
        toggleCartList(){
//          this.showCartList=!!this.cartList.length;
          this.cartList.length ? this.showCartList = !this.showCartList : true;
        },
        //清除购物车
        clearCart(){
          this.RESET_STORE();
          this.totalNum=0;
          this.totalPrice=0;
          this.popup_model=false;
        },
        //监听圆点是否进入购物车
        listenInCart(){
          if (!this.receiveInCart) {
            this.receiveInCart = true;
            this.$refs.cartContainer.addEventListener('animationend', () => {
              this.receiveInCart = false;
            })
            this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
              this.receiveInCart = false;
            })
          }
        },
        //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
        listenScroll(element){
          this.foodScroll = new BScroll(element, {
            probeType: 3,
            deceleration: 0.001,
            bounce: false,
            swipeTime: 2000,
            click: true,
          });

          const wrapperMenu = new BScroll('#wrapper_menu', {
            click: true,
          });

          const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
          this.foodScroll.on('scroll', (pos) => {
            if (!this.$refs.wrapperMenu) {
              return
            }
            this.shopListTop.forEach((item, index) => {
              if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                this.menuIndex = index;
                const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');

                const el = menuList[0];
                wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
              }
            })
          })
        },
        showChooseList(){

        },
        showReduceTip(){

        },
        addCartNum(goods_id,model_id){
          for(let i=0;i<this.cartList.length;i++){
              if(goods_id==this.cartList[i].goods_id){
                for(let j=0;j<this.cartList[i].models.length;j++){
                    if(model_id==this.cartList[i].models[j].modelid){
                      this.cartList[i].models[j].len+=1;
                      this.totalNum+=1;
                      this.totalPrice+=parseFloat(this.cartList[i].models[j].price);
                    }
                }
              }
          }
        },
        calcu(){
          this.totalNum=0;
          this.totalPrice=0;
          for(let i=0;i<this.cartList.length;i++){
            for(let j=0;j<this.cartList[i].models.length;j++){
              this.totalNum+=this.cartList[i].models[j].len;
              this.totalPrice+=this.cartList[i].models[j].len*parseFloat(this.cartList[i].models[j].price);
            }
          }
        },
        showMoveDotFun(showMoveDot, elLeft, elBottom){
          this.calcu();
          this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
          this.elLeft = elLeft;
          this.elBottom = elBottom;
//          window.sessionStorage.setItem("totalPrice",this.totalPrice)
//          window.sessionStorage.setItem("totalNum",this.totalNum)
        },
        showReduceFun(){
          console.log(458)
            if(this.totalNum>0){
              this.calcu();
            }else{
              this.RESET_STORE();
              this.totalNum=0;
              this.totalPrice=0;
            }
        },
        afterEnter(el){
          el.style.transform = `translate3d(0,0,0)`;
          el.children[0].style.transform = `translate3d(0,0,0)`;
          el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
          el.children[0].style.transition = 'transform .55s linear';
          this.showMoveDot = this.showMoveDot.map(item => false);
          el.children[0].style.opacity = 1;
          el.children[0].addEventListener('transitionend', () => {
            this.listenInCart();
          });
          el.children[0].addEventListener('webkitAnimationEnd', () => {
            this.listenInCart();
          })
        },
        beforeEnter(el){
          el.style.transform = `translate3d(0,${27 + this.elBottom - this.windowHeight}px,0)`;
          el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
          el.children[0].style.opacity = 0;
        },
        toggleCart(bool,goods){
          this.popup_model=bool;
          this.show_goods=goods;
          this.num=1;
          this.choose_item=goods.models[0].name;
          this.choose_price=goods.models[0].price;
        },
        itemclick(val){
          this.choose_item=val;
          for(let i = 0;i<this.show_goods.models.length;i++){
            if(val===this.show_goods.models[i].name){
              this.show_goods.select_price=this.show_goods.models[i].price;
            }
          }
        },
        reduceNum(){
            if(this.num>1){
              this.num--;
            }
        },
        addNum(){
          this.num++;
        },
        reduceCartNum(goods_id,model_id){
          let mark=0;
          for(let i=0;i<this.cartList.length;i++){
            if(goods_id==this.cartList[i].goods_id){
              for(let j=0;j<this.cartList[i].models.length;j++){
                if(model_id==this.cartList[i].models[j].modelid){
                  this.cartList[i].models[j].len-=1;
                  this.totalNum-=1;
                  this.totalPrice-=parseFloat(this.cartList[i].models[j].price);
                }
                if(this.cartList[i].models[j].len===0){
                    //  this.cartList[i].models.splice(j,1);
                }else{
                  mark=1;
                }
              }
            }
          }
          if(mark!==1){
            this.toggleCartList();
          }
        },
        addToCart(){
            let obj={};
          this.show_goods.models.forEach((items,index) => {
            if(items.name===this.choose_item){
              obj=this.show_goods.models[index];
            }
          });
          if(this.cartList.length){
            this.cartList.every(items => {
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
                this.cartList.push(goods_obj);
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
            this.cartList.push(goods_obj);
          }
          this.popup_model=false;
//          window.sessionStorage.setItem("totalPrice",this.totalPrice)
//          window.sessionStorage.setItem("totalNum",this.totalNum)
        },
        get_orderNum(){
          console.log(123)
            if(this.totalPrice>0){
              if(service_url){
                const send_data={
                  data:this.cartList
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
                  this.hideLoading();
                });
              }
            }

        },
      },
      watch: {
        //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
        showLoading: function (value) {
          if (!value) {
            this.$nextTick(() => {
              this.getFoodListHeight();
              this.initCategoryNum();
            })
          }
        },
        shopCart: function (value) {
          this.initCategoryNum();
        },
      }
  }
</script>

<style scoped>
  .shop_container{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
  }
  .food_container{
    margin-top:-.13rem;
    display: flex;
    flex: 1;
    padding-bottom: 1.3rem;
  }
  .menu_container {
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position: relative;
  }
  .menu_left{
    width: 2.1rem;
  }
  .menu_left_li{
    padding: .3rem .2rem .3rem .1rem;
    border-bottom: 0.025rem solid #ededed;
    box-sizing: border-box;
    font-size:.4rem;
    /*border-left: 0.15rem solid #f8f8f8;*/
    position: relative;
    text-align:center;
  }
  .activity_menu{
    border-left: 0.1rem solid #3190e8;
    background-color: #fff;

  }
  .activity_menu span:nth-of-type(1){
    color:#3190e8;
  }
  .menu_right {
    flex: 4;
    overflow-y: auto;
  }
  .menu_detail_header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    width: 100%;
    padding: .2rem;
    position: relative;
    align-items: center;
  }
  .menu_detail_header_left{
    width: 7rem;
    white-space: nowrap;
    overflow: hidden;
  }
  .menu_item_title{
    font-size: 0.35rem;
    color: #666;
  }
</style>
