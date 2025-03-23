<template>
<a class="VPNavBarMenuLink" :href="linkUrl" @click="LogInOut">{{linkText}}</a>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { JwtServices } from '../../services/commonServices';

const appBroadcastChannel = new BroadcastChannel("tech_notes_press");
const jwtHelper = new JwtServices();
const links = {
  'sign-in': {
    text: 'Sign in',
    url: '/authentication/sign-in'
  },
  'sign-out': {
    text: 'Sign out',
    url: '/authentication/sign-out'
  },
}
const linkText = ref(links['sign-in'].text);
const linkUrl = ref(links['sign-in'].url);

onMounted(() => {
  updateButtonText();
  appBroadcastChannel.onmessage = handleAppBroadcastChannelMessage;
});

function handleAppBroadcastChannelMessage(e) {

  let message = e.data;

  if (!message.hasOwnProperty('type') || !message.hasOwnProperty('payload')) return; // No identifiable message type; do nothing

  console.log('handleAppBroadcastChannelMessage');

  if (message.type === 'auth') {
    let messagePayload = message.payload;

    if (!messagePayload.hasOwnProperty('type') || !messagePayload.hasOwnProperty('payload')) return;

    if (messagePayload.type === 'status-changed') updateButtonText();
  }
}

function LogInOut(event) {
  updateButtonText();
}

function updateButtonText() {

  let linkType = jwtHelper.hasValidToken() ? 'sign-out' : 'sign-in';
  //console.log('updateButtonText', linkType);
  linkText.value = links[linkType].text;
  linkUrl.value = links[linkType].url;
}

</script>

<style scoped>

.VPNavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}

.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

</style>