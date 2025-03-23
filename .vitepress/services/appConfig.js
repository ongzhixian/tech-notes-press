import fs from 'fs';
import path from 'path';


// fs.readFile('C:/Users/zhixian/AppData/Roaming/Microsoft/UserSecrets/47df7034-c1c1-4b87-8373-89f5e42fc9ec/secrets.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

//var str = path.join(process.env.VAR, 'is', 'here');


const appConfig = {
    authenticateUrl: 'https://flikx8i3c2.execute-api.us-east-1.amazonaws.com/authenticate',
    oandaRestApiUrl: 'https://api-fxpractice.oanda.com'
}

export { appConfig };

// export default {
//     foo: function() { alert("foo!") }
// }


// function sharedLogic1() {
//     this.foo = function() {
//         console.log('sharedLogic1 foo')
//     }
// }

// function sharedLogic2() {
//     this.foo = function() {
//         console.log('sharedLogic2 foo')
//     }
// }

// const sharedLogic3 = {
//     foo() { console.log('sharedLogic3 foo') }, 
//     bar() { console.log('sharedLogic3 bar') },
//     baz() { sharedLogic3.foo(); sharedLogic3.bar() } // here is the fix
// }

//export { sharedLogic1, sharedLogic2, sharedLogic3, JwtServices, FunctionResponse };
