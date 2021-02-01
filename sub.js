var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'test'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message);
    console.log('abc');
})

client.on('connect', ()=>{
    client.subscribe(topic)
})