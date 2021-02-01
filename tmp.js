var fs = require('fs')
var mqtt = require('mqtt');
const { resolve } = require('path');
var client  = mqtt.connect('mqtt://test.mosquitto.org')

var store = mqtt.Store()


var users = fs.readFileSync('users.json').toString();  

client.on('connect', function () {
    client.subscribe("mqtt/demo")

  client.subscribe('presence', function (err) {
    if (!err) {
      //client.publish('presence', 'Hello mqtt')
      //client.publish("mqtt/demo", users)
    }
  })
})

client.on('message',  (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  var tmp = [topic, message].join(":");
  console.log(client.getLastMessageId())

  store.put(topic,(res)=>{
    
    
  });
  //console.log(store)
  console.log([topic, message].join(": "))
  //client.end()
})

client.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})

client.on('message', (topic, message) => {

    const msg = message.toString();
    //console.log(msg.slice(0,1),"aaa");

    // let myFirstPromise = new Promise((resolve, reject) => {
    //     if(msg.slice(0,1) === "["){
    //         const userData = JSON.parse(msg);
    //         userData.forEach(element => {
    //            console.log(element.id) 
    //         });
    //         resolve(userData)
    //     }
    // })

    getFile('users.json')
    .then(data =>{
        //console.log(data)
        //console.log('checker123456')
    })
    .catch(err => console.error(err))

    // myFirstPromise.then((successMessage) => {
    //     console.log(successMessage)
    // })
})
checkLast()

async function checkLast () {
    var userData = await getFile('users.json');
    
    console.log(userData)
     getFile('users.json')
     .then(message => {

     }).catch (err => {
         console.log('error' + err);
     });
  }

function getFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          reject(err)  
          return  
        }
        resolve(data.toString())
      })
    })
  }


  var users = [];
  
  userJoin(10,'abc','room')
  userJoin(100,'xyz','room1')

  var getuserId = getCurrentUser(100)
if(getuserId) {
    //console.log(getuserId)
}else {
   // console.log('aaa')
}
  

var getcurrentUserRoom = getRoomUsers('room1')
if(getcurrentUserRoom){
    console.log(getcurrentUserRoom)
}else{
    console.log(getcurrentUserRoom)
}

var lastUserDelele = userLeave(100)
if(lastUserDelele){
    console.log('aaa')
    console.log(lastUserDelele)
    console.log(users)
}else{
    console.log(lastUserDelele)
}
  

  function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    
    return user;
  }

  function getCurrentUser(id) {
    return users.find(user => user.id === id);
  }

  function getRoomUsers(room) {
    return users.filter(user =>{

        if(user.room === room) {
            user.abc = 1000; 
        }   
    });
  }


  function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    console.log(index)
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }

    console.log(user)
  }
  

function add(...args) {
    let result = 0;
  
    for (let arg of args) result += arg;
  
    return result
  }
  
  console.log(add(1,10,20)) // returns 1

  const arr = [10,20,30];
  arr.map((value,index,arra) => {
    console.log(value);
    console.log(index)
    console.log(arra)
  })
const newArr = ["joykare", ...arr];

console.log(add(...arr))