import { WebSocketServer } from "ws";

interface EventMap{
    '__internal_connected': ()=>void,
    '__internal_disconnected': ()=>void,
    '__internal_error': (message: string, name: string, stack?: string)=>void

    'create_message': ()=>void,
    'delete_message': ()=>void,

    'create_group': ()=>void,
    'delete_group': ()=>void,
    'leave_group': ()=>void,

    'add_friend': ()=>void,
    'del_friend': ()=>void,
    'accept_friend': ()=>void,
    'refuse_friend': ()=>void
}

class MessengerServer {
    private wsServer: WebSocketServer
    private events: {[key in keyof EventMap]:(...args: Parameters<EventMap[key]>)=>void}
    constructor() {
        this.wsServer = new WebSocketServer({ port: 11451 })
        this.wsServer.on('connection', (conn) => {
            this.events.__internal_connected()
            conn.on('message', (rawmsg) => {
                const str_message = rawmsg.toString()
                const msg: {
                    name: keyof EventMap,
                    data: Object
                } = JSON.parse(str_message)
                if(Object.keys(this.events).includes(msg.name)){
                    this.events[msg.name].apply(null,[this.wsServer,...Object.values(msg.data)])
                }
            })
        })
        this.wsServer.on('close',()=>{
            this.events.__internal_disconnected()
        })
        this.wsServer.on('error',(x)=>{
            this.events.__internal_error(x.message,x.name,x?.stack)
        })
    }
    public on<T extends keyof EventMap>(name: T, callback: EventMap[T]){
        this.events[name] = callback
    }
}

export default MessengerServer