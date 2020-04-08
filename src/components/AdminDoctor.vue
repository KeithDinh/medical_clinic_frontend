<template>
 <div id="">
   <table>
     <tr>
       <th>Name</th>
       <th>Specialization</th>
       <th>Race</th>
       <th>Gender</th>
       <th>Address</th>
       <th>Email</th>
       <th>Phone</th>
     </tr>
     <tr v-for="doc in doctors" >
       <td>{{doc.firstName}} {{doc.middleInit}} {{doc.lastName}} </td>
       <td>{{doc.specializationName}} </td>
       <td>{{doc.race}} </td>
       <td>{{doc.gender}} </td>
       <td>{{doc.street}}, {{doc.city}}, {{doc.state}} {{doc.zipcode}} </td>
       <td>{{doc.email}} </td>
       <td>{{doc.phone}} </td>
     </tr>
   </table>
 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default
{
   name: 'AdminDoctor',
   created () {
      this.loadAdminDoctors()
   },
   computed: {
     ...mapState('admin', {
       doctors: state => state.doctors
     })
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminDoctors'
     ])
   }
}
</script>
<style media="screen">

</style>
