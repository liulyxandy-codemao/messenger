import nedb from 'nedb'
import MessengerServer from './server'

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