<template>
  <div id="app">
    <header>
      <div class="row container top-header">
        <div class="logo left" >Health Hub</div>
        <ul class="nav-links left">
          <li><a to="/" href="/">Home</a></li>
          <li class="menu-item-has-children">
            Patients
            <ul class="sub-menu">
              <li><a href="search-doctor">Search Doctor</a></li>
              <li><a href="appointment">Book Appointment</a></li>
              <li><a href="dashboard">Patient Dashboard</a></li>
              <li><a href="update-profile">Update Profile</a></li>
            </ul>
          </li>
          <li><a to="doctor">Doctors</a></li>
          <li><a to="admin">Admin</a></li>
          <img src="https://image.flaticon.com/icons/svg/2345/2345601.svg" width="20" alt="">
        </ul>
        <div class="links right">
          <button style='margin-top: 20px; font-size: 18px'>
          <a href="login" v-if="userStatus.localUser" v-on:click="logout()">Logout</a>
          <a href="login" v-else>Login</a>
          </button>
        </div>
      </div>
      <div class="row container breadcrumbs">
        <breadcrumbs></breadcrumbs>
      </div>
    </header>
    <div class="row main">
      <div class="row return-messages" v-if="alert.messages">
        <div class="message error" v-if="alert.type == 'alert-danger'">
          <!-- <div v-for="(message, index) in alert.messages" :key="index">{{ message }}</div> -->
          <div>{{ alert.messages }}</div>
        </div>
        <div class="message success" v-if="alert.type == 'alert-success'">
          <div>{{ alert.messages }}</div>
        </div>
      </div>
      <router-view/>
    </div>


    
    <section class="SpecialistBackground">

    
    <ul class="specialist">
    <h1>Clinic and Specialists</h1>
    <table>
      <th class="tableEdit">General Practitioner</th> 
      <th class="tableEdit">Urologist</th>
      <th class="tableEdit">Neurologist</th>
      <th class="tableEdit">Orthopedic</th>
      <th class="tableEdit">Cardiologist</th>
      <th class="tableEdit">Allergist</th>
      <th class="tableEdit">Radiologist</th>
      <th class="tableEdit">Pathologist</th>
      <th class="tableEdit">Ophthalmologist</th>
      <th class="tableEdit">Pediatrician</th>

      <tr>
      <td><img src="https://image.flaticon.com/icons/svg/387/387561.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2518/2518743.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/1491/1491416.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2719/2719401.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/1142/1142172.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2328/2328381.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2522/2522870.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2167/2167212.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/2731/2731582.svg" width="100" alt=""></td>
      <td><img src="https://image.flaticon.com/icons/svg/163/163003.svg" width="100" alt=""></td>
      </tr>
    </table>
    </ul>
    </section>

    <section>

    <h1 class="AvailFeatHead">Available Features in Our Clinic</h1>
    <ul class="AvailFeat">
    <table>
      <th class="AvailEdit">Operation</th> 
      <th class="AvailEdit">Medical</th>
      <th class="AvailEdit">Patient Ward</th>
      <th class="AvailEdit">Test Room</th>
      <th class="AvailEdit">ICU</th>
      <th class="AvailEdit">Laboratory</th>
      

      <tr>
      <td><img src="https://webstockreview.net/images/patient-clipart-surgery-patient-1.png" width="200" alt=""></td>
      <td><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/pharmacy-49-1104644.png" width="200" alt=""></td>
      <td><img src="https://media.istockphoto.com/vectors/doctor-nurse-and-caucasian-male-patient-in-the-hospital-room-vector-id985826238?k=6&m=985826238&s=612x612&w=0&h=YlQpMBzuN2OUQY5YKbp8eg5FdjSjdAqZ-byhyWyd4Dk=" width="200" alt=""></td>
      <td><img src="https://www.chp.edu/-/media/chp/departments-and-services/radiology/patient-procedures/nuclear-medicine-tests.jpg?h=243&w=275&la=en&hash=4976F8F9DEB7C037C66E997368869896" width="200" alt=""></td>
      <td><img src="https://cdn.clipart.email/77cee3096f71516e044edd3b0e7d1543_royalty-free-icu-patient-clip-art-vector-images-illustrations-_612-612.jpeg" width="200" alt=""></td>
      <td><img src="https://us.123rf.com/450wm/aurielaki/aurielaki1708/aurielaki170800016/83486378-stock-vector-clinical-research-clinical-laboratory-isometric-people-cartoon-character-vector-icon.jpg?ver=6" width="200" alt=""></td>

    </tr>
    </table>
    </ul>

    </section>


    <footer>
    <h1 class="foottitle">Health Hub</h1>
    <p class="footpara">We offer an expanded range of health services for everyday care and chronic conditions.</p>
    <p class="footpara">All from a team of care professionals. </p>
    <p class="footpara">We promote a path to better health. </p>
    <p class="footpara">ALL IN ONE PLACE! </p>
    <img class="footlogo center" src="https://www.cvs.com/bizcontent/marketing/health-hub/health-hub-illustration.png" width="600" alt="">

    </footer>

  </div>
</template>
<script>
import Vue from 'vue'
import VueBreadcrumbs from 'vue-breadcrumbs'
Vue.use(VueBreadcrumbs)
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



.SpecialistBackground {
  background: #81d4f7;
}

.tableEdit {
  font-size: 17px;
  padding: 20px;
}

.specialist {
  list-style-type: square;
  padding-top: 20px;
  padding-bottom: 150px;
  color: #ffffff;
}

.AvailFeatHead {
  color: #0d75a6;
}

.AvailFeat {
  padding-bottom: 100px;
}

.AvailEdit {
  font-size: 25px;
  padding: 60px;
}

footer {
  padding-top: 5px;
  padding-bottom: 100px;
  color: #ffffff;
  flex-shrink: 0;
  background: #0d75a6;
}

.logo {
  color: #0d75a6;
  text-font: bold;
}

.footlogo {
width: 300px;
padding-bottom: -150px;
padding-left: 20px;
float: center;
}

.foottitle {
text-align: center;
padding: 0px;
font-size: 50px;
}

.footpara {
text-align: center;
padding-right: 0px;
font-size: 30px
}


.return-messages{width: 150px;}
</style>
