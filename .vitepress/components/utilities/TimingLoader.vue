<template>
<p v-if="intervalId">Loading...{{ elapsedTime }}s</p>
</template>

<script setup>
import { ref } from 'vue';
const elapsedTime = ref(0);
const startTime = ref();
const intervalId = ref();

const start = (timeoutInMilliseconds = 1000) =>
{
  if (intervalId.value !== undefined) return;

  startTime.value = new Date();
  intervalId.value = setInterval(() => {
    elapsedTime.value = (new Date() - startTime.value) / 1000;
  }, timeoutInMilliseconds);
}

const stop = () => {
  clearInterval(intervalId.value);
  intervalId.value = undefined;
}

defineExpose({
      start,
      stop
});
</script>


<style scoped>

</style>