<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Select An Office Location</div>
        <form @submit.prevent="handleSubmit">
          <div id="office-form" class="row forms">
            <select  v-on:click="select()" type="text" v-model="office" id="office" name="office">
              <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchDoctor',
  components: {
  },
  data: function () {
    return {
      office_selected:''
    };
  },
  watch: {
    doctor: function (value) {
      this.loadOffice()
    },
    
  },
  created () {
    
  },
  computed: {
    ...mapState('offices', {
      offices: state => state.officeList
    }),

  },
  methods: {
    ...mapActions('offices', [
      'loadOffices'
    ]),
    
    select (e) {
      const { office_selected } = this
      const { dispatch } = this.$store
      dispatch('offices/getOffice', { office_selected })
    }
  }
}
</script>