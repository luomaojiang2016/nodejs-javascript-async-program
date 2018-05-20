/*
Promise的常见方法：
promise.then()，promise.catch()、Promise.all()，等
Promise 构造函数接受一个函数作为参数，该函数的2个参数分别是
 resolve 和 reject。他们是2个函数，有 JavaScript 引擎提供。
*/

const fn = new Promise((resove, reject) => {
    setTimeout(() => {
        resove('time out');
    }, 1000);
})

fn.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})
/*
执行结果：
time out
*/

//Promise链式调用，把嵌套调用变为链式调用，增加可读性
const fn1 = new Promise((resove, reject) => {
    setTimeout(() => {
        resove('fn1');
    }, 5000);
})
const fn2 = new Promise((resove, reject) => {
    setTimeout(() => {
        resove('fn2');
    }, 5000);
})
const fn3 = new Promise((resove, reject) => {
    setTimeout(() => {
        resove('fn3');
    }, 5000);
})
const fn4 = new Promise((resove, reject) => {
    setTimeout(() => {
        resove('fn4');
    }, 5000);
})
const fn5 = new Promise((resove, reject) => {
    setTimeout(() => {
        reject('fn5');
    }, 5000);
})
fn1.then((result)=>{
    console.log(result);
    return fn2;
}).then((result)=>{
    console.log(result);
    return fn3; 
}).then((result)=>{
    console.log(result);
    return fn4; 
}).then((result)=>{
    console.log(result);
    return fn5; 
}).catch((error)=>{
    console.log(error);
})

/*
执行结果
fn1
fn2
fn3
fn4
fn5
*/

Promise.all([fn1,fn2,fn3,fn4]).then((result)=>{
    console.log(result)
});
/*
执行结果
fn1
fn2
fn3
fn4
*/