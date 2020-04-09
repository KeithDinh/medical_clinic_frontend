<template>

  <div class="row">
    <div class="row mainBG">
      <div class="row">
        <div class="headings left">
          <div class="row heading1"><h1>Discover the best doctors, and clinics at the Health Hub.</h1></div>
          <div class="row heading2"><h2>Make an Appointment today by clicking on the 'Patients' tab</h2></div>
          <div class="row action"><div class="login-btn"><a href="login">click here to login</a></div></div>
        </div>
      </div>
      <div class="overlay"></div>
    </div>


    <section class="row specialist">
      <div class="row container">
        <div class="row heading"><h2>Our doctors specialize in the following areas:</h2></div>
        <ul>
          <li>
            <div class="row content">
              <div class="row spec-title">General Practitioner</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/387/387561.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Urologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2518/2518743.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Neurologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/1491/1491416.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Orthopedic</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2719/2719401.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Cardiologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/1142/1142172.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Allergist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2328/2328381.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Radiologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2522/2522870.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Pathologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2167/2167212.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Ophthalmologist</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/2731/2731582.svg" alt=""></div>
            </div>
          </li>
          <li>
            <div class="row content">
              <div class="row spec-title">Pediatrician</div>
              <div class="row spec-logo"><img src="https://image.flaticon.com/icons/svg/163/163003.svg" alt=""></div>
            </div>
          </li>       
        </ul>
      </div>
    </section>
<!--
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
    </ul>-->
    </section>
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
  position:relative;
  background-size: cover;
  background-image: url("/static/images/female-doctor.jpg");
  background-repeat: no-repeat;
  background-position: center;
  color: #0d75a6;
  padding:80px 0;
}

.mainBG .container {max-width:1000px;}
.mainBG .headings {width:70%}
.mainBG h1, .mainBG h2 {text-align:left;}
.mainBG .heading1, .mainBG .heading2, .mainBG .action {position:relative;width:50%;z-index:2}
.mainBG .heading2 {margin-top:20px;}
.mainBG .action {margin-top:33px;}
.mainBG .action .login-btn a {font-weight:600;padding:10px 30px;border:none;border-radius:50px;background:#00c7db;color:#fff;}

h1 {font-weight:700;}
h2 {font-weight:700;}

.overlay {height:100%;width:100%;display:block;position:absolute;top:0;left:0;background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 80%);}


.specialist {
  padding:50px 0 80px;
}

.specialist h2 {
  color: #6d6e6f;  
  font-weight:600;
}

.specialist .container {
  max-width:1200px;
}

.specialist ul {margin:15px 0 0;}

.specialist li {
  margin:30px 0 0;
  width:20%;
  float:left;
  padding:5px;
}

.specialist li .spec-title {
  color:#0d75a6;
  font-size:18px;
  text-align: center;
}

.specialist .spec-logo {
  text-align:center;
}

.specialist .spec-logo img {
  margin:15px auto 0;
  padding:0 15px;
  width:60%;
}

.tableEdit {
  font-size: 17px;
  padding: 20px;
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

</style>






