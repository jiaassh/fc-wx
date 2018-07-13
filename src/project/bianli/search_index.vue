<template>
  <div>
    <search style="position:fixed;top:0;z-index:1" @on-submit="onSubmit" v-model="search_index" @on-cancel="onCancel"></search>
    <div style="margin-top:44px;">
      <section v-for="(foods,foodindex) in menuList" :key="foodindex" class="menu_detail_list">
        <router-link :to="{path: 'goods_detail', query:{goods_id:foods.goods_id}}" tag="div" class="menu_detail_link">
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
          <!--<cart :foods='foods' @toggleCart="toggleCart" @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></cart>-->
          <cart :foods='foods' @toggleCart="toggleCart" @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun" @reduceCart="showReduceFun"></cart>
          <!--<buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>-->
        </footer>
      </section>
      <transition name="toggle-cart">
        <section class="cart_food_list" v-show="showcartList&&cartList1.length">
          <header>
            <h4>购物车</h4>
            <div @click="clearCart">
              <span class="clear_cart">清空</span>
            </div>
          </header>
          <section class="cart_food_details" id="cartFood">
            <div v-for="items in cartList1">
              <div style="padding:10px 15px;border-bottom:1px solid #ececec;" class="weui_flex" v-for="item in items.models" v-if="item.len>0">
                <div style="width:4rem">
                  <div>{{items.name}}</div>
                  <div style="font-size:.35rem;color:#999;">{{item.name}}</div>
                </div>
                <div class="bld_food_price" style="flex:1">
                  <span style="width:.5rem"></span>{{item.price}}</div>
                <div>
                  <transition name="showReduce">
                    <a @click="reduceCartNum(items.goods_id,item.modelid)">
                      <svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem">
                        <defs></defs>
                        <path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path>
                      </svg>
                    </a>
                  </transition>
                  <span style="vertical-align: super;font-size:20px;">{{item.len}}</span>
                  <a @click="addCartNum(items.goods_id,item.modelid)">
                    <svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem">
                      <defs></defs>
                      <path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path>
                    </svg>
                  </a>
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
            <img v-if="totalNum" style="width:100%;height:100%;" src="../../../static/img/cart_hc.png" />
            <img v-else style="width:100%;height:100%;" src="../../../static/img/cart_nc.png" />
          </div>
          <div class="bld_cart_num">
            <div :style="{color: totalPrice? 'red':'#999'}" :class="{bld_food_price:totalPrice}">¥ {{totalPrice?totalPrice:"未选购商品"}}</div>
          </div>
        </section>
        <div @click="get_orderNum" :class="{gotopay_button_style:true,gotopay_choose:totalPrice}">选好了</div>
      </section>
    </div>
    <popup v-model="popup_model" position="bottom" style="background-color:white">
      <div class="bld_img_border">
        <div style="width:120px;height:120px;">
          <img class="object_fit" style="width:100%;height:100%;" :src="show_goods.img" />
        </div>
      </div>
      <div style="display:inline-block;vertical-align: top;padding:10px;">
        <div style="font-size:16px;">{{show_goods.name}}</div>
        <div style="font-size:25px;color:red">
          <span style="font-size:18px">￥</span>{{show_goods.select_price?show_goods.select_price:choose_price}}</div>
        <div style="font-size:14px;color:#999">{{choose_item?"已选'"+choose_item+"'":'请选择规格'}}</div>
      </div>
      <div style="padding:0 0 10px;margin:0 10px;border-top:1px solid #ececec;">
        <p style="padding: 5px;color:black">规格</p>
        <checker v-model="choose_item" default-item-class="bld-item" selected-item-class="bld-item-selected">
          <checker-item v-for="item in show_goods.models" style="margin-bottom: 5px;" :key="item.name" :value="item.name" @on-item-click="itemclick">{{item.name}}</checker-item>
        </checker>
      </div>
      <!--<x-number :title="num_title" v-model="roundValue" :min="1" @on-change="change"></x-number>-->
      <div style="display:flex;padding:10px 0 5px;margin:0 10px;border-top:1px solid #ececec;border-bottom:1px solid #ececec;">
        <div style="flex:1;">数量</div>
        <div style="text-align: right;">
          <transition name="showReduce">
            <a @click="reduceNum">
              <svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                <defs></defs>
                <path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path>
              </svg>
            </a>
          </transition>
          <span style="vertical-align: super;font-size:20px;margin:0 5px;">{{num}}</span>
          <a @click="addNum">
            <svg class="bld_border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
              <defs></defs>
              <path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="bld_confirm_button" @click="addToCart">加入购物车</div>
    </popup>
    <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="item">
      <div class="move_dot" v-if="item">
        <div class="move_liner">
          <span style="display:inline-block;background-color:#2196f3;width:12px;height:12px;border-radius:50%"></span>
        </div>
      </div>
    </transition>
    <loading v-model="showLoading"></loading>
  </div>
