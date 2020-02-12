<template>
  <div id="app">
    <header>
      <div class="row top-header">
        <div class="row content">
          <ul class="nav-links right" v-if="userStatus.localUser">
            <li><a href="quote">Fuel Quote</a></li>
            <li><a href="profile">Update Profile</a></li>
            <li><a class="borderless" href="#"  v-on:click="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
      <div class="row main-header">
        <div class="row content"><h1>Medical Booking System</h1></div>
      </div>
    </header>
    <div class="row content">
      <div class="row return-messages" v-if="alert.messages">
        <div class="message error" v-if="alert.type == 'alert-danger'">
          <div v-for="(message, index) in alert.messages" :key="index">{{ message }}</div>
        </div>
        <div class="message success" v-if="alert.type == 'alert-success'">
          <div>{{ alert.messages }}</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <footer>Made with care by Team 5</footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    alert () {
      return this.$store.state.alert
    },
    // This Names Your Property That You Are Referencing in The Template
    userStatus () {
    // if you want to expose the entire sate
      return this.$store.state.authentication
    }
  },
  watch: {
    $route (to, from) {
      this.$store.dispatch('alert/clear')
    }
  },
  methods: {
    logout (e) {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
