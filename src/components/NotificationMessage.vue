<template>
<div class="Messagebox">
  <div class="dropdown" >
    <span style="color:white;font-weight: bold"><img class="logo"src="https://image.flaticon.com/icons/svg/1827/1827301.svg"> NOTIFICATION ALERTS! </span>
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
  background: #f86504;
  border-radius: 30%;
  margin: 10px;
}

.Messagebox {
  padding: 30px 30px;
  padding-bottom: 40px;
  margin:20px 0 0;
}

.messageTitle {
  text-align: left;
  padding-top: 25px;
  padding-left: 3px;
  border: 2px solid #0d75a6;
  float: left;
  width: 300px;
  border-radius: 25px;
}

.messages {
  padding: 30px 30px;

}

.sendingTime {
  font-size: 11px;
  color: black;
  text-align: center;
}

.alert {
  text-align: left;
  font-size: 12px;
  background-color: #97e5ec;
  border-radius: 10px;
  padding: 10px 10px;
  color: black;
}

.dropdown {
  text-align: center;
  display: inline-block;
  background: #fa653b;
  border-radius: 5px;
  /*border-color: #0d75a6;*/
  padding: 10px;
  /*margin-left: 20px;*/
  color: #050505;
  width: 300px;
  color: white;
  width: 80%;

}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  border-radius: 10px;
  min-width: 250px;
  padding: 12px 16px;
  z-index: 1;
  margin-left:-10px;
  border-color: #96adc5;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition:0.4s;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logo {
  width: 20px;
}

</style>

