<template>
  <div id="profile">
    <div class="row panel">
      <div v-if="profile" style="margin: 30px 0 20px;">
        <div
          <img src="https://image.flaticon.com/icons/svg/758/758935.svg" width="100" alt="">
        </div>
        <div class="patient-name">{{ profile.firstName }}  <span>{{ profile.middleInit }}</span> <span>{{ profile.lastName }}</span></div>
        <p class="patient-MR"><strong>MRN: </strong>{{profile.patient_id}}</p>
        <p class="patient-addr">{{ profile.street }}<br>{{ profile.city }}, {{ profile.state }} , {{ profile.zipcode }}</p>
        <hr size="2" width="80%" align="center" noshade="false">
        <div class="text"><p class="align-left">Phone: </p><p class="align-right">{{ profile.phone }}</p></div>
        <div style="clear:both;"></div>
        <div class="text"><p class="align-left">DOB </p><p class="align-right">{{ profile.dob }}</p></div>
        <div style="clear:both;"></div>
        <div class="text"><p class="align-left">Gender: </p><p class="align-right">{{ profile.gender }}</p></div>
        <div style="clear:both;"></div>
        <div class="text"><p class="align-left">Marital Status: </p><p class="align-right">{{ profile.marital }}</p></div>
        <div style="clear:both;"></div>
        <div class="text"><p class="align-left">Race: </p><p class="align-right">{{ profile.race }}</p></div>
        <div style="clear:both;"></div>
        <p></p>
      </div>
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
.patient-MR{
  font-size:15px;
  color:"#6f92a2";
}
.patient-addr{
  font-size:15px;
  }
.text{
  display:block;
  margin-left:25px;
  margin-right:25px;
  font-size:14px;
}
.align-left{
  float:left;

  }
.align-right{
  float:right;
  color:#898790

}
</style>
