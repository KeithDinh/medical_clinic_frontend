<template>
  <div class="row">
    <div class="row form">
      <div v-if="profile" class="row form-ctn">
        <div class="row form-title">Client Profile</div>
        <div>{{ profile.firstName }}</div>
        <div>{{ profile.middleInit }}</div>
        <div>{{ profile.lastName }}</div>
        <div>{{ profile.street }}</div>
        <div>{{ profile.city }}</div>
        <div>{{ profile.state }}</div>
        <div>{{ profile.zipcode }}</div>
        <div>{{ profile.phone }}</div>
        <div>{{ profile.dob }}</div>
        <div>{{ profile.gender }}</div>
        <div>{{ profile.marital }}</div>
        <div>{{ profile.race }}</div>
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
    }
  }
}
</script>
