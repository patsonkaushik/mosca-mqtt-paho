var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'test'
var message = [
    {
      "id": 1,
      "name": "test",
      "message":"test"
    }
  ];


client.on('connect', ()=>{
    client.publish(topic, JSON.stringify(message))
})