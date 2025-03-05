<template>

<TimingLoader ref="timingLoader" />

<table v-if="!isLoading">
  <thead>
    <tr>
      <th scope="col">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in appUserList" :key="index">
      <td>{{ index }} -- {{item.username}}</td>
    </tr>
  </tbody>
</table>

<section>
  <button type="button" @click="test">Start</button>
  <button type="button" @click="testStop">Stop</button>
</section>

</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import TimingLoader  from '../utilities/TimingLoader.vue';

const $self = getCurrentInstance();
const isLoading = ref(false);
const appUserList = ref([]);

onMounted(() => {
  // Load data
  loadAppUserList();
})

const resourceUrl = "https://example.org/post";

async function loadAppUserList() {
  // const response = await fetch(`${resourceUrl}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${appUserList}`
  //   },
  //   //body: JSON.stringify({username: "example"}),
  // });
  setTimeout(() => {
    $self.refs.timingLoader.stop();
    appUserList.value = [
      { id: 1, username: 'User 1'},
      { id: 2, username: 'User 2'},
      { id: 3, username: 'User 3'},
      { id: 4, username: 'User 4'},
    ];
    isLoading.value = false;
  }, 3000);

  $self.refs.timingLoader.start(250);
  isLoading.value = true;
}


function test() {
  $self.refs.timingLoader.start(250);
}

function testStop() {

  $self.refs.timingLoader.stop();
}

</script>

<style scoped>

</style>