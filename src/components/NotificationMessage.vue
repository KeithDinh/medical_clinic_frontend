<template>
  <div  v-if="userStatus.localUser != null && userStatus.localUser.role_id===2">
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
    }),
            userStatus () {
    // if you want to expose the entire sate
      return this.$store.state.authentication
    }
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
