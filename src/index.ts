import nedb from 'nedb'
import MessengerServer from './server'
import { WebSocket } from 'ws'
import { Group, Message, User } from './types'

const ChatDB = new nedb<Message>({
    filename: './chat.db',
    autoload: true
})

const UserDB = new nedb<User>({
    filename: './user.db',
    autoload: true
})

const GroupDB = new nedb<Group>({
    filename: './group.db',
    autoload: true
})

const LogDB = new nedb({
    filename: './log.db',
    autoload: true
})

const server = new MessengerServer()

server.on('__internal_connected',()=>{
    LogDB.insert({
        name: 'connection',
        time: Date.now()
    })
})

server.on('create_message',(server: WebSocket,message: Message)=>{
    ChatDB.insert(message,function(err,doc){
        server.send(JSON.stringify({
            staus: 200
        }))
    })
})