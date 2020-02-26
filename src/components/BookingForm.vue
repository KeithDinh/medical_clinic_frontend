<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-holder">
      <input type="text" placeholder="Event title" v-model="event.title"/>
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'Start date'" v-model="event.start" /> 
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'End date'" v-model="event.end"/> 
    </div>
    <div class="input-holder">
      <textarea placeholder="Event description" rows="4" v-model="event.data.description" ></textarea>
    </div>
    <div class="input-holder">
      <color-picker @colorPicked="selectColor" :color="event.cssClass" />
    </div>
    <div class="input-holder">
      <button type="submit">Schedule</button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'BookingForm'
}
</script>