<template>
  <div>
	<header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">配送中</h1>
		</header>
		<div class="mui-content">
			<div class="order">
				<div v-if="bookingdata[0].ORDER_ID" class="order-info" v-for="(detail,index) in bookingdata" :key="index">

						<p style="text-align:left;">订单号：<span>{{detail.ORDER_ID}}</span></p>

					<p style="text-align:left">下单时间: {{detail.TIME|formatDate}}</p>
          <p style="display:none">{{detail.TYPE}}</p>
				<div class="dis-between">
					<p style="text-align:left">配送时效: <span>{{detail.SENDDAY|formatsendday}}</span></p>
					<a ><button class="btn" @click="details(index)">订单详情</button></a>
				</div>
					<div class="place-box">
							<i class="customer">顾客</i>
							<div class="place-left">
								<div>
									<p>{{detail.USERNAME}}</p>
									<span>{{detail.ADDR}}</span>
								</div>
							</div>
						<div class="place-right">
							  <a :href="tel(index)"><img src="../../static/img/phone1.png" alt="" /></a>
							<img src="../../static/img/map1.png" @click="goto_map(index)"/>
						</div>
					</div>
          <button class="detai-btn " @click="begin(index)"  :disabled="detail.ISDISABLE===index">{{detail.TAG|formatstate}}</button>
				</div>
			</div>

           </div>
  </div>
</template>


<script>
import storage from "../model/storage.js";
import { formatDate } from "../model/date.js";
import { MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      bookingdata: [0],
      begins: -1,
      ends: false,
      proc1: "y_qishou.robinfo",
      json: "",
      proc2: "y_qishou.robbooking",
      proc3: "y_qishou.begins",
      proc4: "y_qishou.ends",
	  proc5: "y_qishou.getgps"
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
      //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
    },
    formatsendday(num) {
      if (num === "0") {

        return `今日送`;
      } else if(num === "1") {

        return `明日送`;
      }else if(num === "2"){

         return `即时送`;
      }
    },
    formatstate(num) {
      if (num === "0") {
        return `开始配送`;
      } else if(num === "1") {
        return `已送达`;
      }
    },
  },
  methods: {
    tel(index){
	    return 'tel:'+this.bookingdata[index].USERPHONE
	},
    dial(index) {
      window.location.href = "tel:'+bookingdata[index].USERPHONE";
    },
    async goto_map(index) {
     let addr = this.bookingdata[index].ADDR;

     let result = (await this.axios.get(
      `/getgpsinfo/${this.proc5}`
    )).data;
	//http://api.map.baidu.com/direction/v2/transit?origin=40.056878,116.30815&destination=31.222965,121.505821&ak=E06eb9d756d0eafc722effb355657b4c
      let lat=result[0].LAT;
      let lng=result[0].LNG;
	  let tolat= this.bookingdata[index].LATLNG.split(',')[0];
      let tolng= this.bookingdata[index].LATLNG.split(',')[1];
	  // MessageBox.alert(`https://apis.map.qq.com/tools/routeplan/eword=${addr}&spointx=${lng}&spointy=${lat}&epointx=${tolat}&epointy=${tolng}?referer=myapp&key=NIBBZ-O3UW6-Z6GSH-E3DQU-Q37R6-W6BRE`
     // );
     window.location.href =`https://apis.map.qq.com/tools/routeplan/eword=${addr}&spointx=${lng}&spointy=${lat}&epointx=${tolat}&epointy=${tolng}?referer=myapp&key=NIBBZ-O3UW6-Z6GSH-E3DQU-Q37R6-W6BRE`

    },
    details(index) {
      let type = this.bookingdata[index].TYPE;
      let order_id = this.bookingdata[index].ORDER_ID;
      let sendday = this.bookingdata[index].SENDDAY;
      let addr = this.bookingdata[index].ADDR;
      let time = this.bookingdata[index].TIME;
      this.$router.replace({
        path: "/index/content4",
        query: {
          type: type,
          order_id: order_id,
          sendday: sendday,
          addr: addr,
          time: time
        }
      });
    },
    async begin(index) {
     // let userid = this.$store.state.user;
	   let userid=storage.get('userid');
      if (this.bookingdata[index].TAG === "0") {
        this.bookingdata[index].TAG = "1";
        let order_id = this.bookingdata[index].ORDER_ID.slice(16);
        let type = this.bookingdata[index].TYPE;
        await this.axios.get(
          `/begin/${this.proc3}/${order_id}/${type}/${userid}`
        );
      } else if (this.bookingdata[index].TAG === "1") {
        let order_id = this.bookingdata[index].ORDER_ID.slice(16);
        let type = this.bookingdata[index].TYPE;
        this.bookingdata[index].ISDISABLE = index;
        await this.axios.get(
          `/end/${this.proc4}/${order_id}/${type}/${userid}`
        );
      }
    }
  },
  async mounted() {
    /*生命周期函数       vue页面刷新就会触发的方法*/
    let userid=storage.get('userid');
    this.bookingdata = (await this.axios.get(
      `/robinfo/${this.proc1}/${userid}`
    )).data;
  }
};
</script>



<style scoped>
</style>
