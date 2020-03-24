<template>
  <div id="app">
    <header>
      <div class="row container top-header">
        <div class="logo left" >LOGO</div>
        <ul class="nav-links left">
          <li><a to="/" href="/">Home</a></li>
          <li class="menu-item-has-children">
            Patients
            <ul class="sub-menu">
              <li><a href="search-doctor">Search Doctor</a></li>
              <li><a href="appointment">Book Appointment</a></li>
              <li><a href="dashboard">Patient Dashboard</a></li>
              <li><a href="update-profile">Update Profile</a></li>
            </ul>
          </li>
          <li><a to="admin">Admin</a></li>
        </ul>
        <div style='margin-top: 20px;' class="links right">
          <a href="login" v-if="userStatus.localUser" v-on:click="logout()">Logout</a>
          <a href="login" v-else>Login</a>
        </div>
      </div>
      <div class="row container breadcrumbs">
        <breadcrumbs></breadcrumbs>
      </div>
    </header>
    <div class="row main">
      <div class="row return-messages" v-if="alert.messages">
        <div class="message error" v-if="alert.type == 'alert-danger'">
          <!-- <div v-for="(message, index) in alert.messages" :key="index">{{ message }}</div> -->
          <div>{{ alert.messages }}</div>
        </div>
        <div class="message success" v-if="alert.type == 'alert-success'">
          <div>{{ alert.messages }}</div>
        </div>
      </div>
      <router-view/>
    </div>
    <footer>Made with care by Team 5</footer>
  </div>
</template>
<script>
import Vue from 'vue'
import VueBreadcrumbs from 'vue-breadcrumbs'
Vue.use(VueBreadcrumbs)
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
.return-messages{width: 150px;}
</style>
