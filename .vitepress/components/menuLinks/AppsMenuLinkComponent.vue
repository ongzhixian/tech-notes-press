<template>
<a v-if="hasValidToken" class="VPNavBarMenuLink" href="/apps/"><span>Apps</span></a>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { JwtServices } from '../../services/commonServices';

const jwtHelper = new JwtServices();
const hasValidToken = ref(false);

onMounted(() => {
  hasValidToken.value = jwtHelper.hasValidToken();
});
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