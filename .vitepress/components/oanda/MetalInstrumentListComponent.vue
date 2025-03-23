<template>
  <!-- Metal summary table -->
  <table>
    <tbody>
      <tr>
        <th>Instruments Count</th>
        <td>{{ instruments.length }}</td>
      </tr>
    </tbody>
  </table>



  <table>
    <caption>Metal/Currency</caption>
    <thead>
    <tr>
      <td>#</td>
      <th>Currency</th>
      <th>Gold</th>
      <th>Silver</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(instrument, index) in currencies" :key="instrument.name">
      <td>{{ index + 1 }}</td>
      <td>{{ instrument.currency }}</td>
      <td v-if="instrument.metals.includes('XAU')"><a :href="`/apps/trading/pairs/XAU_${instrument.currency}`">X</a></td>
      <td v-if="instrument.metals.includes('XAG')"><a :href="`/apps/trading/pairs/XAG_${instrument.currency}`">X</a></td>
    </tr>
    </tbody>
  </table>

  <!-- Unique metal -->
  <table>
    <caption><a href="/apps/trading/pairs/XAU_XAG">Intra-metal</a></caption>
    <tbody>
    <tr v-for="(instrument, index) in metals" :key="instrument.name">
      <td>{{ index + 1 }}</td>
      <td>{{ instrument.name.replace('_USD', '') }}</td>
      <td>{{ instrument.displayName }}</td>
    </tr>
    </tbody>
  </table>


  <!--
  <table>
    <tbody>
    <tr v-for="(instrument, index) in instruments" :key="instrument.name">
      <td>{{ index + 1 }}</td>
      <td>{{ instrument.name }}</td>
      <td>{{ instrument.displayName }}</td>
    </tr>
    </tbody>
  </table>
  -->


</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { data as instrumentsResponseObject } from './data/instruments.data.js';
import {breakpointsQuasar} from "../../cache/deps/vitepress___@vueuse_core.js";

const metals = ref([])
const currencies = ref([])

const props = defineProps({
  type: { type: String, required: true }
})

const instruments = ref([]);

onMounted(async() => {
  let allInstruments = instrumentsResponseObject.instruments;

  // Get instruments of type and sort it

  let metalInstruments = allInstruments.filter((instrument) => {
    return instrument.type === props.type
  }).sort((a, b) => a.name.localeCompare(b.name));

  instruments.value = metalInstruments;

  // Get list of metal elements ; defined as those fx pairs that has USD as quoted currency

  let usdMetalInstruments = metalInstruments.filter((instrument) => {
    return instrument.type === props.type && instrument.name.endsWith('_USD')
  }).sort((a, b) => a.name.localeCompare(b.name));

  metals.value = usdMetalInstruments;

  let usdMetalSymbols = usdMetalInstruments.map((instrument) => {
    return instrument.name.slice(0,3)
  });

  // Get all currency

  let metalCurrencies = metalInstruments.reduce((list, instrument) => {

    let currency = instrument.name.slice(4);

    // Filter out metal
    if (usdMetalSymbols.includes(currency)) return list;

    // If list does not contain currency entry, add currency entry to list
    let currencyMetalObject = list.find(e => e.currency === currency);

    let baseCurrency = instrument.name.slice(0, 3); // baseCurrency equals metal in this case

    if (!currencyMetalObject) {
      let newObject = {
        currency : currency,
        metals: [baseCurrency]
      };

      list.push(newObject);
      return list;
    }

    if (currencyMetalObject.metals.includes(baseCurrency)) return list;
    currencyMetalObject.metals.push(baseCurrency);
    return list;

  }, []);//.sort((a, b) => a.localeCompare(b));

  currencies.value = metalCurrencies;

});

// I want to know which


</script>

<style scoped>

</style>