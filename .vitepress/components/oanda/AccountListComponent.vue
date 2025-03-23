<template>
<!--  <pre>{{ accountList }}</pre>-->
  <table>
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Mt4 Account Id</th>
      <th scope="col">Default account</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="account in accountList">
      <td>{{ account.id }}</td>
      <td>{{ account.mt4AccountID }}</td>
      <td><input type="radio" name="accountId"
                 :value="account.id"
                 :checked="account.id == selectedOandaAccountId"
                 @click="selectAccount"
                 v-if="account.mt4AccountID !== undefined" /></td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { data as secrets } from './secrets.data.js';
import { TradingService } from '../../services/tradingService.js';

const oandaAccountIdLocalStorageKey = 'oanda.accountID';
const accountList = ref([]);
const selectedOandaAccountId = ref('');

onMounted(async() => {
  let tradingService = new TradingService(secrets.OandaAccessToken);
  // let getAccountsResponse = await tradingService.getAccounts();
  let { success, message, data } = await tradingService.getAccounts();

  if (success) accountList.value = data.accounts;

  selectedOandaAccountId.value = localStorage.getItem(oandaAccountIdLocalStorageKey);
  console.log('Selected Oanda AccountId', selectedOandaAccountId.value);

  //if (Object.getOwnPropertyNames(getAccountsResponse).includes('success') && response.success) setSignedIn();
  // console.log(getAccountsResponse);
  // debugger;
});

function selectAccount(e) {
  localStorage.setItem(oandaAccountIdLocalStorageKey, e.currentTarget.value);
  console.log('SET Oanda AccountID', e.currentTarget.value);
}

</script>

<style scoped>

</style>