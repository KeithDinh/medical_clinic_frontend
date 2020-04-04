// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import { store } from './store'
import {router} from './router'
import App from './App'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return formatter.format(value)
})

Vue.filter('frontEndTimeFormat', function(str) {
  var dateobj=new Date(str);
  var hours = dateobj.getUTCHours();
  var minutes = dateobj.getUTCMinutes();
  var seconds = dateobj.getUTCSeconds();
  console.log(hours + ":" + minutes + ":" + seconds);
  return hours + ":" + minutes + ":" + seconds;
})

Vue.filter('frontEndDateFormat', function(str) {
  var dateobj=new Date(str);
  var date = dateobj.getUTCDate();
  var month=dateobj.getUTCMonth();
  var year= dateobj.getUTCFullYear();
  return month+"/"+date+"/"+year;
})

