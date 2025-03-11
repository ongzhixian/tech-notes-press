# Apps

<p class="todo">TODO: List apps that are accessible by authenticated user.</p>

## Manage 

1. <a href="/apps/manage/app-users">App-users</a>

<section>
    <button @click="runTest">Run test</button>
</section>

<script setup>
import { ref, onMounted } from 'vue';
const sharedWorker = new SharedWorker("/js/shared-worker.js");

onMounted(() => {
    sharedWorker.port.onmessage = (e) => {
      console.log("Message received from worker", e.data);
    };
    //sharedWorker.port.postMessage([2, 3]);
    // console.log("Message posted to worker");
});

function runTest(e) {
    console.log('runTest', e);
    let sampleMessage =
    {
        type: 'broadcast',
        channel: 'tech_notes_press',
        payload: {
            type: 'auth',
            payload: {
                type: 'status-changed',
                payload: 'authenticated'
            }
        }
    };

    sharedWorker.port.postMessage(sampleMessage);
    let testData = [2, 3];

    //sampleMessage.hasOwnProperty()
}

</script>

<style scoped>
.todo {
    background-color: lightgoldenrodyellow;
}
</style>