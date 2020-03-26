<template>
      <div class="row">
        <h2 class='dashboard_header'>Dashboard</h2>
        <div class="db">
          <Profile class="db-col1 card" />
          <Info class="db-col2 card" />
        </div>
      </div>
</template>
<script>
import Profile from './Profile'
import Info from './Info'
export default {
  name: 'Dashboard',
  components: {
    Profile,
    Info
  },
  data () {
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style media="screen">
/* patient profile and info layout */
  .dashboard_header{ color: white; background-color: #15558d; padding: 20px;text-align: left;}
  .db{display: flex;  margin-top: 30px;}
  .db>*{background-color: #fff;  border: 1px solid rgba(0,0,0,0.1); border-radius: 7px;}
  .db1{width: 25%; margin: 0 15px 0 30px;}
  .db2{width: 75%; margin: 0 30px 0 15px;}

</style>
