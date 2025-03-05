<template>

  <a class="VPNavBarMenuLink" :href="linkUrl" @click="LogInOut">
    <span>{{linkText}}</span>
    </a>
</template>

<script setup>
import { ref } from 'vue';
const linkText = ref('Sign in');
const linkUrl = ref('/sign-in');

function LogInOut(event) {
  console.log('LogInOut', event);

  if (linkText.value == 'Sign in') {
    linkText.value = 'Sign out';
    linkUrl.value = '/sign-out';

  } else {
    linkText.value = 'Sign in';
    linkUrl.value = '/sign-in';
  }
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