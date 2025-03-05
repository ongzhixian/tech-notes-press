<template>

  <a class="VPNavBarMenuLink" :href="linkUrl" @click="LogInOut">
    <span>{{linkText}}</span>
    </a>
</template>

<script setup>
import { ref } from 'vue';

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

function LogInOut(event) {
  console.log('LogInOut', event);

  linkText.value = links[linkText.value].text;
  linkUrl.value = links[linkText.value].url;

  // if (linkText.value == 'Sign in') {
  //   linkText.value = 'Sign out';
  //   linkUrl.value = '/authentication/sign-out';
  //
  // } else {
  //   linkText.value = 'Sign in';
  //   linkUrl.value = '/authentication/sign-in';
  // }
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