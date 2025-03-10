# Apps

<p class="todo">TODO: List apps that are accessible by authenticated user.</p>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
    const myWorker = new SharedWorker("/js/shared-worker.js");
    myWorker.port.start();

    myWorker.port.onmessage = (e) => {
      console.log("Message received from worker", e.data);
    };

    myWorker.port.postMessage([2, 3]);
    console.log("Message posted to worker");
});

</script>

<style scoped>
.todo {
    background-color: lightgoldenrodyellow;
}
</style>