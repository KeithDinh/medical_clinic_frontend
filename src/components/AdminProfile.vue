<template>
 <div id="adminProfile">
     <div style="margin: 30px 0 20px;">
       <div>
         <img src="https://image.flaticon.com/icons/svg/758/758935.svg" width="100" alt="">
       </div>
       <div class="admin-name"> {{admin[0].first_name}}   <span> {{admin[0].middleInit}} </span> <span> {{admin[0].last_name}} </span></div>
        <p class="subtitle1"> {{admin[0].title}}   </p>
         <hr size="2" width="80%" align="center" noshade="false">
       <hr class="style1">
         <div class="text"><p class="align-left">Phone: </p><p class="align-right"> {{admin[0].phone}}  </p></div>
        <div style="clear:both;"></div>
       <hr class="style1">
   </div>
 </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {

 name: 'AdminProfile',
 created () {
    this.loadAdminProfile()
 },
 computed: {
   ...mapState('admin', {
     admin: state => state.adminProfile
   })
 },
 methods: {
   ...mapActions('admin', [
     'loadAdminProfile'
   ])
 }
}
</script>
<style media="screen">
#adminProfile{
  width: 300px;
    margin: 0 auto;
}
.admin-name{
 font-weight: bold;
 font-size: 20px;
}

.text{
 display:block;
 margin-left:25px;
 margin-right:25px;
 font-size:14px;
}
.align-left{
 float:left;

 }
.align-right{
 float:right;
 color:#898790

}
hr.style2 {
 overflow: visible; /* For IE */
 padding: 0;
 border: none;
 border-top: medium double #333;
 color: #333;
 text-align: center;
}
hr.style2:after {
 content: "contact";
 display: inline-block;
 position: relative;
 top: -0.7em;
 font-size: 1.5em;
 padding: 0 0.25em;
 background: white;
}
</style>
