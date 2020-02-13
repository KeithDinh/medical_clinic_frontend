<template>
  <div class="row">
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Login</div>
        <div id="login-form" class="row forms">
          <input type="text" v-model="username" id="username" name="username" placeholder="Username">
          <input type="password" v-model="password" sid="password" name="password" placeholder="Password">
          <button id="submit" v-on:click="login()">LOGIN</button>
        </div>
      </div>
    </div>
    <div class="row form">
      <div class="row form-ctn">
        <div class="row form-title">Need an Account?</div>
        <form id="register-form" class="row forms">
          <router-link to="/register" class="btn">Click Here to Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn
    }
  },
  created () {
    
  },
  methods: {
    login (e) {
      this.submitted = true
      const { username, password } = this
      const { dispatch } = this.$store

      dispatch('authentication/login', { username, password })
    }
  }
}
</script>
