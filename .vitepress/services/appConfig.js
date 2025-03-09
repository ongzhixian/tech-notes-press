const appConfig = {
    authenticateUrl: 'https://flikx8i3c2.execute-api.us-east-1.amazonaws.com/authenticate'
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
