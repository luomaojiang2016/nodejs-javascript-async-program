console.log('begin step!');

setTimeout(() => {
    console.log('second step!');
}, 2000);

console.log('third step!');
/*
执行结果：
begin step!
third step!
second step!
*/