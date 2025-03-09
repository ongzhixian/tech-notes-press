<template>
  <div>&nbsp;</div>
  <section>
    <button @click="connect" v-if="!connected">Connect</button>
    <button @click="disconnect" v-if="connected">Disconnect</button>
  </section>

  <section>

    <div>
      <label>Group</label>
      <input type="text" ref="chatRoom" value="dev-chat" style="border: lightblue 1px dotted; margin: .5em; padding: 0 .5em;" disabled />
    </div>

    <div>
      <textarea rows=8 ref="textMessage" style="border: lightblue 1px dotted; width: 50%;"></textarea>
    </div>

    <div>
      <button @click="sendMessage">Send message</button>
    </div>

  </section>


  <section>
    <p>
      Not working yet...
      but remember this:
      https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/apigatewaymanagementapi.html
      <pre>
        The Amazon API Gateway Management API allows you to directly manage runtime aspects of your deployed APIs.
        To use it, you must explicitly set the SDK’s endpoint to point to the endpoint of your deployed API.
        The endpoint will be of the form https://{api-id}.execute-api.{region}.amazonaws.com/{stage},
        or will be the endpoint corresponding to your API’s custom domain and base path, if applicable.
      </pre>
    </p>
  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const url = 'wss://7ofm1s7o95.execute-api.us-east-1.amazonaws.com/production/'
const connected = ref(false);
const data = ref([])
let socket = null;
const textMessage = ref();
const chatRoom = ref();

//const textMessageElement = document.getElementById('textMessage');

onMounted(async () => {

})

function connect() {
  socket = new WebSocket(url);

  socket.onopen = function(event) {
    console.log('TODO: handle onopen', event);
    joinMembership();
  };

  socket.onmessage = function(event) {
    console.log('TODO: handle onmessage', event);
  };

  socket.onclose = function(event) {
    console.log('TODO: handle onclose', event);
  };

  connected.value = true;
}

function disconnect() {
  if (socket !== null) {
    leaveMembership();
    // socket.close();
    // socket = null;
  }

  connected.value = false;
}

function sendMessage(message) {
  //socket.send(message);
  //console.log('sendMessage' + textMessageElement.value);


  let submessage = JSON.stringify({
    gid: chatRoom.value.value,
    msg: textMessage.value.value
  })

  const testMessage = JSON.stringify({
    app: "do-work",
    action: "say",
    content: submessage
  });
  // app;act;msg



  console.log('sendMessage ', testMessage, socket);

  socket.send(testMessage);
}

function joinMembership() {
  socket.send(JSON.stringify({
    app: "do-work",
    action: 'join-membership',
    content: chatRoom.value.value
  }));
}

function leaveMembership() {
  socket.send(JSON.stringify({
    app: "do-work",
    action: "leave-membership",
    content: chatRoom.value.value
  }));
}

function myKeyHandler(kbd) {
  console.log("Ctrl", kbd.ctrlKey, "KeyCode", kbd.key, kbd.keyCode, kbd.code);
  if (kbd.ctrlKey && ['s', 'S'].includes(kbd.key)) {
    kbd.preventDefault();
  }
}
</script>

<style scoped>
button {
  border: grey 1px solid;
  border-radius: .3rem;
  padding: .3rem;
}
</style>