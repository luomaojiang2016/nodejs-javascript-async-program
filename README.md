                                                
nodejs 异步编程总结
=============

## 回调函数
回调函数历史悠久,基本上绝大多数语言里都会有，通常用于异步请求完成后通知。如果是单层回调，代码的可读性不会受太大影响，如果回调层数过多，会形成回调地狱,如下面这段代码，看起来就比较费劲
<pre><code>。
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
</code></pre>

## 事件
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列,Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 nodejs的events 模块提供了一个对象，events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
<pre><code>
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
</code>
</pre>
## 发布订阅
发布订阅模式属于广义上的观察者模式，并不等同于异步处理的概念，在实际开发过程中应用非常广泛.
<pre><code>
const Subscribe = function () {
    const _observers = [];

    this.attch = function (observer) {
        _observers.push(observer);

    }

    this.delattch = function () {
        _observers.pop();

    }

    this.notify = function (msg) {
        for (var i = 0; i < _observers.length; i++) {
            _observers[i].update(msg);
        }
    }
}

const Observer = function (name) {
  
    this.update = function (msg) {

        console.log(`I name is ${name},receive message is ${msg}`);

    }
}

const Sub =new Subscribe();
Sub.attch(new Observer('xiao wang'));
Sub.attch(new Observer('xiao li'));
Sub.notify('1234556');
</code></pre>
## Promise
相对回调函数而言,Promise在异步处理上解决了回调地狱（Callback Hell）问题，把callback 嵌套调用变成链式调用，如：
<pre>
<code>
firstAsync(function(data){
    //处理得到的 data 数据
    //....
    secondAsync(function(data2){
        //处理得到的 data2 数据
        //....
        thirdAsync(function(data3){
              //处理得到的 data3 数据
              //....
        });
    });
});

firstAsync()
.then(function(data){
    //处理得到的 data 数据
    //....
    return secondAsync();
})
.then(function(data2){
    //处理得到的 data2 数据
    //....
    return thirdAsync();
})
.then(function(data3){
    //处理得到的 data3 数据
    //....
});
</code>
</pre>

## async/await
ES7 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
<pre>
<code>
function fn() {
    return new Promise((resove, reject) => {
        setTimeout(() => {
            resove(true);
        }, 1000);

    })
}

async function name() {
    try {
        const result = await fn();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
name();
</code>
</pre>

async/await 的优势在于处理 then 链,如使用Promise
<pre>
<code>
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}

function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt()
</code>
</pre>
如果使用 async/await
<pre>
<code>
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
</code>
</pre>
