<template>
  <div class="row">
    <div class="row form">
      <div v-if="profile" class="row form-ctn">
        <div class="row form-title">Update Profile</div>
        <div id="profile-form" class="row forms">
          <input
            type="text"
            v-model="profile.firstName"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            v-model="profile.lastName"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            type="text"
            v-model="profile.street"
            id="addressOne"
            name="addressOne"
            placeholder="Address 1"
          />
          <input
            type="text"
            v-model="profile.city"
            id="city"
            name="city"
            placeholder="City"
          />
          <select type="text" v-model="profile.state" id="state" name="state">
            <option
              v-for="(usState, index) in usStates"
              :key="index"
              :selected="profile.state === usState"
              >{{ usState }}</option
            >
          </select>
          <input
            type="text"
            v-model="profile.zipcode"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
          />
          <button v-if="complete" id="submit" v-on:click="updateProfile()">UPDATE</button>
          <button v-else id="submit" v-on:click="createProfile()">SUBMIT</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      usStates: [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'DC',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
      ],
      submitted: false
    }
  },
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
      'loadProfile'// -> this.foo()
    ]),
    createProfile (e) {
      this.submitted = true
      const {profile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/createProfile', profile)
    },
    updateProfile (e) {
      this.submitted = true
      const {profile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/updateProfile', profile)
    }
  }
}
</script>
