<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Register</div>
        <div id="register-form" class="row forms">
          <input type="text" v-model="username" id="username" name="username" placeholder="Username">
          <input type="text" v-model="email" id="email" name="email" placeholder="Email">
          <input type="password" v-model="passwordOne" id="passwordOne" name="passwordOne" placeholder="Password">
          <input type="password" v-model="passwordTwo" id="passwordTwo" name="passwordTwo" placeholder="Confirm Password">
          <button id="submit" v-on:click="register()">REGISTER</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: ''
    }
  },
  computed: {
    registering () {
      return this.$store.state.authentication.status.registering
    }
  },
  methods: {
    register (e) {
      this.submitted = true
      const { username, email, passwordOne, passwordTwo } = this
      const { dispatch } = this.$store
      dispatch('authentication/register', { username, email, passwordOne, passwordTwo })
    }
  }
}
</script>
