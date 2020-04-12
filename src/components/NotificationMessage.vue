<template>
  <div>
    <template v-for="message in messages">
       <div class="row">{{message.sending_time}}</div>
        <div>{{message.message}}</div>
    </template>
  </div>
</template>


<script>

import { mapState, mapActions } from 'vuex'
export default {
  name: 'NotificationMessage',
  created () {
    this.loadMessages()
  },
  components: {
  },
  computed: {
    ...mapState('notifications', {
      messages: state => state.messagesList
    })
  },
  methods: {
    ...mapActions('notifications', [
      'loadMessages'
    ]),
  },
}


</script>
<style media="screen">

</style>
