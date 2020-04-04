<template>
    <div>
           
        <h1 class="mainHeader">We Offer Health Services At <br>Multiple Offices</h1>
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

.mainHeader{
  padding: 200px;
  padding-top: 15px;
  font: bold;
  font-size:40px;
  color: #ffffff;
  background-image: url("https://wallpaperplay.com/walls/full/2/0/8/13986.jpg");
  background-size: cover;

}
</style>

}
</style>
