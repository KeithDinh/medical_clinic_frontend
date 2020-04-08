<template>
  <div class="container">
  <form >
  <div class="row">
    <div class="col-30">
      <label >Medication Name</label>
    </div>
    <div class="col-70">
      <select name="medication name">
        <option >medication1</option>
      </select>
    </div>
  </div>
    <div class="row">
    <div class="col-30">
      <label >Medication Form</label>
    </div>
    <div class="col-70">
      <select name="medication form">
        <option >form1</option>
        <option >form2</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col-30">
      <label for="subject">Subject</label>
    </div>
    <div class="col-70">
      <textarea id="subject" name="subject" placeholder="Dosage and instruction" style="height:100px"></textarea>
    </div>
  </div>
  <div class="row">
    <input type="submit" value="Submit">
  </div>
  </form>
</div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import DoctorProfile from "./DoctorProfile";

export default {
  name: 'NewPrescription',
  components: {

  },
  data () {
    return {}
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}

</script>
<style media="screen">
</style>

