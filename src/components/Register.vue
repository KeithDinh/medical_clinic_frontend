<template>
  <div class="row update">
    <div class="row card card-container" style="width:50%">
      <div class="row form">
        <div class="row form-ctn">
          <div class="row form-title">Register</div>
          <div id="register-form" class="row forms">
            <input type="text" v-model="email" id="email" name="email" placeholder="email">
            <input type="password" v-model="passwordOne" id="passwordOne" name="passwordOne" placeholder="Password">
            <input type="password" v-model="passwordTwo" id="passwordTwo" name="passwordTwo" placeholder="Confirm Password">
            <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="First Name">
            <input type="text" v-model="middleInit" id="middle" name="middle" placeholder="Middle Initial">
            <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Last Name">
            <input type="text" v-model="street" id="street" name="street" placeholder="Street Address">
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
            <input type="text" v-model="zipcode" id="zipcode" name="zipcode" placeholder="Zipcode">
            <input type="text" v-model="phone" id="phone" name="phone" placeholder="Phone">
            <datepicker v-model="dob" name="dob" placeholder="Date of birth" format="MM/dd/yyyy"></datepicker>
            <label>Gender</label>
            <select type="text" v-model="gender" id="gender" name="gender" placeholder="Gender">
              <option>M</option>
              <option>F</option>
            </select>
            <label>Marital Status</label>
            <select type="text" v-model="marital" id="marital" name="marital" placeholder="Marital Status">
              <option value='S'>Single</option>
              <option value= 'M'>Married</option>
            </select>
            <label>Race/Ethnicity</label>
            <select type="text" v-model="race" id="race" name="race" placeholder="Race / Ethnicity">
                    <option v-for="race in races" v-bind:value="race">{{ race }}</option>
              </select>
            <button id="submit" v-on:click="register()">REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'Register',
  components: {
    Datepicker
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
      marital: '',
      race: '',
      races: [
        'African American',
        'Asian',
        'Native American and Alaskan Native',
        'Native Hawaiian or Other Pacific Islander',
        'White'
      ],
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
  computed: {
    registering () {
      return this.$store.state.authentication.status.registering
    }
  },
  methods: {
    register (e) 
    {
      this.submitted = true
      const { email, passwordOne, passwordTwo, firstName, middleInit, lastName, 
      street, city, state, zipcode, phone, dob, gender, marital, race } = this

      const { dispatch } = this.$store

      dispatch('authentication/register', { email, passwordOne, passwordTwo, firstName, 
      middleInit, lastName, street, city, state, zipcode, phone, dob, gender, marital, race })
    }
  }
}
</script>
