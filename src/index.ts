import nedb from 'nedb'
import MessengerServer from './server'
import { WebSocket } from 'ws'

const db = new nedb({
    filename: './chat.db',
    autoload: true
})

const server = new MessengerServer()

server.on('__internal_connected',()=>{
    db.insert({
        name: 'connection'
    })
})

server.on('create_message',(server: WebSocket,message:string)=>{
    db.insert({
        name: 'message',
        data: {
            message: message
        }
    },function(err,doc){
        server.send(JSON.stringify(
            {
                status: 200
            }
        ))
        
    })
    
})