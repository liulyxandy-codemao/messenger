import nedb from 'nedb'
import { User, Group, Message } from './types'

class MessengerUserDatabase {
    private db: nedb<User>
}

class MessengerGroupDatabase {
    private db: nedb<Group>
    private host_username: string
}

class MessengerChatDatabase {
    private db: nedb<Message>
    private host_username: string
}

class MessengerDatabase {
    private path: string
    private db: nedb
    constructor(path: string){
        this.path = path
        this.db = new nedb({
            filename: path,
            autoload: true
        })
    }
}