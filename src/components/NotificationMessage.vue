<template>
  <div class="Messagebox">
    <div class=messageTitle><h4 class="notification">NOTIFICATION <br>ALERTS!</h4>
    <div class="messages">
    <template v-for="message in messages">
       <div >
        <span class="sendingTime">{{message.sending_time}}</span>
       </div>
        <div class="alert">
          {{message.message}}
        </div>
    </template>
  </div>
  </div>
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


.notification {
  text-align: center;
  background: yellow;
  border-radius: 30%;
  margin: 10px;
}

.Messagebox {
  padding: 15px 15px;
}

.messageTitle {
  text-align: left;
  padding-top: 25px;
  padding-left: 3px;
  border: 2px solid #0d75a6;
  float: left;
  width: 12%;
  border-radius: 25px;
}

.messages {
  padding: 10px 15px;

}

.sendingTime {
  font-size: 11px;
  color: black;
  text-align: center;

}

.alert {
  text-align: center;
  font-size: 12px;
  padding: 1px;
  width: 60%;
  background-color: #f44336;
  border-radius: 25px;
  padding: 10px;
  color: white;
  margin-bottom: 0.2px;

}




</style>
