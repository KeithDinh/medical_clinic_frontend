<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Book Appointment</div>
        <form @submit.prevent="handleSubmit">
          <div id="appointment-form" class="row forms">
            <div id="firstName">First Name: {{ profile.firstName }}</div>
            <div id="lastName">Last Name: {{ profile.lastName }}</div>
            <select type="text" v-model="doctors" id="doctor" name="doctor">
              <option v-for="(doc, index) in doctors" :key="index" :selected="doctor === doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
            </select>
            <select type="text" v-model="office" id="office" name="office">
              <option v-for="(off, index) in offs" :key="index" :selected="office === off">{{ off }}</option>
            </select>
            <datepicker v-model="date" name="date" placeholder="Select Date" format="MM/dd/yyyy"></datepicker>
            <select type="text" v-model="timeslots" id="timeslots" name="timeslots">
              <option v-for="(slot, index) in slots" :key="index" :selected="timeslots === slot">{{ slot }}</option>
            </select>
            <button id="submit" v-on:click="book()">BOOK APPOINTMENT</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BookAppointment',
  components: {
    Datepicker
  },
  created () {
    this.$store.dispatch('profile/loadProfile'),
    this.loadDoctors()
  },
  computed: {
    ...mapState('profile', {
      profile: state => state.userProfile
    }),
    ...mapState('doctors', {
      doctors: state => state.doctorsList
    })
  },
  methods: {
    ...mapActions('doctors', [
      'loadDoctors'
    ]),
  }
}
</script>
