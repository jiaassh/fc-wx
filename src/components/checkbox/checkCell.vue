<template>
  <div>
    <div class="po_bg_white font_0_4" @click="change_state">
      <div class="cell_margin po_flex cell_padding" :class="{po_border_bottom: showBorder}">
        <div v-if="showImg" class="cc_img">
          <img :src = "imgSrc"/>
        </div>
        <div class="cell_flex_1">
          <div>{{title}}</div>
          <div class="cc_inline font_0_3">{{inlineText}}</div>
        </div>
        <div class="squered">
          <input type = "checkbox" value="" name="check"/>
          <label :class="{cc_checked: checked, cc_unchecked: !checked}"></label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      props: {
        title: {
          type: String
        },
        inlineText: {
          type: String
        },
        checked: {
          type: Boolean,
          default: false
        },
        showBorder: {
          type: Boolean,
          default: true
        },
        type: {
          type: String
        },
        checkId: {
          type: Number
        },
        showImg: {
          type: Boolean,
          defalut:false
        },
        imgSrc: {
          type: String
        }
      },
      methods: {
        change_state () {
          this.$emit('changeState', this.checkId, this.type)
        }
      }
    }
</script>
<style scoped>
  .squered{
    position:relative;
  }
  .squered input{
    visibility: hidden;
  }
  .squered label{
    top: -.1rem;
    left: -.26rem;
    height:.587rem;
    width: .587rem;
    border-radius: 50%;
    position:absolute;
  }
  .squered label::after{
    content: '';
    width: .3rem;
    height: .125rem;
    position:absolute;
    top: .2rem;
    left: .13rem;
    border:1.5px solid #fcfff4;
    border-top:none;
    border-right:none;
    background:transparent;
    opacity:1;
    transform:rotate(-45deg)
  }
  .cc_checked{
    background-color: #ad7de7;
    border:1px solid #ad7de7;
  }
  .cc_unchecked{
    border:1px solid #e5e5e5;
  }
  .cell_flex_1{
    flex: 1;
  }
  .cell_padding{
    padding:.35rem .4rem .35rem 0;
  }
  .cell_margin{
    margin-left: .4rem;
  }
  .cc_inline{
    margin-top:.1rem;
    color:#888;
    font-size:.37rem;
  }
  .po_flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .po_bg_white{
    background-color:white;
  }
  .po_border_bottom{
    border-bottom:1px solid #e5e5e5;
  }
  .cc_img {
    width:1.2rem;
    height:1.2rem;
    margin-right:.4rem;
  }
  .cc_img img{
    width: 100%;
    height: 100%;
  }
</style>
