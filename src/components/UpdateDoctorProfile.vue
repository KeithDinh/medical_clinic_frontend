<template>
  <div class="row card card-container" style="width:50%">
    <div class="row form">
      <div v-if="doctorProfile" class="row form-ctn">
        <div class="row form-title">Update Profile</div>
        <div id="profile-form" class="row forms">
          <label>First Name</label>
          <input
            type="text"
            v-model="doctorProfile.firstName"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <label> Middle Initial</label>
          <input
            type="text"
            v-model="doctorProfile.middleInit"
            id="middleInit"
            name="middleInit"
            placeholder="middleInit"
          />
          <label>Last Name</label>
          <input
            type="text"
            v-model="doctorProfile.lastName"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          <label>Specialization</label>
          <input
            type="text"
            v-model="doctorProfile.specializationName"
            id="specializationName"
            name="specializationName"
            placeholder="specializationName"
          />
          <label>Gender</label>
          <input
            type="text"
            v-model="doctorProfile.gender"
            id="gender"
            name="gender"
            placeholder="gender"
          />
          <label>Race</label>
          <input
            type="text"
            v-model="doctorProfile.race"
            id="race"
            name="race"
            placeholder="race"
          />
          <label>Date Of Birth</label>
          <input
            type="text"
            v-model="doctorProfile.dob"
            id="date_of_birth"
            name="date_of_birth"
            placeholder="date_of_birth"
          />
          <label>Phone</label>
          <input
            type="text"
            v-model="doctorProfile.phone"
            id="phone"
            name="phone"
            placeholder="phone"
          />
          <label>Street Address</label>
          <input
            type="text"
            v-model="doctorProfile.street"
            id="addressOne"
            name="addressOne"
            placeholder="Address 1"
          />
          <label>City</label>
          <input
            type="text"
            v-model="doctorProfile.city"
            id="city"
            name="city"
            placeholder="City"
          />
          <label>State</label>
          <select type="text" v-model="doctorProfile.state" id="state" name="state">
            <option
              v-for="(usState, index) in usStates"
              :key="index"
              :selected="doctorProfile.state === usState"
              >{{ usState }}</option
            >
          </select>
          <label>Zipcode</label>
          <input
            type="text"
            v-model="doctorProfile.zipcode"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
          />
          <button v-on:click="updateProfile()">UPDATE</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'UpdateDoctorProfile',
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
      
    }
  },
  created () {
    // An Action Loaded in From mapActions
    this.loadDoctorProfile()
  },
  computed: {
    ...mapState('doctor', {
      doctorProfile: state => state.doctorProfile
    })
  },
  methods: {
    ...mapActions('doctor', [
      'loadDoctorProfile'
    ]),
    updateProfile (e) {
      const {doctorProfile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      console.log(this)
      dispatch('doctor/updateProfile', doctorProfile)
    }
  }
}
</script>
