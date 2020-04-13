<template>
    <div>
      <template v-for="profile in doctors">
        <div class="doctorBlock" v-if="profile" style="display:inline-block; padding-top:30px;">
          <div class="col">
            <img class="profile-icon" src="https://image.flaticon.com/icons/svg/1077/1077012.svg" alt="">
          </div>
          <div class="col">
             <div class="doctor-name">{{ profile.firstName }}  <span>{{ profile.middleInit }}</span> <span>{{ profile.lastName }}</span></div>
              <div class="col">
              <div class="text"><p ><p class="align-left">MRN: </p><p class="align-right"> {{profile.doctorId}}</p></div>
              <div style="clear:both;"></div>
              <div class="text"><p class="align-left">Phone: </p><p class="align-right">{{ profile.phone }}</p></div>
              <div style="clear:both;"></div>
              <br>
              <div class="text"><p class="align-left">Specialization: </p><br><p class="align-right">{{ profile.specializationName }}</p></div>
              <div style="clear:both;"></div>
          </div>
          <div class="col" style="margin: 10px;">
              <div class="text"><p class="align-left">DOB </p><p class="align-right">{{ profile.dob }}</p></div>
              <div style="clear:both;"></div>
              <div class="text"><p class="align-left">Gender: </p><p class="align-right">{{ profile.gender }}</p></div>
              <div style="clear:both;"></div>
              <div class="text"><p class="align-left">Race: </p><p class="align-right">{{ profile.race }}</p></div>
              <div style="clear:both;"></div>
              <div class="text"><p class="align-left">Address: </p><p class="align-right">{{profile.street}}, {{profile.city}}</p></div>
              <div style="clear:both;"></div>
              <div class="text"><p class="align-left"> </p><p class="align-right">{{profile.state}} {{profile.zipcode}}</p></div>
              <div style="clear:both;"></div>
              <br>
              <div class="editDoctor"><a href="#" v-on:click="doctor(profile.doctorId)">Edit Doctor</a></div>
              
          </div>
          </div>
      </div>
      </template>

    </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default
{
   name: 'AdminDoctor',
   created () {
      this.loadAdminDoctors()
   },
   computed: {
     ...mapState('admin', {
       doctors: state => state.doctors
     })
   },
   methods: {
     ...mapActions('admin', [
       'loadAdminDoctors'
     ]),
     ...mapActions('doctor', [
      'reloadDoctor'
    ]),
    doctor(value) {
      alert(value)
      const res = this.reloadDoctor(value)
    }
   }
}
</script>

<style media="screen">

.doctorBlock {
  margin-left: 170px;
}

.editDoctor {
  text-align: center;
  float: left;
  background-color: #00c7db;
  color: white;
  transition: 0.3s;
  opacity: 0.7;
  padding: 5px 10px;
  border-radius: 15px;
}

.editDoctor:hover {
background-color: #00c7db;
opacity: 1
}

.doctor-name{
  font-weight: bold;
  font-size: 20px;
  margin-left: 40%;
}
.text{
  display:block;
  margin-left:25px;
  margin-right:25px;
  font-size:14px;
}
.align-left{
  float:left;
  padding:0 30px;

  }
.align-right{
  float:right;
  color: black;
  padding:0 30px;
  margin: 3px;
}
.profile-icon{
  padding:10px;
  background-color: #cbe4ec;
  width:190px;
  border-radius: 5px;
  border-color:#81d4f7;
}
    .db{display: flex;  margin-top: 30px;}
  .db>*{background-color: #fff;  border: 1px solid rgba(0,0,0,0.1); border-radius: 7px;}
</style>


