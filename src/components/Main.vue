<template>
<div>
  <div>
    <div class="mainBG">
      <h1 class="mainPage">Make an Appointment today by clicking on the 'Patients' tab
      </h1>
      <img src="https://image.flaticon.com/icons/svg/387/387628.svg" width="150" alt="">
      <h2 class="mainPage">Discover the best doctors, clinics and hospitals at the Health Hub.</h2>
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
    <h1 class="foottitle" >Health Hub</h1>
    <p class="footpara">We offer an expanded range of health services for everyday care and chronic conditions. <br>All from a team of care professionals.<br>We promote a path to better health. <br>ALL IN ONE PLACE!</p>
    <img class="footlogo center" src="https://www.cvs.com/bizcontent/marketing/health-hub/health-hub-illustration.png" width="600" alt="">
    </footer>
  </div>
</div>

  
  
  

</template>
<script>

export default {
  name: 'Main',
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>

.mainPage {
  font-size:30px;
  padding: 35px;
  font: bold;
  background: black;
  opacity: 0.75;
}


.mainBG {
  background-size: cover;
  background-image: url("https://cdn.shopify.com/s/files/1/2198/0277/files/Houston-skyline.jpg?15716366482872199911");
  color: #ffffff;
  padding-top: 0.1px;
  padding-bottom: 0.1px;

}


.SpecialistBackground {
  background: #0d75a6;
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
  padding-top: 0.1px;
  padding-bottom: 30px;
  color: #ffffff;
  flex-shrink: 0;
  background: #0d75a6;
}



.footlogo {
width: 140px;
padding-bottom: -150px;
padding-left: 13px;
float: center;
}

.foottitle {
padding: 0.25em;
padding-top: 10px;
font-size: 37px;
border-style: groove;
border-width: 5px;

height: 75px;
margin: 0.25em;
}

.logo {
  color: #0d75a6;
  font: bold;
}

.footpara {
text-align: center;
padding-right: 0px;
font-size: 17px
}
</style>






