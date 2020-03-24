<template lang="html">
  <div class="info_container">
      <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
        <tab name="Appointments">
          <div class="appointments">
            <table >
              <tr>
                <th>Doctor</th>
                <th>Appt Date</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>Ruby </td>
                <td>14 Nov </td>
                <td>12 Nov </td>
                <td>Pending </td>
              </tr>
            </table>
          </div>
        </tab>
        <tab  name="Prescriptions">
          pres stuff here
        </tab>
        <tab  name="Medical Records">
          pres stuff here
        </tab>
      </tabs>
    </ul>


    <div class="prescriptions">

    </div>

    <div class="">

    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import {Tabs, Tab} from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {
  name: 'Info',
  components: {
    Tabs
  }
}
</script>

<style lang="css" scoped>
table{
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
}

.appointments {
  border-radius: 7px;
  margin: 10px 20px;
  border:1px solid rgba(0,0,0,0.2);

}
.appointments table tr th, .appointments table tr td{
  padding:20px;
}
.appointments table tr:not(:last-child){
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

/* ********************* TAB ********************* */


</style>
