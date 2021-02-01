var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)

var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mqttjs'
})
db.connect(()=>{
    console.log('Database connected!')
})

broker.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

broker.on('published', (packet)=>{
    
    message = packet.payload.toString();
    
    var dbStat = 'insert into demo set ?'
   
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){

       var message_data = JSON.parse(message)
        var data = {
            message: message_data[0].message
        }
    
        
        try {
            db.query(dbStat, data, (error, output)=>{
                if(error){
                    console.log(error)
                } else {
                    console.log(output.insertId)
                    console.log('Data saved to database!')
                }
            })
    
        } catch (err) {
            console.log(err)
        }
           
     }
   
    
})