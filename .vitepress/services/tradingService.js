import { appConfig } from "./appConfig";
import { FunctionResponse, FailedResponse } from "./commonServices.js";
import { dataSymbol } from 'vitepress';

// TradingService

function TradingService(oandaApiTokenKey = null) {
    this.restApiUrl = appConfig.oandaRestApiUrl;
    console.log('restApiUrl', this.restApiUrl);

    // console.log('Initializing...');
    // console.log(import.meta.env.VITE_API_URL)
    // console.log('oandaApiTokenKey', oandaApiTokenKey)

    this.getAccounts = async function () {

        return await fetch(`${this.restApiUrl}/v3/accounts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${oandaApiTokenKey}`
            }
        }).then(async response => {

            let json = await response.json();

            if (response.status === 200) return new FunctionResponse(true, undefined, json);

            return FailedResponse('Refreshing token failed.');

            // {
            //     console.info('Refreshing token success; set localstorage item with key', this.authKey);
            //     //localStorage.setItem(this.authKey, jwt);
            //     return new FunctionResponse([true,undefined,jwt]);
            // }
            //
            // console.info('Refreshing token failed.');
            // return FailedResponse('Refreshing token failed.');
        }).catch(reason => {
            console.warn(reason.toLocaleString());
            return FailedResponse(reason.toLocaleString());
        });

    }

    this.getTradableInstruments = async function (oandaAccountId) {
        return await fetch(`${this.restApiUrl}/v3/accounts/${oandaAccountId}/instruments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${oandaApiTokenKey}`
            }
        }).then(async response => {
            let json = await response.json();
            if (response.status === 200) return new FunctionResponse(true, undefined, json);
            return FailedResponse('Refreshing token failed.');
        }).catch(reason => {
            console.warn(reason.toLocaleString());
            return FailedResponse(reason.toLocaleString());
        });
    }
}

export { TradingService };
