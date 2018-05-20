/*
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列,
Node.js里面的许多对象都会分发事件：
一个net.Server对象会在每次有新连接时分发一个事件， 
一个fs.readStream对象会在文件被打开的时候发出一个事件。 
所有这些产生事件的对象都是 events.EventEmitter 的实例。
*/

const events = require('events');
const eventEmitter = new events.EventEmitter();


eventEmitter.on('some_event',(a,b)=>{
    console.log(`listener1 收到消息！${a}-${b}`);
})

eventEmitter.once('some_event',(a,b)=>{
    console.log(`listener2 收到消息！${a}-${b}`);
})
const listener3 =function(a,b){
    console.log(`listener3 收到消息！${a}-${b}`);
}
//添加监听者
eventEmitter.addListener('some_event', listener3);

eventEmitter.emit('some_event','abc',123); 
eventEmitter.emit('some_event','def',456); 

/*
执行结果
listener1 收到消息！abc-123
listener2 收到消息！abc-123
listener3 收到消息！abc-123
listener1 收到消息！def-456
listener3 收到消息！def-456
*/