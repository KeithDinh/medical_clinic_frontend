<template>
  <div class="row update">
    <div class="row card card-container" style="width:50%">
      <div class="row form">
        <div v-if="profile" class="row form-ctn">
          <div class="row form-title">Update Profile</div>
          <div id="profile-form" class="row forms">
            <label class="inputs">First Name</label>
            <input type="text" v-model="profile.firstName" id="firstName" name="firstName" placeholder="First Name"/>
            <label class="inputs"> Middle Initial</label>
            <input type="text" v-model="profile.middleInit" id="middleInit" name="middleInit" placeholder="middleInit"/>
            <label class="inputs">Last Name</label>
            <input type="text" v-model="profile.lastName" id="lastName" name="lastName" placeholder="Last Name"/>
            <label>Primary Doctor</label>
            <button v-if="!isOpen" class="button-info round" v-on:click="addClicked()">Change My Doctor</button><button v-if="isOpen" class="button-info round" v-on:click="addClicked()">Close</button></div>
            <select v-if="isOpen" type="text" v-model="profile.primaryDoctor.doctor_id" id="primaryDoctor.doctor_id" name="primaryDoctor.doctor_id">
                    <option v-for="off in doctors" v-bind:value="off.doctor_id"> {{ off.first_name }} {{off.middle_initial}} {{ off.last_name }}</option>
              </select>
            <input v-if="!isOpen" type="text" v-model="profile.primaryDoctor.primary_doctor" id="primaryDoctor"
            name="primaryDoctor" placeholder="primary doctor" disabled/>
            <label class="inputs">Gender</label>
            <input type="text" v-model="profile.gender" id="gender" name="gender" placeholder="gender"/>
            <label class="inputs">Race</label>
            <input type="text" v-model="profile.race" id="race" name="race" placeholder="race"/>
            <label class="inputs">Date Of Birth</label>
            <input type="text" v-model="profile.dob.toString().substring(4,16)" id="dob" name="dob" placeholder="date_of_birth" disabled/>
            <label class="inputs">Phone</label>
            <VuePhoneNumberInput v-model="profile.phone" />
            <label class="inputs">Street Address</label>
            <input type="text" v-model="profile.street" id="street" name="street" placeholder="street"/>
            <label class="inputs">City</label>
            <input type="text" v-model="profile.city" id="city" name="city" placeholder="City"/>
            <label class="inputs">State</label>
            <select type="text" v-model="profile.state" id="state" name="state">
              <option v-for="(usState, index) in usStates" :key="index" :selected="profile.state === usState">{{ usState }}</option>
            </select>
            <label class="inputs">Zipcode</label>
            <input type="text" v-model="profile.zipcode" id="zipcode" name="zipcode" placeholder="Zipcode"/>
            <button v-on:click="updateProfile()">UPDATE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      isOpen: false,
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
  components: {
    VuePhoneNumberInput
  },
  created () {
    // An Action Loaded in From mapActions
    this.loadProfile()
    this.loadPhysician()
  },
  computed: {
    ...mapState('profile', {
      complete: state => state.profileStatus.profileComplete,
      profile: state => state.userProfile
    }),
    ...mapState('doctor', {
      doctors: state => state.doctorsList
    }),
  },
  methods: {
    ...mapActions('profile', [
      'loadProfile'// -> this.foo()
    ]),
    ...mapActions('doctor', [
      'loadPhysician'// -> this.foo()
    ]),
    updateProfile (e) {
      this.submitted = true
      const {profile} = this
      const { dispatch } = this.$store
      // An Action Loaded in From mapActions
      dispatch('profile/updateProfile', profile)
    },
    addClicked: function () {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    }
  }
}
</script>
