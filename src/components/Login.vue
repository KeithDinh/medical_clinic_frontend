<template >
  <div class="row main-pad-80">
    <div class="row card card-container" style="width:35%">
      <div class="row form">
        <div class="row form-ctn">
          <div class="row form-title">Login</div>
          <form @submit.prevent="handleSubmit">
            <div id="login-form" class="row forms">
              <input type="text" v-model="email" id="email" name="email" placeholder="Email">
              <input type="password" v-model="password" sid="password" name="password" placeholder="Password">
              <button id="submit" v-on:click="login()">LOGIN</button>
            </div>
          </form>
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
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
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
      const { email, password } = this
      const { dispatch } = this.$store
      dispatch('authentication/login', { email, password })
    }
  }
}
</script>
<style>
#login-form {max-width:360px;}
</style>
