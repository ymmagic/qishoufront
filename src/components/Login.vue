<template>
  <div>
   <header class="mui-bar mui-bar-nav my-bar">
			<h1 class="mui-title">骑手端登录</h1>
		</header>
		<div class="mui-content">
			<div class="pic">
				<img src="../../static/img/timg.jpg"/>
			</div>
			<div class="my-login" style="text-align:left">
				<label >账号：</label>
				<input type="text" v-model="username" placeholder="请输入帐户名或手机号" value="" />

				<div class="pas" style="text-align:left">
					<label >密码：</label>
					<input type="password" v-model="password" placeholder="请输入密码" value="" />
					<i class="iconfont icon-yanjing"></i>
				</div>

				<div class="remember" style="text-align:left">
					<input class="put" type="checkbox" AUTOCOMPLETE="OFF" value="" />记住密码
				</div>
			</div>


			<div class="mui-content-padded">
				<button id='login' @click="login" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
			</div>
		</div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
import storage from '../model/storage.js';
export default {
  data() {
    return {
      username: "",
      password:"",
      proc:"y_qishou.logins"
    };
  },
  methods: {
    async login() {
        let json = (await this.axios.get(`/users/${this.proc}/${this.username}/${this.password}/`)).data;
		storage.set('userid',json[0].USERID);
        if (json[0].DATA==="1") {
		  let pushurl=`http://www.cqjnh.com.cn:8090/api/sendgps/y_qishou.savegps/${json[0].USERID}`;
          //window.sysjs.startPushGPS(pushurl)  ;
		      //window.sysjs.startPushMessage("http://www.cqjnh.com.cn:8090/api/ontimebooking/y_qishou.ontimebooking","新消息提醒","有抢单拉!!!");
          this.$store.dispatch('updateUser', json[0].USERID);
          this.$router.replace({ path: '/index/content1'});


        } else {
           MessageBox.alert("密码或账户名输入错误，请重新登陆！");
        }

    }
  }
};
</script>

<style scoped>
@import "../../static/css/my-css.css";
@import "../../static/fonts/my-font.css";
</style>
