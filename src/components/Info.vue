<template lang="html">
  <div class="info_container">
    <div class="navigation-button">
    <ul>
      <li>Appointments</li>
      <li>Prescriptions</li>
      <li>Medical Records</li>
    </ul>
    </div>
    <div class="appointments">
      <table >
        <tr>
          <th>Doctor</th>
          <th>Appt Date</th>
          <th>Booking Date</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Ruby </td>
          <td>14 Nov </td>
          <td>12 Nov </td>
          <td>Pending </td>
        </tr>
      </table>
    </div>

    <div class="prescriptions">

    </div>

    <div class="">

    </div>
  </div>

</template>

<script>
export default {
  name: 'Info'
}
</script>

<style lang="css" scoped>
table{
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
}
.navigation-button ul{
  display:flex;
  justify-content: space-evenly;
  margin:30px 20px;
}
.navigation-button ul li{
  cursor:pointer;
  font-size:18px;
  font-weight: bold;
}

.appointments {
  border-radius: 7px;
  margin: 10px 20px;
  border:1px solid rgba(0,0,0,0.2);

}
.appointments table tr th, .appointments table tr td{
  padding:20px;
}
.appointments table tr:not(:last-child){
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
</style>