</template>
<script>
import { Loading, Search, Popup, Checker, CheckerItem } from 'vux';
import { mapState, mapMutations } from 'vuex'
import Cart from '@/components/buyCart/cart1';
import { setTitle } from '@/common/js/common';
export default {
  data() {
    return {
      menuList: [],
      search_index: " ",
      pageno: 0,
      pagesize: 4,
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      showLoading: false,
      num: 1,  //购物车打开默认商品数量
      popup_model: false,
      choose_item: "",
      choose_price: "",
      totalNum: 0,
      totalPrice: 0,
      show_goods: [],
      showcartList: false,
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
    }
  },
  computed: {
    ...mapState([
      'cartList1'
    ])
  },
  methods: {
    ...mapMutations([
      'RESET_STORE1',
    ]),
    onCancel() {
      this.$router.go(-1);
    },
    onSubmit(val) {
      this.search_index = val.trim();
      this.pageno = 0;
      this.getList();
    },
    getList() {
      const senddata = {
        "data": {
          "pageno": this.pageno,
          "pagesize": this.pagesize,
          "sort": 0,
          "rack": 0,
          "searchdata": this.search_index,
          "tag": 2
        }
      };
      // if(service_url){
      // this.$http.post(service_url+'/o2o/shop/wx/indexinfo.do',senddata).then( (data)=> {
      this.$http.post('http://192.168.0.145:8090/o2o/shop/wx/indexinfo.do', senddata).then((data) => {
        console.log(data)
        if (data.body.status === 0) {
          this.totalpage = data.body.totalpage;
          this.menuList = data.body.fields.goodsList;
        } else {

        }
      })
      // }else{
      //   this.$http.get('/api/goodsIndex').then((data) => {
      //     this.totalpage=data.body.data.totalpage;
      //     this.menuList=data.body.data.fields.goodsList;
      //     console.log(this.menuList);
      //   })
      // }
    },
    toggleCart(bool, goods) {
      this.popup_model = bool;
      this.show_goods = goods;
      this.num = 1;
      this.choose_item = goods.models[0].name;
      this.choose_price = goods.models[0].price;
    },
    listenInCart() {
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
    showChooseList() {

    },
    showReduceTip() {

    },
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.totalNum = 0;
      this.totalPrice = 0;
      /*this.cartList1.forEach(items => {
       items.models.forEach(item => {

       this.totalNum+=item.len;
       console.log(this.totalNum);
       })
       });*/
      for (let i = 0; i < this.cartList1.length; i++) {
        for (let j = 0; j < this.cartList1[i].models.length; j++) {
          this.totalNum += this.cartList1[i].models[j].len;
          this.totalPrice += this.cartList1[i].models[j].len * parseFloat(this.cartList1[i].models[j].price);
        }
      }
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
      //        window.sessionStorage.setItem("totalPrice",this.totalPrice)
      //        window.sessionStorage.setItem("totalNum",this.totalNum)
    },
    reduceNum() {
      if (this.num > 1) {
        this.num--;
      }
    },
    addNum() {
      this.num++;
    },
    afterEnter(el) {
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
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${27 + this.elBottom - this.windowHeight}px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
      el.children[0].style.opacity = 0;
    },
    addToCart() {
      let obj = {};
      this.show_goods.models.forEach((items, index) => {
        if (items.name === this.choose_item) {
          obj = this.show_goods.models[index];
        }
      });
      if (this.cartList1.length) {
        this.cartList1.every(items => {
          if (items.goods_id == this.show_goods.goods_id) {
            items.models.every(item => {
              if (item.name === this.choose_item) {
                item.len += this.num;
                this.totalNum += this.num;
                this.totalPrice += this.num * parseFloat(item.price);
                return false;
              } else {
                obj.len = this.num;
                this.totalNum += this.num;
                this.totalPrice += this.num * parseFloat(obj.price);
                items.models.push(obj);
                return false;
              }
            });
            return false;
          } else {
            let goods_obj = {};
            Object.assign(goods_obj, this.show_goods);
            goods_obj.models = [];
            obj.len = this.num;
            this.totalNum += this.num;
            this.totalPrice += this.num * parseFloat(obj.price);
            goods_obj.models.push(obj);
            this.cartList1.push(goods_obj);
            return false;
          }
        })
      } else {
        let goods_obj = {};
        Object.assign(goods_obj, this.show_goods);
        goods_obj.models = [];
        obj.len = this.num;
        this.totalNum += this.num;
        this.totalPrice += this.num * parseFloat(obj.price);
        goods_obj.models.push(obj);
        this.cartList1.push(goods_obj);
      }
      console.log(this.cartList1);
      this.popup_model = false;
      //        window.sessionStorage.setItem("totalPrice",this.totalPrice)
      //        window.sessionStorage.setItem("totalNum",this.totalNum)
    },
    itemclick(val) {
      this.choose_item = val;
      for (let i = 0; i < this.show_goods.models.length; i++) {
        if (val === this.show_goods.models[i].name) {
          this.show_goods.select_price = this.show_goods.models[i].price;
        }
      }
    },
    togglecartList() {
      this.cartList1.length ? this.showcartList = !this.showcartList : true;
    },
    clearCart() {
      this.RESET_STORE1();
      this.totalNum = 0;
      this.totalPrice = 0;
      this.popup_model = false;
    },
    reduceCartNum(goods_id, model_id) {
      let mark = 0;
      for (let i = 0; i < this.cartList1.length; i++) {
        if (goods_id == this.cartList1[i].goods_id) {
          for (let j = 0; j < this.cartList1[i].models.length; j++) {
            if (model_id == this.cartList1[i].models[j].modelid) {
              this.cartList1[i].models[j].len -= 1;
              this.totalNum -= 1;
              this.totalPrice -= parseFloat(this.cartList1[i].models[j].price);
               this.totalPrice=this.totalPrice.toFixed(2)
              if(this.totalPrice==0){
                this.totalPrice=0
              }
            }
            if (this.cartList1[i].models[j].len === 0) {
            } else {
              mark = 1;
            }
          }
        }
      }
      if (mark !== 1) {
        this.togglecartList();
      }
    },
    addCartNum(goods_id, model_id) {
      for (let i = 0; i < this.cartList1.length; i++) {
        console.log(this.cartList1[i].goods_id);
        if (goods_id == this.cartList1[i].goods_id) {
          for (let j = 0; j < this.cartList1[i].models.length; j++) {
            if (model_id == this.cartList1[i].models[j].modelid) {
              this.cartList1[i].models[j].len += 1;
              this.totalNum += 1;
              this.totalPrice += parseFloat(this.cartList1[i].models[j].price);
            }
          }
        }
      }
    },
    get_orderNum() {
      if (this.totalPrice > 0) {
        if (service_url) {
          const send_data = {
            data: this.cartList1
          };
          this.$http.post(service_url + "/o2o/shop/wx/freedownorder.do", send_data).then((data) => {
            if (data.body.status === 0) {
              let ordernums = JSON.stringify(data.body.ordernums);
              this.$router.push({ path: "/goods_order", query: { type: 1, ordernum: ordernums } });
            }
          });
        } else {
          this.$http.get("/api/bld_index").then((data) => {
            this.menuList = data.body.data.data;
            this.hideLoading();
          });
        }
      }
    },
    hideLoading() {
      this.showLoading = false;
    },
      //goods_index过来的
  showReduceFun() {
      if (this.totalNum > 0) {
        this.calcu();
      } else {
        this.RESET_STORE1();
        this.totalNum = 0;
        this.totalPrice = 0;
      }
    },
    calcu() {
      this.totalNum = 0;
      this.totalPrice = 0;
      for (let i = 0; i < this.cartList1.length; i++) {
        for (let j = 0; j < this.cartList1[i].models.length; j++) {
          this.totalNum += this.cartList1[i].models[j].len;
          this.totalPrice += this.cartList1[i].models[j].len * parseFloat(this.cartList1[i].models[j].price);
        }
      }
    }
  },
  components: {
    Loading, Search, Cart, Popup, Checker, CheckerItem
  },
  mounted() {
    //    this.totalPrice=window.sessionStorage.getItem("totalPrice")?parseFloat(window.sessionStorage.getItem("totalPrice")):0;
    //    this.totalNum=window.sessionStorage.getItem("totalNum")?parseFloat(window.sessionStorage.getItem("totalPrice")):0;
    setTitle("商品搜索");
    if (this.cartList1.length > 0) {
      for (let i = 0; i < this.cartList1.length; i++) {
        for (let j = 0; j < this.cartList1[i].models.length; j++) {
          this.totalNum += this.cartList1[i].models[j].len;
          this.totalPrice += this.cartList1[i].models[j].len * parseFloat(this.cartList1[i].models[j].price);
        }
      }
    }
    document.getElementById("index_loading").style.display = "none";
  },
}
</script>
<style scoped>
.description_foodname {
  height: auto;
  font-size: 100%;
}
</style>

<style>
.menu_detail_list {
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #f8f8f8;
  position: relative;
  overflow: hidden;
}

.menu_detail_link {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.menu_food_img {
  margin-right: .2rem;
}

.menu_food_img img {
  width: 2rem;
  height: 2rem;
  display: block;
  border-radius: 10px;
}

.food_price {
  font-size: 20px;
  color: red;
}

.move_dot {
  position: fixed;
  bottom: 30px;
  left: 30px;
}

.move_dot svg {
  width: 15px;
  height: 15px;
  fill: #3190e8;
}

.food_description_content {
  font-size: 14px;
  color: #999;
}

.more_model {
  float: right;
  font-size: 14px;
  height: 24px;
  padding: 2px;
  border-radius: 5px;
  border: 1px solid #2196f3;
  color: #2196f3;
}
</style>
