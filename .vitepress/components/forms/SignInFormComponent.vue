<template>

  <p v-if="userCredentials !== null">
    You are already signed in.
    <button type="button" @click="ClearUserCredentials">Clear credentials</button>
  </p>

  <form class="sign-in" @submit.prevent="onSubmit" v-if="userCredentials === null">

    <div class="row">
      <label>Username</label>
      <input type="text" v-model="formData.username" />
    </div>

    <div class="row">
      <label>Password</label>
      <input type="password" v-model="formData.password" />
    </div>

    <div class="row">
      <button type="submit">Submit</button>
    </div>

  </form>
</template>

<script setup>
import { ref, onBeforeMount, getCurrentInstance  } from 'vue';
import localStorageService from "../../services/LocalStorageService.js";

const instance = getCurrentInstance();

// const data = function() {
//   return {
//     isActive: false,
//   };
// }
//
// function toggleActive(aaa) {
//   debugger;
//   this.isActive = !this.isActive;
// }

// interface UserCredentials {
//   username: string;
//     password: string;
// }
const formData = {
  username: 'zhixian',
  password: ''
}

const userCredentialsKey = "userCredentials";
let userCredentials = null;
debugger;
const me = this;

onBeforeMount(() => {
  console.log('Mounted; Checking');
  userCredentials = localStorage.getItem(userCredentialsKey);
  console.log('userCredentials', userCredentials);
});

function ClearUserCredentials(event)
{
  console.log('Clearing userCredentials');
  localStorage.removeItem(userCredentialsKey);

  // debugger;
  // this.proxy.$forceUpdate();
  // me.proxy.$forceUpdate();
  instance.proxy.$forceUpdate();
  //this.$forceUpdate();
}

function onSubmit(event) {
  console.log('Submit success', formData);
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title: "Vue POST Request Example"})
  };

  // if (userCredentials === null) {
  //   let userCredentials = JSON.stringify({
  //     username: 'zhixian',
  //   });
  //   localStorage.setItem(userCredentialsKey, `${userCredentials}|${(new Date(Date.now() + 2 * 3600000)).toISOString()}`);
  //   console.log('userCredentials1', userCredentials);
  // }
  // else
  // {
  //   console.log('userCredentials2', userCredentials);
  //   localStorage.removeItem(userCredentialsKey);
  // }

  let userCredentials = JSON.stringify({
    username: 'zhixian',
  });
  localStorage.setItem(userCredentialsKey, `${userCredentials}|${(new Date(Date.now() + 1 * 3600000)).toISOString()}`);
  console.log('set usercredentials', userCredentials);
  // debugger;
// this.proxy.$forceUpdate();
//   me.proxy.$forceUpdate();
  instance.proxy.$forceUpdate();
  //getCurrentInstance().proxy.$forceUpdate();
  //
  // let isValidCredentials = true;
  // fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('received', data);
  //
  //       if (isValidCredentials) {
  //         let userCredentials = JSON.stringify({
  //           username: 'zhixian',
  //         });
  //         localStorage.setItem(userCredentialsKey, `${userCredentials}|${(new Date(Date.now() + 1 * 3600000)).toISOString()}`);
  //         console.log('set usercredentials', userCredentials);
  //         getCurrentInstance().proxy.$forceUpdate();
  //       }
  //       //(this.postId = data.id)
  //       // let x = new localStorageService();
  //       // x.doWork()
  //     });


}
</script>

<style scoped>
form {
  margin: 1em 0 0 0;
}

form div.row {
  display: flex;
  margin: .3rem 0;
}

form div.row > :first-child {
  width: 6rem;
  flex-shrink: 0;
}

label {
  padding: 0.3em;
  margin: 0.2em 0;
}

input[type=text], input[type=password] {
  border: 1px solid #3dd68c;
  padding: 0.3em;
  margin: 0.2em 0;
  border-radius: .2rem;
}

button[type="submit"] {
  background-color: #3dd68c;
  color: ghostwhite;
  padding: 0.3em;
  border: .2rem outset #3dd68c;
  border-radius: .2rem;

  position: relative;
  left: 6rem;
}
</style>