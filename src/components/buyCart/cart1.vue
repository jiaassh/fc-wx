 <template>
    <!--<section class="cart_module">
        <section v-if="!foods.specifications.length" class="cart_button">
            <transition name="showReduce">
                <span @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)" v-if="foodNum">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
            </transition>
            <svg class="add_icon" @touchstart="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
            </svg>
        </section>
        <section v-else class="choose_specification">
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
            </section>
        </section>
    </section>-->
   <div>
      <section v-if="foods.models.length===1">
        <transition v-if="showReduce" name="showReduce">
          <a @click="reduceCart(foods)"><svg class="border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></a>
        </transition>
        <span style="vertical-align: super;font-size:20px;">{{num?num:""}}</span>
        <!--<span style="vertical-align: super;font-size:20px;">{{foodNum}}</span>-->
        <!--<span v-else style="vertical-align: super;font-size:20px;">{{num?num:""}}</span>-->
          <a @click="addToCart(foods)"><svg class="border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
      </section>
     <section v-else>
       <transition v-if="showReduce" name="showReduce">
         <a @click="toggleCart(foods)"><svg class="border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg></a>
       </transition>
       <span style="vertical-align: super;font-size:20px;">{{num?num:""}}</span>
       <a @click="toggleCart(foods)"><svg class="border" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".6rem" height=".6rem"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
     </section>
   </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
    	data(){
            return{
               showMoveDot: [], //控制下落的小圆点显示隐藏
               showReduce:false,
                num:0
            }
        },
        mounted(){
        },
        computed: {
            ...mapState([
                'cartList1'
            ])
        },
        props:['foods'],
        methods: {
            //移出购物车
            removeOutCart(){

            },
            //加入购物车，计算按钮位置。
            addToCart(foods){
                console.log(1789)
                let goods = {};
                Object.assign(goods, foods);
                let mark =0;
                this.showReduce=true;
                this.num++;
                if(this.cartList1.length===0){
                  goods.models[0].len=0;
                  goods.models[0].len+=1;
                  this.cartList1.push(goods);
                }else{
                  this.cartList1.forEach(items => {
                    if(items.goods_id==goods.goods_id) {
                      items.models.forEach(item => {
                        item.len++;
                      });
                      mark = 1;
                    }
                  })
                  if(mark===0){
                    goods.models[0].len=this.num;
                    this.cartList1.push(goods);
                  }
                }

                let elLeft = event.target.getBoundingClientRect().left;
                let elBottom = event.target.getBoundingClientRect().bottom;
                this.showMoveDot.push(true);
                this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);
            },
            reduceCart(foods){
                console.log(369)
              this.num--;
              console.log(this.num)
              if(this.num===0){
                this.showReduce=false;
              }
              console.log(this.cartList1)
              this.cartList1.forEach(items => {
                if(items.goods_id==foods.goods_id) {
                  items.models.forEach(item => {
                    item.len--;
                  });
                }
              });
              
              this.$emit('reduceCart');
            },
            toggleCart(foods){
              this.$emit('toggleCart', true,foods)
            },
            //显示规格列表
            showChooseList(foodScroll){
                this.$emit('showChooseList', foodScroll)
            },
            //点击多规格商品的减按钮，弹出提示
            showReduceTip(){
                this.$emit('showReduceTip')
            },

        },
    }
</script>

<style scoped>
  .border{
    border:1px solid #999;
    padding:3px;
    border-radius:25%;
    fill:#2196f3;
  }
</style>

