 <template>
  <div id="doctorProfile">
      <div v-if="doctorProfile" style="margin: 30px 0 20px;">
        <div
          <img src="https://image.flaticon.com/icons/svg/758/758935.svg" width="100" alt="">
        </div>
        <div class="doctor-name">{{ doctorProfile.firstName }}  <span>{{ doctorProfile.middleInit }}</span> <span>{{ doctorProfile.lastName }}</span></div>
        <div>Phone: {{ doctorProfile.phone }}</div>
        <div>Specialization: {{ doctorProfile.specialization_name }}</div>
        <p></p>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'doctorProfile',
  created () {
    // An Action Loaded in From mapActions
    this.loadDoctorProfile()
  },
  computed: {
     ...mapstate('doctor', {
      complete: state => state.doctorProfileStatus.doctorProfileComplete,
      doctor: state => state.doctorProfile
    })
  },
  methods: {
    ...mapActions('doctorProfile', [
      'loadDoctorProfile'
    ]),
    createDoctorProfile (e) {
      this.submitted = true
      const { doctorProfile } = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('doctorProfile/createDoctorProfile', doctorProfile)
    },
    parseDate (str){
      var date = new Date(str);
      return str(date.getUTCDay(),date.getUTCDate(), date.getFullYear())
    }
  }
}
</script>
<style media="screen">
.doctor-name{
  font-weight: bold;
  font-size: 20px;

}
</style>