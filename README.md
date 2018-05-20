                                                
nodejs 异步编程总结
=============

## 回调函数
回调函数历史悠久,基本上绝大多数语言里都会有，通常用于异步请求完成后通知。如果是单层回调，代码的可读性不会受太大影响，如果回调层数过多，会形成回调地狱。
<pre><code>。
console.log('begin step!');

setTimeout(() => {
    console.log('second step!');
}, 2000);

console.log('third step!');
</code></pre>

## 回调函数
额外若无若翁