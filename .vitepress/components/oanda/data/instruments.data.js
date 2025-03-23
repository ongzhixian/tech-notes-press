import fs from 'fs';
import path from 'path';
// import {loadEnv} from 'vite'

export default {
    load() {

        // Method 1: use loadenv
        // let loadEnvironmentVariables = loadEnv('development', './env','');
        // Method 2: Or use process.env directly
        // console.log('Load Env', process.env);
        // import.meta.env does not exists in data loaders
        // console.log(import.meta.env.VITE_API_URL);

        // let nodeEnv = process.env['NODE_ENV'];
        // console.log('NODE_ENV', nodeEnv);
        //
        // if (nodeEnv !== 'development') {
        //     return {}
        // }
        //
        // const secretFilePath = path.join(process.env.APPDATA, `Microsoft/UserSecrets/tech-notes-press/secrets-${nodeEnv}.json`);

        return JSON.parse(fs.readFileSync('./.vitepress/components/oanda/data/instruments.json', 'utf8'));

    }
}