<template>

  <!-- 
  <p v-if="model.value !== null">
    You are already signed in.
    <button type="button" @click="ClearUserCredentials">Clear credentials</button>
  </p> 
  @submit.prevent="onSubmit" v-if="model.value === null"
  -->
  <p v-if="userIsSignedIn">You ({{ signedInSubject }}) are signed in.</p>

  <form class="sign-in" v-if="!userIsSignedIn">

    <div class="row">
      <label>Username</label>
      <input type="text" v-model="signInFormModel.username" />
    </div>

    <div class="row">
      <label>Password</label>
      <input type="password" v-model="signInFormModel.password" />
    </div>

    <div class="row">
      <button type="button" @click="signIn">Sign in</button>
    </div>

  </form>

</template>

<script setup>
import { ref, onBeforeMount, getCurrentInstance  } from 'vue';
import localStorageService from "../../services/LocalStorageService.js";
import { JwtServices, FunctionResponse } from '../../services/commonServices.js'

const appBroadcastChannel = new BroadcastChannel("tech_notes_press");
const instance = getCurrentInstance();
const jwtHelper = new JwtServices();
const userIsSignedIn = ref(jwtHelper.hasValidToken());
const signedInSubject = ref(jwtHelper.getJwtSubject());

const signInFormModel = ref({
  username: 'zhixian',
  password: ''
});

function setSignedIn() {
  userIsSignedIn.value = true;
  signedInSubject.value = jwtHelper.getJwtSubject();
  appBroadcastChannel.postMessage({
    type: 'auth',
    payload: {
      type: 'status-changed',
      payload: 'authenticated'
    }
  });
}


async function signIn(event) {
  console.debug("Signing in");

  let response = await jwtHelper.authenticate(signInFormModel.value);
    
  if (Object.getOwnPropertyNames(response).includes('success') && response.success) setSignedIn();
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

button[type="button"] {
  background-color: #3dd68c;
  color: ghostwhite;
  padding: 0.3em;
  border: .2rem outset #3dd68c;
  border-radius: .2rem;

  position: relative;
  left: 6rem;
}
</style>