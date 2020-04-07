<template>
 <div id="">
   <table>
     <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Gender</th>
       <th>Marital</th>
       <th>Phone</th>
       <th>Race</th>
       <th>Address</th>
       <th>Primary Doctor</th>
     </tr>
     <tr v-for="pat in patients" >
       <td>{{pat.firstName}} {{pat.middleInit}} {{pat.lastName}} </td>
       <td>{{pat.email}} </td>
       <td>{{pat.gender}} </td>
       <td>{{pat.marital}} </td>
       <td>{{pat.phone}} </td>
       <td>{{pat.race}} </td>
       <td>{{pat.street}}, {{pat.city}}, {{pat.state}} {{pat.zipcode}} </td>
       <td>{{pat.primary_doctor}}</td>
     </tr>
   </table>

 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

   name: 'AdminPatient',
   created () {
      this.loadAdminPatients()
   },
   computed: {
     ...mapState('admin', {
       patients: state => state.patients
     })
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminPatients'
     ])
   }
}
</script>
<style media="screen">

</style>
