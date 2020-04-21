<template>
<div class="Messagebox">
  <div class="dropdown">
    <span><img class="logo"src="https://image.flaticon.com/icons/svg/1827/1827301.svg"> NOTIFICATION ALERTS! </span>
    <div class="dropdown-content">
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
  background: red;
  border-radius: 30%;
  margin: 10px;
}

.Messagebox {
  margin:20px 0 0;
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
  padding: 15px 15px;

}

.sendingTime {
  font-size: 11px;
  color: black;
  text-align: center;

}

.alert {
  text-align: left;
  font-size: 12px;
  background-color: #00c7db;
  border-radius: 5px;
  padding: 5px 5px;
  color: white;
  margin-bottom: 0.2px;

}

.dropdown {
  text-align: center;
  display: inline-block;
  background: red;
  border-radius: 10px;
  padding: 10px;
  color: white;
  width: 80%;

}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #F0F0F0;
  border-radius: 10px;
  min-width: 160px;
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logo {
  width: 20px;
}

</style>

