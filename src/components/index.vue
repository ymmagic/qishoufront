<template>
  <div>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
 import storage from "../model/storage.js";
  import Footer from './Footer.vue'
  import Content1 from './Content1.vue'
  import {MessageBox} from 'mint-ui';
  export default {
    data() {
      return {
        msg: '',
        proc:"y_qishou.savegps"
      }
    },
    components: {

      'v-footer': Footer
    },
    methods: {
      
    },
    mounted() {
        // let userid = this.$store.state.user;
		//  let pushurl=`http://www.cqjnh.com.cn:8090/api/sendgps/y_qishou.savegps/${userid}`;
       //   window.sysjs.startPushGPS(pushurl)  ;
    },
  }
</script>

<style scoped>

</style>
