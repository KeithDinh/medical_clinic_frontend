<template>
 <div id="">
   <table>
     <tr>
       <th>Name</th>
       <th>Phone</th>
       <th>Specialization</th>
     </tr>
     <tr v-for="doc in doctors" >
       <td>{{doc.firstName}} {{doc.middleInit}} {{doc.lastName}} </td>
       <td>{{doc.phone}} </td>
       <td>{{doc.specialization_name}} </td>
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
