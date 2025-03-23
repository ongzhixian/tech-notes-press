<template>
  <pre>{{ primoList }}</pre>
<!--  <button type="button" @click="downloadJson">Download</button>-->
  <table>
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Symbol</th>
      <th scope="col">Type</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="instrument in instrumentList" :key="instrument.name">
      <td>{{ instrument.displayName }}</td>
      <td>{{ instrument.name }}</td>
      <td>{{ instrument.type }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { data as secrets } from './secrets.data.js';
import { TradingService } from '../../services/tradingService.js';

const oandaAccountIdLocalStorageKey = 'oanda.accountID';
const primoList = ref([]);
const redList = ref([]);
const selectedOandaAccountId = ref('');

const tradingService = new TradingService(secrets.OandaAccessToken);

onMounted(async() => {
  selectedOandaAccountId.value = localStorage.getItem(oandaAccountIdLocalStorageKey);

  // let { success, message, data } = await tradingService.getInstrumentPrimo(selectedOandaAccountId.value);
  //
  // if (success) instrumentList.value = data.instruments.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
});

function downloadJson(e) {
  console.log(e);
  if (instrumentList.value.length <= 0) {
    console.error('No JSON data to download.');
    return;
  }

  const jsonString = JSON.stringify(instrumentList.value, null, 2); // Pretty-print with 2-space indentation
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json'; // Set the desired filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up the URL object
}

</script>

<style scoped>

</style>