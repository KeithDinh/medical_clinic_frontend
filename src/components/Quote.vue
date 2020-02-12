<template>
  <div class="row">
    <div class="row form-ctn">
      <div class="row form-title">Fuel Quote</div>
      <div id="quote-form" class="row forms">
        <input type="text" v-model="quote.gallons" id="gallons" name="gallons" placeholder="Gallons Requested">
        <datepicker v-model="quote.deliveryDate" name="deliveryDate" placeholder="Delivery Date: mm/dd/yyyy" format="MM/dd/yyyy"></datepicker>
        <div class="row text-block">
          <div class="row relative"><span class="title left disabled-field">Delivery Address:</span></div>
          <div class="address-block">
            <div class="row address-data" v-if="profile"> {{ profile.addressOne }} </div>
            <div class="row address-data" v-if="profile"> {{ profile.addressTwo }} </div>
            <div class="row address-data" v-if="profile"> {{ profile.city }}, {{ profile.state }} {{ profile.zipcode }} </div>
          </div>
        </div>
        <div class="row text-block">
          <div class="row relative" id="price">
            <span class="title left disabled-field">Suggested price: </span><span class="left price-qt" v-if="quote.price">{{ quote.price | toCurrency }}</span>
          </div>
          <div class="row relative" id="total">
            <span class="title left disabled-field">Calculated total: </span><span class="left price-qt" v-if="quote.total">{{ quote.total | toCurrency }}</span>
          </div>
        </div>
        <div class="row buttons">
          <input type="button" value="GET PRICE"  id="submit" :disabled='isDisabled' v-on:click="getPrice()">
          <input type="button" value="GET QUOTE" id="submit" :disabled='isDisabled' v-on:click="newQuote()">
        </div>
      </div>
    </div>
    <div class="row history">
      <QuoteHistory />
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'

import QuoteHistory from './QuoteHistory'

export default {
  name: 'Quote',
  components: {
    Datepicker,
    QuoteHistory
  },
  created () {
    this.$store.dispatch('profile/loadProfile')
  },
  computed: {
    ...mapState('profile', {
      profile: state => state.userProfile
    }),
    ...mapState('quote', {
      quote: state => state.quoteForm
    }),
    isDisabled: function () {
      const {gallons, deliveryDate} = this.quote
      return (!gallons || !deliveryDate)
    }
  },
  methods: {
    getPrice () {
      this.submitted = true
      const {gallons, deliveryDate} = this.quote
      const { dispatch } = this.$store
      dispatch('quote/getPrice', {gallons, deliveryDate})
    },
    newQuote () {
      this.submitted = true
      const {gallons, deliveryDate} = this.quote
      const { dispatch } = this.$store
      dispatch('quote/newQuote', {gallons, deliveryDate})
    }
  }
}

</script>
