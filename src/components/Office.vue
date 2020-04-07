<template>
    <div>

        <div class="headerContainer">
            <div class="headerBackground"></div>
          <div class="overlay">
            <div class="header">
              <h1>We Offer Health Services At <br>Multiple Offices </h1>
            </div>
          </div>
        </div>

            <table >
                <template>
                <div v-for="off in offices" v-bind:value="off.office_id">
                    <th class="tableEdit_1">{{off.office_name}}</th> <br>
                    <td class="tablerow">Street Address: {{off.street_1}}</td><br>
                    <td class="tablerow">City: {{off.city}}</td><br>
                    <td class="tablerow">ZipCode: {{off.state}}</td>
                    <td class="tablerow_zip">{{off.zipcode}}</td><br>
                    <td class="tablerow">Contact: {{off.phone}}</td><br>
                </div>
                </template>
            </table>
            
      </div>
    
</template>
<script>

import { mapState, mapActions } from 'vuex'
import Vue from 'vue';
export default {

  name: 'Office',
  data: function () {
    return {
      office: '',
    };
  },
  created () {
    this.loadOffices()
  },
  computed: {
    ...mapState('offices', {
      offices: state => state.officeList
    }),
  },
  methods: {
    ...mapActions('offices', [
          'loadOffices'
    ]),
  }
}


</script>
<style media="screen">
div {
  
 

}

.tablerow{
    font-size: 20px;
    color:rgb(0, 0, 0);
    font: bold;
    padding-left:180px;
}

.tablerow_zip{
    font-size: 20px;
    color:rgb(0, 0, 0);
    font: bold;
}

.tableEdit_1 {
  font-size: 35px;
  padding-right: 120px;
  padding-left: 150px;
  padding-bottom: 10px;
  color: #0d75a6;
}



.headerContainer {
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #0d75a6;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
}

.headerContainer:hover .overlay {
  bottom: 0;
  height: 100%;
}

.header {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.headerBackground {
  padding: 200px;
  padding-top: 15px;
  background: url("https://wallpaperplay.com/walls/full/2/0/8/13986.jpg");
  background-size: cover;
  height: 300px;

}

</style>
