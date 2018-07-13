<template>
  <div id="flea_market">
    <!--<loading style="text-align: center;" v-if="loading"></loading>-->
    <loading v-model="isLoading" text="保存中"></loading>
    <div>
      <group v-if="enter_type===1" title="填写基本信息">
        <x-input labelWidth="6em" title="商品名称" placeholder="请输入商品名称" v-model="goods_name"></x-input>
        <cell labelWidth="6em" valueAlign="left" title="商品成色" @click.native="showDegree">
          <div slot="value">
            <span style="color: black">{{goods_degree}}</span>
          </div>
        </cell>
        <cell labelWidth="6em" valueAlign="left" title="商品分类" @click.native="showRack">
          <div slot="value">
            <span style="color: black">{{goods_rack}}</span>
          </div>
        </cell>
        <!-- <x-input labelWidth="6em" title="商品价格" placeholder="请输入商品价格(元)" keyboard="china-name" v-model="goods_price" @keyup.native="checknum(goods_price)" @on-blur="shijiao(goods_price)"></x-input> -->
        <x-input labelWidth="6em" title="商品价格" placeholder="请输入商品价格(元)" keyboard="china-name" v-model="goods_price" @on-change="checknum(goods_price)" @on-blur="shijiao(goods_price)"></x-input>
        <x-textarea id="miaoshu" title="详细描述" placeholder="请输入" :show-counter="false" :rows="3" v-model="goods_desc" autosize></x-textarea>
        <x-input labelWidth="6em" title="联系人" placeholder="请输入联系人" keyboard="china-name" v-model="user_name"></x-input>
        <x-input title="联系电话" labelWidth="6em" placeholder="请输入联系电话" keyboard="number" v-model="user_tel"></x-input>
      </group>
      <group title="基本信息" v-if='state==3'>
        <cell labelWidth="6em" valueAlign="left" title="商品名称" v-model="goods_name"></cell>
        <cell labelWidth="6em" valueAlign="left" title="商品成色" v-model="goods_degree"></cell>
        <cell labelWidth="6em" valueAlign="left" title="商品分类" v-model="goods_rack"></cell>
        <cell labelWidth="6em" valueAlign="left" title="商品价格" v-model="goods_price"></cell>
        <!--<x-textarea title="详细描述" placeholder="请输入" :show-counter="false" :rows="3" v-model="goods_desc" readonly
                      autosize></x-textarea>-->


        <div style="padding:10px 15px 10px 0;display:flex;margin-left:15px;border-top:1px solid #ececec;">
          <div>
            <label style="width:6em;display: block;">详细描述</label>
          </div>
          <span style="color:#999;">{{goods_desc}}</span>
        </div>
        <cell labelWidth="6em" valueAlign="left" title="联系人" v-model="user_name"></cell>
        <cell labelWidth="6em" valueAlign="left" title="联系电话" v-model="user_tel"></cell>
      </group>



      <group title="基本信息" v-if='state!=3&&enter_type!=1'>
        <!-- <cell labelWidth="6em" valueAlign="left" title="商品名称" v-model="goods_name"></cell> -->
        <x-input labelWidth="6em" title="商品名称" placeholder="请输入商品名称" v-model="goods_name"></x-input>
        <!-- <cell labelWidth="6em" valueAlign="left" title="商品成色" v-model="goods_degree"></cell> -->
        <cell labelWidth="6em" valueAlign="left" title="商品成色" @click.native="showDegree">
          <div slot="value">
            <span style="color: black">{{goods_degree}}</span>
          </div>
        </cell>
        <!-- <cell labelWidth="6em" valueAlign="left" title="商品分类" v-model="goods_rack"></cell> -->
        <cell labelWidth="6em" valueAlign="left" title="商品分类" @click.native="showRack">
          <div slot="value">
            <span style="color: black">{{goods_rack}}</span>
          </div>
        </cell>
        <!-- <cell labelWidth="6em" valueAlign="left" title="商品价格" v-model="goods_price"></cell> -->
        <x-input labelWidth="6em" title="商品价格" placeholder="请输入商品价格(元)" keyboard="china-name" v-model="goods_price" @on-change="checknum(goods_price)" @on-blur="shijiao(goods_price)"></x-input>
        <!--<x-textarea title="详细描述" placeholder="请输入" :show-counter="false" :rows="3" v-model="goods_desc" readonly
                      autosize></x-textarea>-->
        <!-- <div style="padding:10px 15px 10px 0;display:flex;margin-left:15px;border-top:1px solid #ececec;">
          <div>
            <label style="width:6em;display: block;">详细描述</label>
          </div>
          <span style="color:#999;">{{goods_desc}}</span>
        </div> -->
        <x-textarea id="miaoshu" title="详细描述" placeholder="请输入" :show-counter="false" :rows="3" v-model="goods_desc" autosize></x-textarea>
        <!-- <cell labelWidth="6em" valueAlign="left" title="联系人" v-model="user_name"></cell> -->
        <x-input labelWidth="6em" title="联系人" placeholder="请输入联系人" keyboard="china-name" v-model="user_name"></x-input>
        <!-- <cell labelWidth="6em" valueAlign="left" title="联系电话" v-model="user_tel"></cell> -->
        <x-input title="联系电话" labelWidth="6em" placeholder="请输入联系电话" keyboard="number" v-model="user_tel"></x-input>
      </group>


      
      <!--<group title="上传照片（最多可上传4张）">-->
      <!--<x-upload-->
      <!--fieldname=".png"-->
      <!--:items="goods_img"-->
      <!--typefieldid="j_images"-->
      <!--:max="4">-->
      <!--</x-upload>-->
      <!--</group>-->
      <uploadfield v-if="enter_type===1" fieldname="picurls" :fieldobj="picurls" :items="picurls" typefieldid="j_images" queryby="val" :max="4">
      </uploadfield>
      <group v-if='state==3&&enter_type!=1' title="商品图片">
        <div style="padding:10px 15px 5px ;">
          <img style="width:80px;height:80px;margin:0 5px 5px 0" class="previewer-demo-img object_fit" v-for="(item, index) in goods_img" :src="item.desc" width="100" @click="show(index)">
          <previewer :list="pic_list" ref="previewer" :options="options"></previewer>
        </div>
      </group>
      <!-- <uploadfield v-else fieldname="picurls" :items="goods_img" typefieldid="j_images" queryby="val" :max="4">
      </uploadfield> -->
       <div v-if="enter_type!=1">
          <!-- <div class="container">
            <div class="weui_cells_title">上传</div>
              <div class="weui_cells weui_cells_form">
                  <div class="weui_cell">
                      <div class="weui_cell_bd weui_cell_primary">
                          <div class="weui_uploader">
                              <div class="weui_uploader_hd weui_cell" style="padding-left:0">
                                  <div class="weui_cell_bd weui_cell_primary">图片上传</div>
                                  <div class="weui_cell_ft js_counter">{{goods_img.length}}/4</div>
                              </div>
                              <div class="weui_uploader_bd" style="overflow:visible">
                                  <ul class="weui_uploader_files">
                                      <li v-for='(item,index) in goods_img' style="position:relative" :key='index' class="weui_uploader_file weui_uploader_status">
                                        <img :src="item" style="width:100%;height:100%;position:absolute;" alt="">
                                        <icon type="cancel" style="position:absolute;top:0;right:0;transform:translateX(32%) translateY(-50%);z-index:2" @click.native='deleteimg(index)'></icon>
                                      </li>
                                  </ul>
                                  <div class="weui_uploader_input_wrp" v-show='imgsshow'>
                                      <input class="weui_uploader_input js_file"  @change='upimg' type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div> -->
    <loading v-model="isLoadingImg" text="上传中"></loading>
    <div id="uploadfield2" v-show='status==0?true:false'>
      <!-- <div class="weui-cells__title">
        选择上传图片（最多{{max}}张）
        <div style="float:right;">{{total}}/{{max}}</div>
      </div> -->
      <div class="weui-cells" style="margin-top:0.133rem;">
				<div class="weui-cells__title">
					<span style="font-size:0.373rem;color:#915BAF">选择上传图片（最多4张）</span>
        <div style="float:right;">{{editImgs.length}}/4</div>
      </div>
        <div class="weui-cell" id="uploadimg">
          <!--<div class="weui_cell_hd"><label class="weui_label" style="line-height: 16px;">拍照<br><span style="font-size:12px; color:#a5a5a5;">( 最多五张<br>可删除 )</span></label></div>-->
          <div class="weui_cell_bd weui_cell_primary">
            <div class="weui_cells weui_cells_form">
              <div class="weui_uploader">
                <div class="weui_uploader_bd2">
                  <ul class="weui_uploader_files2" id="j_imageitems">
                    <!-- <imageitem v-for="(item,index) in items" :index="index" :key="item.id" :item="item" v-on:deleteimage="deleteimage"  v-on:showplusaction="showplusaction" :fieldname="fieldname" :deleteimageaction="deleteimageaction" :clickzoominaction="clickzoominaction" :length="total" :max="max"></imageitem>
                    <div v-for="(item,index) in items" :index="index" :deleteimageaction="deleteimageaction" :clickzoominaction="clickzoominaction">
                    <li class="weui_uploader_file2 weui_uploader_status j_image_item" :style="{backgroundImage:'url('+item.desc+')'}" @click.stop="clickZoomIn(index)" id="my_weui_uploader" :filename="item.val">
                    <i class="weui_icon_clear2" style="position:absolute; right:-10px; top:-12px;z-index:80;" @click.stop="deleteimage(index)"></i>
                    </li>
                    <imagedialog v-if="dialogopen" :imagesrc="item.desc" ></imagedialog>
                    </div> -->
                      <div v-for="(item,index) in editImgs" :key="index">
                        <li class="weui_uploader_file2 weui_uploader_status j_image_item"  :style="{backgroundImage:'url('+item+')'}" @click.stop="clickZoomIn" id="my_weui_uploader" :filename="item.val">
                          <i class="weui_icon_clear2" style="position:absolute; right:-10px; top:-12px;z-index=10" @click.stop="deleteImage(index)"></i>
                        </li>
                        <!-- <imagedialog v-if="dialogopen" :imagesrc="item.desc" v-on:closesr="closesr"></imagedialog> -->
                      </div>
                  </ul>
                  <div class="weui_uploader_input_wrp2" id="j_weui_uploader_input_wrp2" v-show='editImgs.length>=4?false:true'>
                    <input class="weui_uploader_input" @change='upimg' id="j_fileupload" type="file" accept="image/*">
                  </div>
									
                </div>
              </div>
            </div>
          </div>
        </div>
				<p class="tips">上传清晰图片有助于维修师傅快速定位问题</p>
      </div>
    </div>
       </div>

       <div v-show="status==0?false:true">
           <div v-for="(item,index) in editImgs" :key="index" style="margin-left:5px;">
              <li class="weui_uploader_file2 weui_uploader_status j_image_item"  :style="{backgroundImage:'url('+item+')'}" id="my_weui_uploader" >
              </li>
            </div>
       </div>
      <div v-if="enter_type===1" style="margin:20px 10px 10px">
        <x-button class="zj_button" type="primary" @click.native="addMarket">发布</x-button>
      </div>
      <div v-if='state!=3&&enter_type!=1' style="margin:20px 10px 10px">
        <x-button class="zj_button" type="primary" @click.native="editsave">保存</x-button>
      </div>
      <!--<actionsheet v-model="show_rack" :menus="rack" @on-click-menu="click_rack"></actionsheet>-->
      <!--<actionsheet v-model="show_degree" :menus="degree_arr" @on-click-menu="click_degree"></actionsheet>-->
      <group gutter="0">
        <popup-picker :show="showPopupPicker" :show-cell="false" title="TEST" :data="[['1成新', '2成新', '3成新', '4成新', '5成新','6成新', '7成新', '8成新', '9成新', '10成新']]" @on-hide="showPopupPicker=false" @on-change="onChange"></popup-picker>
        <popup-picker :show="show_rack" :show-cell="false"  :data="rack" @on-hide="show_rack=false" @on-change="click_rack"></popup-picker>
      </group>
      <!--<actionsheet v-model="show_rack" :menus="rack" @on-click-menu="click_rack"></actionsheet>-->
    </div>
    <alert @on-hide='gohide' v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
    <loading v-model="isLoading" text="保存中"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
