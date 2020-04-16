<template>
  <div id="reports" class="row">
    <form @submit.prevent="handleSubmit">
      <select type="text" v-model="reportType" id="reportType" name="reportType">
        <option v-for="type in reportTypes" v-bind:value="type">{{ type }}</option>
      </select>
    </form>
    <table>
      <tr>
        <th v-for="label in labels">{{ label }}</th>
      </tr>
      <tr v-for="row in rows">
        <td v-for="item in row.items">{{ item }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex'
import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {

  name: 'Reports',
  data () {
    return {
      reportType: '',
      reportTypes: [
        'Patient List',
        'Doctor List',
        'Canceled Appointments',
        'Finished Appointments',
        'Pending Appointments'
      ]
    }
  },
  components: {
    Tabs,
    Tab
  },
  created () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
