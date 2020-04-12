<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Register A Doctor</div>
        <div id="register-form" class="row forms">
          <label>Email</label>
          <input type="text" v-model="email" id="email" name="email" placeholder="email"> 
          <label>Password</label>
          <input type="password" v-model="passwordOne" id="passwordOne" name="passwordOne" placeholder="Password">
          <label>Confirm Password</label>
          <input type="password" v-model="passwordTwo" id="passwordTwo" name="passwordTwo" placeholder="Confirm Password">
          <label>First Name</label>
          <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="First Name">
          <label>Middle Initial</label>
          <input type="text" v-model="middleInit" id="middle" name="middle" placeholder="Middle Initial">
          <label>Last Name</label>
          <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Last Name">
          <label>Street Address</label>
          <input type="text" v-model="street" id="street" name="street" placeholder="Street Address">
          <label>City</label>
          <input type="text" v-model="city" id="city" name="city" placeholder="City">
          <label>State</label>
          <select type="text" v-model="state" id="state" name="state">
            <option 
              v-for="(usState, index) in usStates"
              :key="index"
              :selected="state === usState"
              >{{ usState }}
            </option>
          </select>
          <label>Zipcode</label>
          <input type="text" v-model="zipcode" id="zipcode" name="zipcode" placeholder="Zipcode">
          <label>Specialization</label>
          <select type="text" v-model="specialistId" id="specialistId" name="specialistId" placeholder="Specialization">
                  <option v-for="off in specialList" v-bind:value="off.specialist_id">{{ off.specialization_name }}</option>
            </select>
          <br>
          <br>
          <label>Phone</label>
          <VuePhoneNumberInput v-model="phone" id="phone" name="phone" placeholder="Phone"/>
          <br>
          <label>Date Of Birth</label>
          <datepicker v-model="dob" name="dob" placeholder="Date of birth" format="MM/dd/yyyy"></datepicker>
          <label>Gender</label>
          <select type="text" v-model="gender" id="gender" name="gender" placeholder="Gender">
                  <option> M</option>
                  <option> F</option>
          </select>
          <br>
          <br>
          <label>Profile Picture</label>
          <input type="text" v-model="image" id="image" name="image" placeholder="Image">
          
          <label>Race/Ethnicity</label>
          <select type="text" v-model="race" id="race" name="race" placeholder="Race / Ethnicity">
                  <option> White</option>
                  <option> African American</option>
                  <option> Hispanic and Latino Americans</option>
                  <option> Asian</option>
                  <option>Native Americans and Alaska Natives</option>
                  <option>Native Hawaiian or Other Pacific Islander</option>
                  
            </select>
          <br><br>
          <button id="submit" v-on:click="register()">REGISTER</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
Vue.component('vue-phone-number-input', VuePhoneNumberInput)
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'AdminDoctorRegister',
  components: {
    Datepicker,
    VuePhoneNumberInput
  },

  data () {
    return {
      email: '',
      passwordOne: '',
      passwordTwo: '',
      firstName: '',
      middleInit: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      dob: '',
      gender: '',
      specialistId: '',
      race: '',
      image:'',
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
    this.loadSpecializations()
  },
  computed: {
    // registering () {
    //   return this.$store.state.authentication.status.registering
    // },
    ...mapState('doctor', {
      specialList: state => state.specializationList
    }),
  },
  methods: 
  {
    register (e) {
      this.submitted = true
      const { firstName, middleInit, lastName,phone, specialistId,
      gender,email,password, passwordTwo, race,dob, street, city, state, zipcode, image  } = this
      const { dispatch } = this.$store
      dispatch('authentication/registerDoctor', { firstName, middleInit, lastName,phone, specialistId,gender,email,
      passwordOne, passwordTwo, race,dob, street, city, state, zipcode,image})
    },

    ...mapActions('doctor', [
          'loadSpecializations'
    ]),
    ...mapActions('authentication', [
          'registerDoctor'
    ]),
  }
}
</script>
