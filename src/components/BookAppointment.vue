<template>
  <div class="row">
    <div class="row form-title">Book Appointment</div>
    BOOK APPOINTMENT
    <Calendar/>
    <BookingForm/>
  </div>
</template>
<script>
import Calendar from './Calendar'
import BookingForm from './BookingForm'
export default {
  name: 'BookAppointment',
  components: {
    Calendar,
    BookingForm
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
