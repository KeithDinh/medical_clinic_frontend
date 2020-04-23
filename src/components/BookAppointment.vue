<template>
  <div class="row">
    <h2 class='dashboard_header'>Book Appointment</h2>
    <div class="row dashboard" >
      <Profile class="db-col1" />
      <div class="db-col2">
        <form @submit.prevent="handleSubmit">
          <div id="appointment-form" class="row panel">
            <div class="row" >
              <div class="col-30" style="text-align:left">
                <label>Select a Doctor</label>
              </div>
              <div class="col-70">
                <select type="text" v-model="doctor" id="doctor" name="doctor">
                  <option v-for="doc in doctors" v-bind:value="doc.doctor_id"> {{ doc.first_name }} {{doc.middle_initial}} {{ doc.last_name }},   {{doc.specialization_name}}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-30" style="text-align:left">
                <label>Select a Medical Office</label>
              </div>
              <div class="col-70">
                <select type="text" v-model="office" id="office" name="office">
                  <option v-for="off in offices" v-bind:value="off.office_id">{{ off.office_name }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-30" style="text-align:left">
                <label for="referred">I was referred by another doctor</label>
              </div>
              <div class="col-70">
                <input type="checkbox" v-model="referred" name="referred">
                <select type="text" v-if="referred" v-model="refDoctor" id="refDoctor" name="refDoctor">
                  <option v-for="doc in doctors" v-bind:value="doc.doctor_id">{{ doc.first_name }} {{doc.middle_initial}} {{ doc.last_name }},   {{doc.specialization_name}}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-30" style="text-align:left">
                <label>Date</label>
              </div>
              <div class="col-70">
                <datepicker :disabled-dates="disabledDates" v-model="date" name="date" placeholder="Select Date" format="MM/dd/yyyy"></datepicker>
                <select type="text" v-model="timeslot" id="timeslot" name="timeslot">
                  <option v-for="slot in timeslots" v-bind:value="slot.slot">{{ slot.time }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-30" style="text-align:left;">
                <label>Reason for visit</label>
              </div>
              <div class="col-70">
                <textarea type="text" v-model="reason" placeholder="Reason for visit"></textarea>
              </div>
            </div>
            <div style="padding:30px">
              <button id="submit" v-on:click="book()">BOOK APPOINTMENT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="booking === true" class="popup-confirm">
      <div class="row message">Please press confirm to book appointment</div>
      <div class="row confirm"><button class="confirm" v-on:click="confirm()">Confirm</button><button class="cancel" v-on:click="cancel()">Cancel</button></div>
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
      booking: false,
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
      this.loadOfficesByDoctor(value)
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
      'loadOfficesByDoctor'
    ]),
    ...mapActions('dates', [
      'loadDates',
      'loadTimeslots'
    ]),
    book: function () {
      alert("booking")
      this.booking = true
    },
    cancel: function () {
      this.booking = false
    },
    confirm (e) {
      this.booking = false
      const { doctor, office, refDoctor, date, timeslot, reason, bookingMethod } = this
      const { dispatch } = this.$store
      dispatch('appointment/setAppointment', { doctor, office, refDoctor, date, timeslot, reason, bookingMethod })
    }
  }
}
</script>
