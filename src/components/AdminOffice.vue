<template>
 <div id="">
    <table>
      <tr>
        <th>Office Name</th>
        <th>Phone</th>
        <th>Street</th>
        <th>City</th>
        <th>State</th>
        <th>Zipcode</th>
        <th>Edit</th>
      </tr>
      <tr v-for="office in adminOffice">
          <td>{{office.office_name}}</td>
          <td>{{office.phone}}</td>
          <td>{{office.street_1}}</td>
          <td>{{office.city}}</td>
          <td>{{office.state}}</td>
          <td>{{office.zipcode}}</td>
          <td>
            <button @click="popUpModal(office)">Edit</button>
          </td>
      </tr>
    </table>
    <div v-if="isHidden" class="modal-container"><AdminOfficeUpdateModal :diableModal="disableModal" :officeObject="singleOffice" class="modal" /></div>

 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import AdminOfficeUpdateModal from './AdminOfficeUpdateModal'
export default {

   name: 'AdminOffice',
   data() {
     return {
       isHidden: false,
       singleOffice: {}
     };
   },
   components:{
     AdminOfficeUpdateModal
   },
   created () {
      this.loadAdminOffices()
   },
   computed: {
     ...mapState('admin', {
       adminOffice: state => state.offices
     }),
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminOffices'
     ]),
     disableModal () {
      this.isHidden = false;
    },
    popUpModal(obj){
      this.isHidden = true;
      this.singleOffice = obj;
    },
   }
}
</script>
<style media="screen">
.modal-container{
  background-color:rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal{
  width: 500px;
  margin: 5% auto;
  background-color: white;
  padding: 20px;
}
</style>
