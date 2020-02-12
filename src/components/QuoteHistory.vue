<template>
  <div class="row history">
    <div class="row content">
      <div class="row history-ctn">
        <div class="row history-title"><h2>Quote History</h2></div>
        <table class="quotesTable">
          <thead>
            <tr>
              <th>Date of Request</th><th>Delivery Date</th><th>Delivery Address</th><th>Gallons Requested</th><th>Suggested Price</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quote, index) in history" :key="index">
              <td><span>{{ quote.requestDate }}</span></td>
              <td><span>{{ quote.deliveryDate }}</span></td>
              <td>
                <div class="row"><span class="line">{{ quote.addressOne }}</span></div>
                <div v-if="quote.addressTwo" class="row"><span class="line">{{ quote.addressTwo }}</span></div>
                <div class="row">
                  <span class="line">{{ quote.city }}, </span>
                  <span class="line">{{ quote.state }} </span>
                  <span class="line">{{ quote.zipcode }}</span>
                </div>
              </td>
              <td><span>{{ quote.gallons }}</span></td>
              <td><span>{{ quote.price | toCurrency }}</span></td>
              <td><span>{{ quote.total | toCurrency }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'History',
  created () {
    // An Action Loaded in From mapActions
    this.getQuoteHistory()
  },
  computed: {
    ...mapState('history', {
      history: state => state.quotesList
    })
  },
  methods: {
    ...mapActions('history', [
      'getQuoteHistory' // -> this.quoteHistory()
    ])
  }
}
</script>
