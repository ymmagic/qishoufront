<template>
  <div>
 <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">抢单</h1>
		</header>
		<div class="mui-content">
         <div class="order">
				<div v-if="bookingdata[0].ORDER_ID" class="order-info" v-for="(detail,index) in bookingdata" :key="index">
					<div class="dis-between">
						<p >订单号：<span>{{detail.ORDER_ID}}</span></p>
            <p style="display:none"><span>{{detail.TYPE}}</span></p>
						<button class="btn" id="rob" @click="rob(index)">抢单</button>
					</div>
					<p style="text-align:left">下单时间: {{detail.TIME|formatDate}}</p>
					<p style="text-align:left">配送地址: <span>{{detail.ADDR}}</span></p>
					<p style="text-align:left">配送时效: <span>{{detail.SENDDAY|formatsendday}}</span></p>
				</div>
			</div>
			<!--更多订单-->

      </div>
  </div>
</template>

<script>
import storage from '../model/storage.js';
import {formatDate} from '../model/date.js';
import { MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      bookingdata:[0],
      proc1:"y_qishou.pushbooking",
      json:"",
      show:-1,
      proc2:"y_qishou.robbooking",
	  proc3:"y_qishou.recheckbooking"

    };
  },
  filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
            //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
        },
        formatsendday(num){
               if (num === "0") {
	
        return `今日送`;
      } else if(num === "1") {
	   
        return `明日送`;
      }else if(num === "2"){
       
         return `即时送`;
      }
        }
    },
  methods: {
    back() {
      this.$router.replace({ path: "/index/content0", query: { sys_id: id } });
    },
    async rob(index){
	
	   
      let id =this.bookingdata[index].ORDER_ID.slice(16);
	  
      let type=this.bookingdata[index].TYPE;
      //let userid=this.$store.state.user;
	   let userid=storage.get('userid');
        let result = (await this.axios.get(`/searchbooking/${this.proc3}/${id}/${type}`)).data;
      if (result[0].TAG==='1'){
        this.json = (await this.axios.get(`/robbooking/${this.proc2}/${id}/${type}/${userid}`)).data;
      }else{
        MessageBox.alert("该订单已被其他师傅抢到！");
        this.bookingdata.splice(index,1);
        this.$forceUpdate();
      };
      if(this.json[0].TAG==='0'){
        this.bookingdata.splice(index,1);
        this.$forceUpdate();
      }
    }
}, async mounted() {
      /*生命周期函数       vue页面刷新就会触发的方法*/
      this.bookingdata = (await this.axios.get(`/pushbooking/${this.proc1}`)).data;


    }};
</script>

<style scoped>

</style>
