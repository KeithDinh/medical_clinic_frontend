<template>
  <div class="row">
    <h2 class='dashboard_header'>Book Appointment</h2>
    <div class="row form" >
      <Profile class="block1 left" />
      <div class="block2 left" style="padding-top:10px">
        <form @submit.prevent="handleSubmit">
          <div id="appointment-form" class="row panel">
            <div class="row" >
              <div class="col-30" style="text-align:center">
                <label>Select a Doctor</label>
              </div>
              <div class="col-70">
                <select type="text" v-model="doctor" id="doctor" name="doctor">
                  <option v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
                </select>
              </div>
              <div style="clear:both;"></div>
            </div>

            <div class="row" >
              <div class="col-30" style="text-align:center">
                <label>Select a Medical Office</label>
              </div>
              <div class="col-70">
                <select type="text" v-model="office" id="office" name="office">
                  <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
                </select>
              </div>
              <div style="clear:both;"></div>
            </div>

            <div class="row form" >
              <div class="col-30" style="text-align:center">
                <label for="referred">I was referred by another doctor</label>
              </div>
              <div class="col-70">
                <input type="checkbox" v-model="referred" name="referred">
                <select type="text" v-if="referred" v-model="refDoctor" id="refDoctor" name="refDoctor">
                  <option v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{ doc.last_name }}</option>
                </select>
              </div>
              <div style="clear:both;"></div>
            </div>

            <div class="row form" >
              <div class="col-30" style="text-align:center">
                <label>Date</label>
              </div>
              <div class="col-70">
                <datepicker :disabled-dates="disabledDates" v-model="date" name="date" placeholder="Select Date" format="MM/dd/yyyy"></datepicker>
                <select type="text" v-model="timeslot" id="timeslot" name="timeslot">
                  <option v-for="slot in timeslots" v-bind:value="slot.slot">{{ slot.time }}</option>
                </select>
              </div>
              <div style="clear:both;"></div>
            </div>
            <textarea type="text" v-model="reason" placeholder="Reason for visit"></textarea>
            <div style="padding:30px">
              <button id="submit" v-on:click="book()">BOOK APPOINTMENT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapActions } from 'vuex'
import Profile from './Profile'
export default {
  name: 'BookAppointment',
  components: {
    Datepicker,
    Profile
  },
  data: function () {
    return {
      doctor: '',
      office: '',
      referred: false,
      refDoctor: '0',
      date: '',
      timeslot: '',
      reason: '',
      bookingMethod: 'web'
    };
  },
  watch: {
    doctor: function (value) {
      this.loadOffices(value)
    },
    office: function (value) {
      let d = [value, doctor.value]
      this.loadDates(d)
    },
    date: function (date) {
      this.loadTimeslots(date)
    }
  },
  created () {
    this.$store.dispatch('profile/loadProfile'),
    this.loadDoctorAppointment()
  },
  computed: {
    ...mapState('doctor', {
      doctors: state => state.doctorsList
    }),
    ...mapState('offices', {
      offices: state => state.officeList
    }),
    ...mapState('dates', {
      disabledDates: state => state.disabledDates,
      timeslots: state => state.timeslots
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorAppointment'
    ]),
    ...mapActions('offices', [
      'loadOffices'
    ]),
    ...mapActions('dates', [
      'loadDates',
      'loadTimeslots'
    ]),
    book (e) {
      const { doctor, office, refDoctor, date, timeslot, reason, bookingMethod } = this
      const { dispatch } = this.$store
      dispatch('appointment/setAppointment', { doctor, office, refDoctor, date, timeslot, reason, bookingMethod })
    }
  }
}
</script>
<style media="screen">
  .block1{width:25%;}
  .block2{width:75%;}

.col-30 {
  
}

</style>
