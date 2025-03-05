<template>
  <button @click="LogInOut">{{ buttonText }}</button>
</template>

<script setup>
import { ref } from 'vue';
const buttonText = ref('Sign in');

function LogInOut(event) {
  console.log('LogInOut' + event);
  const myAuthKey = 'myAuth';
  const cat = localStorage.getItem(myAuthKey);

  if (buttonText.value == 'Sign in') {
    buttonText.value = 'Sign out';
    localStorage.removeItem(myAuthKey);
  } else {
    buttonText.value = 'Sign in';
    localStorage.setItem(myAuthKey, "zxian");
  }
}

</script>