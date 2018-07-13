<template>
    <div>
        <div style="position:relative;top:2.88rem;width:9.067rem;margin:0 auto;height:5.2rem">
            <img src="./invitecode.png" style="width:100%">
            <div style="width:1.2rem;height:100%;font-size:0.347rem;position:absolute;left:0;top:0;text-align:center;color:#FFFFFF;padding:1.067rem 0.427rem;box-sizing:border-box;letter-spacing:0;line-height:0.4rem">访客来访临时卡</div>
            <div style="position:absolute;top:0.753rem;left:1.52rem;padding-bottom:0.4rem;border-bottom:1px solid #E1E1E1">
                <p style="color:#888888;font-size:0.32rem">地址</p>
                <p style="padding-bottom:0.4rem;border-bottom:1px solid #E1E1E1"><span style="color:#333333;margin-right:2.067rem">武汉天地B地块</span><span style="color:#333333;margin-right:0.55rem">5栋</span><span style="color:#333333">3001室</span></p>
                <p style="display:flex;justify-content:space-between;margin-top:0.3rem;font-size:0.32rem"><span style="color:#888888">业主姓名</span><span style="#333333">朱晖</span></p>
                <div style="display:flex;justify-content:space-between;margin-top:0.167rem;font-size:0.32rem"><p style="color:#888888">有效期至</p><p><span style="#333333;margin-right:0.2rem">2017-12-05</span><span style="#333333">18:00</span></p></div>
            </div>
            <div><img src="./logo.png" style="width:1.667rem;position:absolute;bottom:0.28rem;right:0.5rem"></div>
        </div>
        <div style="position:absolute;top:9rem;width:80%;left:50%;transform:translateX(-50%)">
            <flexbox style="width:100%" justify="space-between" wrap="wrap">
                <flexbox-item @click.native="guestdoor(item.name)" v-for="(item,index) in doorlist" :span="1/3" :key="index" style="background:#6336a8;box-sizing:border-box;line-height:1.067rem;border-radius:5px;color:#fff;font-size:0.427rem;margin:0 0.2rem;margin-left:0;margin-bottom:0.3rem"><div style="text-align: center;"><p style="font-size:14px">{{item.name}}</p></div></router-link></flexbox-item>
            </flexbox>
            <div class="tipcontent">
                <div class="tip">使用说明：</div>
                <div class="msgcontent">
                    <p>1.你到达门岗前,点击对应大门按钮,即可远程开门</p>
                    <p>2.一个门一天只能开一次,若需再次开门,需业主再次申请</p>
                </div>
            </div>
            <!-- <div>
                <div v-for="item in doorlist" style="width:3.2rem;line-height:1.067rem;box-sizing:border-box;color:#fff;font-size:0.427rem;text-align:center">{{item.name}}</div>
            </div> -->
        </div>
    </div>
</template>
<script>
import {Flexbox,FlexboxItem} from 'vux'
export default{
    data(){
        return{
            name:"123",
            doorlist:[
                 {
                name:'南大门'
                 },
                {
                name:'北大门'
                 },
                  {
                name:'南大门'
                 },
                // {
                // name:'北大门'
                //  }
            ]
        }
    },
    components:{
        Flexbox,
        FlexboxItem
    },
    mounted(){
        var that=this
       this.$http.post(service_url+'/o2o/door/wexin/inviteVistorLZWX',{
                villageid:userProfile.vid,
                userid:userProfile.userid,
                houseid:userProfile.houseid,
                name:"lige",
                phone:13264877395       
              }).then((res)=>{
                  console.log(res.body)
              })
       document.getElementById("index_loading").style.display="none";
    },
    methods:{
        guestdoor(){
             var username= this.$route.query.username
              var timestamp=Date.parse(new Date())
            this.$http.post(service_url+'/o2o/door/wexin/inviteVistorOpenDoor',{
                villageid:userProfile.vid,
                userid:userProfile.userid,
                username:userProfile.username,
                houseid:userProfile.houseid,
                vname:username,
                vdate:timestamp,
                usertype:1,
                doorId:1    
            }).then((res)=>{
                console.log(res)
            })
        }
    }
}
</script>
<style>
.tipcontent{
    margin-top:0.8rem;
    display:flex;
    color:#B3B0B6;
    font-size:0.32rem;
    line-height: 0.5rem
}
.tipcontent .tip{
    width:2rem;
}
</style>