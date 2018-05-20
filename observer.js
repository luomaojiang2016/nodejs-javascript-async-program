//以观察者模式实现发布订阅
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

/*
执行结果：
I name is xiao wang,receive message is 1234556
I name is xiao li,receive message is 1234556



*/