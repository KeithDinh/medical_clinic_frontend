 <template>
  <div id="doctorProfile">
      <div style="margin: 30px 0 20px;">
        <div
          <img src="https://image.flaticon.com/icons/svg/758/758935.svg" width="100" alt="">
        </div>
        <div class="doctor-name">{{ doctor.firstName }}  <span>{{ doctor.middleInit }}</span> <span>{{ doctor.lastName }}</span></div>
        <div>Phone: {{  doctor.phone }}</div>
        <div>Specialization: {{ doctor.specializationName }}</div>
        <p>{{ patients[0].firstName }}</p>
        <div v-for="a in appointments">{{ a.appt_start_time }}</div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'DoctorProfile',
  created () {
    this.loadDoctorProfile()
  },
  computed: {
    ...mapState('doctor', {
      doctor: state => state.doctorProfile,
      patients: state => state.patients,
      appointments: state => state.appointments
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorProfile'
    ])
  }
}
</script>
<style media="screen">
.doctor-name{
  font-weight: bold;
  font-size: 20px;

}
</style>