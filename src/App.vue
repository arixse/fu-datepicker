<template>
  <div id="app">
    <h1>fu-datepicker</h1>
    <h4>A lightweight vue datepicker component</h4>
    <div class="box">
      <date-picker></date-picker>
      
    </div>
    <table class="props-table">
        <thead>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
        </thead>
        <tbody>
          <tr>
            <td>value</td>
            <td>String | Number
            </td>
            <td>Date.now()</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>''</td>
          </tr>
          <tr>
            <td>type</td>
            <td>String</td>
            <td>datetime | month</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import DatePicker from "../lib/index"
export default {
  name: 'app',
  components: {
    DatePicker
  },
  mounted() {
    let root = document.getElementById('app');
    let code = document.createElement('textarea')
    code.value = `<datepicker :value="Date.now()"></datepicker>`;
    code.id = 'code';
    root.appendChild(code);
    // eslint-disable-next-line no-undef
    new CodeMirror.fromTextArea(document.getElementById('#code'))
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
.box,
#code {
  width: 300px;
  margin: 50px auto;
}
.props-table {
  display: block;
  width: 400px;
  margin: 50px auto;
}
</style>
