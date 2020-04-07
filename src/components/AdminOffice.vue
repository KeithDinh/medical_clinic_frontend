<template>
 <div id="">
    <table>
      <tr>
        <th>Office Name</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
      <tr v-for="office in adminOffice">
          <td>{{office.office_name}}</td>
          <td>{{office.phone}}</td>
          <td>{{office.street_1}}, {{office.city}}, {{office.state}} {{office.zipcode}}</td>
      </tr>
    </table>
 </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

   name: 'AdminAppointment',
   created () {
      this.loadAdminOffices()
   },
   computed: {
     ...mapState('admin', {
       adminOffice: state => state.offices
     })
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminOffices'
     ])
   }
}
</script>
<style media="screen">

</style>
