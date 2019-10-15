<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <date-picker></date-picker>
  </div>
</template>

<script>
import DatePicker from "../lib/index"
export default {
  name: 'app',
  components: {
    DatePicker
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
  margin-top: 60px;
}
</style>
