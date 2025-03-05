<template>

<form>

  <div class="row">
    <label>Username</label>
    <input type="text" v-model="formModel.username"></input>
  </div>

  <div class="row">
    <label>Password</label>
    <input type="password" v-model="formModel.password"></input>
  </div>

  <div class="row action-buttons">
    <button type="button" @click="registerAppUser">Register</button>
  </div>

</form>

<!--
<section>
  <button type="button" @click="test">Start</button>
  <button type="button" @click="testStop">Stop</button>
</section>
-->

</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import TimingLoader  from '../utilities/TimingLoader.vue';

const resourceUrl = "https://example.org/post";
const $self = getCurrentInstance();
const isLoading = ref(false);
const formModel = {
  username: 'zhixian',
  password: 'pass',
}

onMounted(() => {
  // Load data
  //loadAppUserList();
})

function registerAppUser() {

}

</script>

<style scoped>

form {
  margin-top: 1em;
}

div.row {
  display: flex;
  margin: .5em 0;
}

div.row label {
  width: 6rem;
}

input[type=text], input[type=password] {
  border: 1px solid #ccc;
  border-radius: .3rem;
  padding: 0.3rem;
}

div.row.action-buttons > :first-child {
  position: relative;
  left:6rem;
}

button {
  background-color: ghostwhite;
  padding: .3rem;
  border: black 1px solid;
  border-radius: .3rem;
}

button:hover {
  background-color: antiquewhite;
}
</style>