import lrz from "lrz";
import uploadfield from "../../components/uploadfield/uploadfield.vue";
import {
  Cell,
  Group,
  XInput,
  XButton,
  XTextarea,
  Actionsheet,
  Loading,
  Alert,
  Previewer,
  Toast,
  PopupPicker,
  Icon
} from "vux";
import { setTitle } from "@/common/js/common";
import { mapState } from "vuex";

export default {
  data() {
    return {
      state: "",
      status: null,
      isLoadingImg: false,
      editImgs: [],
      show_rack: false,
      type: 0,
      imglist: [],
      value5: [],
      imgsshow: true,
      rack: [],
      rackArr: [],
      goods_img: [], //新加的，保存的图片
      showPopupPicker: false,
      goods_name: "",
      goods_degree: "请选择商品新旧程度",
      goods_rack: "请选择分类",
      goods_price: "",
      user_name: "",
      user_tel: "",
      goods_desc: "",
      labelWidth: "6em",
      enter_type: 0,
      rack_key: 0,
      goods_id: [],
      show_degree: false,
      degree_arr: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      isLoading: false,
      confirm_show: false,
      dialog_title: "提示",
      confirm_content: "",
      pic_list: [],
      show_toast: false,
      toast_text: [],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  components: {
    Cell,
    Group,
    XInput,
    XButton,
    XTextarea,
    uploadfield,
    Actionsheet,
    Loading,
    Alert,
    Previewer,
    Toast,
    PopupPicker,
    Icon
  },
  watch: {
    goods_img(oldval, newval) {
      console.log(newval);
      if (newval.length === 4) {
        this.imgsshow = false;
      }
    }
  },
  computed: {
    ...mapState({
      picurls: state => state.picurls
    })
  },
  mounted() {
    this.enter_type = parseInt(this.$route.query.enter_type);
    this.status = parseInt(this.$route.query.status);
    //        this.enter_type===1?setTitle("发布商品"):setTitle("编辑商品");
    let self = this;
    if (this.enter_type === 1) {
      setTitle("发布商品");
      if (service_url) {
        this.$http
          .get(service_url + "/o2o/flea/wx/getInformation?vid="+userProfile.vid)
          .then(data => {
            if (data.body.result.status === 0) {
              this.rackArr = data.body.result.data.rack;
              let rackss = [];
              this.rackArr.forEach(v => {
                rackss.push(v.value);
              });
              this.rack.push(rackss);
              self.user_name = data.body.result.data.user_name;
              self.user_tel = data.body.result.data.user_tel;
            } else {
              this.confirm_content = data.body.result.error_reason;
              this.confirm_show = true;
            }
          });
      } else {
        this.$http.get("/api/published_detail").then(
          data => {
            self.rack = data.body.data.data.rack;
            self.user_name = data.body.data.data.user_name;
            self.user_tel = data.body.data.data.user_tel;
          },
          () => {
            console.log(2);
          }
        );
      }
    } else {
      setTitle("商品详情");
      if (service_url) {
        this.goods_id = this.$route.query.goods_id;

        //加的
        this.state = this.$route.query.state;
        console.log(this.state, "state");

        const senddata = {
          goods_id: this.goods_id
        };
        this.$http
          .get(service_url + "/o2o/flea/wx/getInformation?vid="+userProfile.vid)
          .then(data => {
            if (data.body.result.status === 0) {
              self.rackArr = data.body.result.data.rack;
              let rackss = [];
              self.rackArr.map(v => {
                rackss.push(v.value);
              });
              console.log(rackss);
              self.rack.push(rackss);
            } else {
              this.confirm_content = data.body.result.error_reason;
              this.confirm_show = true;
            }
          });
        this.$http
          .post(service_url + "/o2o/flea/wx/releaseDetails", senddata)
          .then(data => {
            if (data.body.result.status === 0) {
              let cid = data.body.result.data.cid;
              this.rack_key = cid;
              let arr_rack = data.body.result.data.sort;
              let json_rack = {};
              for (let j = 0; j < arr_rack.length; j++) {
                if (cid === arr_rack[j].key) {
                  self.goods_rack = arr_rack[j].value;
                }
                json_rack[arr_rack[j].key] = arr_rack[j].value;
              }
              // self.rack = json_rack;
              self.user_name = data.body.result.data.tname;
              self.user_tel = data.body.result.data.tel;
              self.goods_name = data.body.result.data.name;
              self.goods_degree = data.body.result.data.quality;
              self.goods_price = data.body.result.data.price;
              self.goods_desc = data.body.result.data.desc;
              self.goods_img = data.body.result.data.goods_img;
              self.editImgs = data.body.result.data.goods_img;
              let picurls = data.body.result.data.goods_img;
              let _arr_pic = [];
              for (let i = 0; i < picurls.length; i++) {
                let obj_pic = {};
                obj_pic.src = picurls[i];
                console.log(obj_pic.src);
                this.imgLoadEvent(function(obj) {
                  obj_pic.w = obj["w"];
                  obj_pic.h = obj["h"];
                }, picurls[i]);
                _arr_pic.push(obj_pic);
                console.log(_arr_pic);
              }
              self.pic_list = _arr_pic;
            } else {
              this.confirm_content = data.body.result.error_reason;
              this.confirm_show = true;
            }
          });
      } else {
        this.state = this.$route.query.state;
        console.log(this.state, "state");
        this.$http.get(service_url + "/api/information").then(data => {
          if (data.body.data.result.status === 0) {
            self.rackArr = data.body.data.result.data;
            let rackss = [];
            self.rackArr.map(v => {
              rackss.push(v.val);
            });
            console.log(rackss);
            self.rack.push(rackss);
          } else {
            this.confirm_content = data.body.result.error_reason;
            this.confirm_show = true;
          }
        });
        this.$http.get("/api/published_detail").then(
          data => {
            self.rack = data.body.data.data.rack;
            self.user_name = data.body.data.data.user_name;
            self.user_tel = data.body.data.data.user_tel;
            self.goods_name = data.body.data.data.goods_name;
            self.goods_degree = data.body.data.data.goods_degree;
            self.goods_rack = data.body.data.data.goods_rack;
            self.goods_price = data.body.data.data.goods_price;
            self.goods_desc = data.body.data.data.goods_desc;
            self.goods_img = data.body.data.data.goods_img;
            self.editImgs = data.body.data.data.goods_img;
          },
          () => {
            console.log(2);
          }
        );
      }
    }
    document.getElementById("index_loading").style.display = "none";
  },
  methods: {
    //
    gohide() {
      if (this.confirm_content == "保存成功") {
        this.$router.go(-1);
      }
    },
    //上传图片
    upimg(event) {
      var that = this;
      this.isLoadingImg = true;
      var file = event.target.files[0];
      lrz(file, {
        fieldName: "myfile"
      }).then(rst => {
        console.log(rst);
        that.$http
          .post(service_url + "/o2o-fileserver/upload/upload.do", rst.formData)
          .then(res => {
            console.log(res);
            if (res.body.state === 0) {
              // that.goods_img.push(res.body.data.url);
              that.editImgs.push(res.body.data.url);
              this.isLoadingImg = false;
              console.log(that.editImgs);
            } else {
              that.confirm_content = res.body.msg;
              that.confirm_show = true;
            }
          });
      });
    },
    /**删除图片 */
    deleteImage(index) {
      this.editImgs.splice(index, 1);
    },
    resetPic() {
      this.$store.dispatch("resetContext");
    },
    showRack() {
      console.log(156);
      this.show_rack = true;
    },
    showDegree() {
      this.showPopupPicker = true;
    },
    click_rack(val) {
      console.log(val);
      this.goods_rack = val[0];
      console.log(this.rackArr, 156);
      // this.rack_key = this.rackArr.find((v)=> {v.value === this.goods_rack}).key

      // var rack_key123 = this.rackArr.find((v)=> { return v.value === this.goods_rack})
      // console.log(rack_key123)

      this.rack_key = this.rackArr.find(v => {
        return v.value === this.goods_rack;
      }).key;
      console.log(this.rack_key);
    },
    imgLoadEvent(callback, url) {
      //圖片事件加載
      var img = new Image();
      img.onreadystatechange = function() {
        if (this.readyState == "complete") {
          callback({ w: img.width, h: img.height });
        }
      };
      img.onload = function() {
        if (this.complete == true) callback({ w: img.width, h: img.height });
      };

      img.onerror = function() {
        callback({ w: 0, h: 0 });
        //current.autoSetImgSize(current,img,obj);
      };
      img.src = url;
    },
    show(index) {
      this.$refs.previewer.show(index);
    },
    click_degree(key) {
      this.goods_degree = key + 1 + "成新";
    },
    _validate() {
      if (!this.goods_name) {
        this.confirm_content = "请输入商品名称";
        this.confirm_show = true;
        return false;
      }
      if (this.goods_degree === "请选择商品新旧程度") {
        this.confirm_content = "请选择商品新旧程度";
        this.confirm_show = true;
        return false;
      }
      if (!this.rack_key) {
        this.confirm_content = "请选择商品分类";
        this.confirm_show = true;
        return false;
      }
      if (!this.goods_price) {
        this.confirm_content = "请输入商品价格";
        this.confirm_show = true;
        return false;
      }
      if (!this.goods_desc) {
        this.confirm_content = "请输入商品的详细描述";
        this.confirm_show = true;
        return false;
      }
      if (!this.user_name) {
        this.confirm_content = "请输入联系人";
        this.confirm_show = true;
        return false;
      }
      if (!this.user_tel) {
        this.confirm_content = "请输入联系电话";
        this.confirm_show = true;
        return false;
      }
      if (!this.picurls.length) {
        this.confirm_content = "请至少选择一张图片上传";
        this.confirm_show = true;
        return false;
      }
      return true;
    },
    addMarket() {
      let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (!this._validate()) {
        return;
      }
      if (
        !this.user_tel ||
        this.user_tel.length !== 11 ||
        !myreg.test(this.user_tel)
      ) {
        this.confirm_content = "请正确输入您的手机号";
        this.confirm_show = true;
        return;
      }
      this.isLoading = true;
      let self = this;
      let senddata = {
        name: this.goods_name,
        quality: this.goods_degree,
        cid: this.rack_key,
        price: parseFloat(this.goods_price),
        desc: this.goods_desc,
        user_name: this.user_name,
        user_tel: this.user_tel,
        goods_img: this.picurls,
        vid:userProfile.vid
    
      };
      //          "goods_img":this.goods_img
      //          let str_senddata=JSON.stringify(senddata)
      this.$http
        .post(service_url + "/o2o/flea/wx/fleaRelease", senddata)
        .then(data => {
          self.isLoading = false;
          if (data.body.result.status === 0) {
            self.toast_text = "发布成功";
            self.show_toast = true;
            setTimeout(self.go_next, 1000);
            setTimeout(self.resetPic, 1000);
          } else {
            self.confirm_content = data.body.result.error_reason;
            self.confirm_show = true;
          }
        });
    },
    deleteimg(index) {
      console.log(index);
      this.goods_img.splice(index, 1);
    },
    editsave() {
      var that = this;
      //编辑保存
      if (!this.goods_name) {
        this.confirm_content = "请输入商品名称";
        this.confirm_show = true;
        return;
      } else if (!this.goods_degree) {
        this.confirm_content = "请选择商品成色";
        this.confirm_show = true;
        return;
      } else if (!this.goods_rack) {
        this.confirm_content = "请选择商品分类";
        this.confirm_show = true;
        return;
      } else if (!this.goods_price) {
        this.confirm_content = "请输入商品价格";
        this.confirm_show = true;
        return;
      } else if (!this.goods_desc) {
        this.confirm_content = "请输入商品描述";
        this.confirm_show = true;
        return;
      } else if (!this.user_name) {
        this.confirm_content = "请输入联系人";
        this.confirm_show = true;
        return;
      } else if (!this.user_tel) {
        this.confirm_content = "请输入联系电话";
        this.confirm_show = true;
        return;
      }
      let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (
        !this.user_tel ||
        this.user_tel.length !== 11 ||
        !myreg.test(this.user_tel)
      ) {
        this.confirm_content = "请正确输入您的手机号";
        this.confirm_show = true;
        return;
      }
      this.isLoading = true;
      let self = this;
      let senddata = {
        name: this.goods_name,
        quality: this.goods_degree,
        cid: this.rack_key,
        price: parseFloat(this.goods_price),
        desc: this.goods_desc,
        user_name: this.user_name,
        user_tel: this.user_tel,
        goods_img: [],
        id: parseInt(this.goods_id),
        vid:userProfile.vid
      };
      this.editImgs.forEach(e => {
        senddata.goods_img.push({
          val: e,
          desc: ""
        });
      });
      // senddata.goods_img=this.editImgs.join(',');
      console.log(senddata);
      this.$http
        .post(
          service_url + "/o2o-flea-webAndroid/wx/updateGoodsDetails.do",
          senddata
        )
        .then(data => {
          that.isLoading = false;
          if (data.body.result.status === 0) {
            this.confirm_content = "保存成功";
            this.confirm_show = true;
          } else {
            if (data.body.error_reason) {
              this.confirm_content = data.body.error_reason;
            } else {
              this.confirm_content = "保存失败";
            }

            this.confirm_show = true;
          }
        });
    },
    onChange(val) {
      console.log("val change", val);
      var num;
      if (val[0] === "10成新") {
        num = val[0].slice(0, 2) * 1;
      } else {
        var num = val[0].slice(0, 1) * 1;
      }
      console.log(typeof num);
      this.goods_degree = num + "成新";
    },
    //商品价格检测
    checknum(num) {
      console.log(789);
      var num1 = parseFloat(num);
      if (num === "") {
        return;
      } else {
        var str = /[a-zA-Z]/;
        if (isNaN(num1) || str.test(num)) {
          this.confirm_show = true;
          this.confirm_content = "价格应该为数字";
          var that = this;
          setTimeout(() => {
            that.goods_price = "";
          }, 1);
          return;
        } else {
          console.log(123);
        }
      }
    },
    //失焦
    shijiao(price) {
      if (price === "") {
        return;
      } else {
        var num1 = parseFloat(price).toFixed(2);
        console.log(num1);
        this.goods_price = num1;
      }
    },

    go_next() {
      this.$router.push({ path: "reserve_success", query: { route_type: 12 } });
    },
    editMarket() {
      console.log("编辑");
      let self = this;
      let senddata = {
        goods_id: this.goods_id,
        goods_name: this.goods_name,
        goods_degree: this.goods_degree,
        goods_rack: this.goods_rack,
        goods_price: this.goods_price,
        goods_desc: this.goods_desc,
        user_name: this.user_name,
        user_tel: this.user_tel,
        goods_img: this.picurls
      };
      this.$http
        .post(service_url + "/o2o/market/wx/edit_market_goods.do", senddata)
        .then(data => {
          if (data.body.data.status === 0) {
            self.confirm_content = "发布成功";
            self.confirm_show = true;
            self.$router.push({ path: "/my_published" });
          } else {
            self.confirm_content = data.body.result.error_reason;
            self.confirm_show = true;
          }
        });
    }
  }
};
</script>

<style>
#flea_market .tips {
  display: none;
}
#miaoshu textarea {
  text-indent: 0.45rem;
}
.weui_cells {
  margin-top: 0 !important;
  overflow: visible !important;
}
</style>
