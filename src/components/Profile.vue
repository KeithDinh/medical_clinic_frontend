<template>
  <div id="profile">
      <div v-if="profile" style="margin: 30px 0 20px;">
        <div
          <img src="https://image.flaticon.com/icons/svg/758/758935.svg" width="100" alt="">
        </div>
        <div class="patient-name">{{ profile.firstName }}  <span>{{ profile.middleInit }}</span> <span>{{ profile.lastName }}</span></div>
        <p>{{ profile.street }}<br>{{ profile.city }}, {{ profile.state }} , {{ profile.zipcode }}</p>
        <div>Phone: {{ profile.phone }}</div>
        <div>DOB: {{ profile.dob }}</div>
        <div>Gender: {{ profile.gender }}</div>
        <div>Status: {{ profile.marital }}</div>
        <div>Race: {{ profile.race }}</div>
        <p></p>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'Profile',
  created () {
    // An Action Loaded in From mapActions
    this.loadProfile()
  },
  computed: {
    ...mapState('profile', {
      complete: state => state.profileStatus.profileComplete,
      profile: state => state.userProfile
    })
  },
  methods: {
    ...mapActions('profile', [
      'loadProfile'
    ]),
    createProfile (e) {
      this.submitted = true
      const { profile } = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/createProfile', profile)
    },
    parseDate (str){
      var date = new Date(str);
      return str(date.getUTCDay(),date.getUTCDate(), date.getFullYear())
    }
  }
}
</script>
<style media="screen">
.patient-name{
  font-weight: bold;
  font-size: 20px;

}
</style>
