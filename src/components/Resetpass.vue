<template>
  <div>
	<header class="mui-bar mui-bar-nav">
			<a @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">重置密码</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row my-row">
					<label>输入原密码</label>
					<input v-model="oldpass" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
				<div class="mui-input-row my-row">
					<label>输入新密码</label>
					<input v-model="newpass" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
				<div class="mui-input-row my-row">
					<label>确认新密码</label>
					<input v-model="conformpass" type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
				</div>

			</form>
			<div class="mui-content-padded">
				<button class="mui-btn mui-btn-block mui-btn-primary" @click="submit">确认修改</button>
			</div>
		</div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
import storage from "../model/storage.js";
  export default {
      data(){
       return{
        oldpass:"",
        newpass:"",
        conformpass:"",
        proc1:"y_qishou.verify",
        proc2:"y_qishou.changepass",
       }
     },
   methods:{
     back(){
       this.$router.replace({ path: "/index/content5"});
     },
     async submit(){
      //let userid=this.$store.state.user;
	    let userid=storage.get('userid');
      let json = (await this.axios.get(`/verify/${this.proc1}/${userid}/${this.oldpass}/`)).data;
      if(json[0].DATA==='1'){
         if(this.newpass===this.conformpass){
          let r=(await this.axios.get(`/modifypass/${this.proc2}/${userid}/${this.newpass}/`)).data;
          if(r[0].TAG==='0'){
            MessageBox.alert("修改密码成功");
            this.$router.replace({ path: "/"});
          }
         }else{
          MessageBox.alert("您输入的密码前后不一致请重新输入！")
         }
      }else{
         MessageBox.alert("您输入的密码有误！");
      }
     }
   }
  }
</script>

<style scoped>

</style>
