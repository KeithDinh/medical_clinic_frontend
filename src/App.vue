<template>
  <div id="app">
    <header>
      <div class="row top-header">
        <ul class="nav-links left">
          <li><router-link to="/">Home</router-link></li>
          <li class="menu-item-has-children">Patients
            <ul class="sub-menu">
              <li><router-link to="/search">Search Doctor</router-link></li>
              <li><router-link to="/appointment">Book Appointment</router-link></li>
              <li><router-link to="/dashboard">Patient Dashboard</router-link></li>
              <li><router-link to="/profile">Profile Settings</router-link></li>
            </ul
          </li>
          <li><router-link to="/admin">Admin</router-link></li>
        </ul>
        <a class="borderless" href="#"  v-on:click="logout()">Logout</a>
      </div>
      <div class="row breadcrumbs">
        <breadcrumbs></breadcrumbs>
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
    <vue-page-transition name="fade">
      <router-view/>
    </vue-page-transition>
    <footer>Made with care by Team 5</footer>
  </div>
</template>
<script>
import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'
import VueBreadcrumbs from 'vue-breadcrumbs'
Vue.use(VueBreadcrumbs)
Vue.use(VuePageTransition)
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
