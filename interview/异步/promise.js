/**
 * 题目：网页中预加载20张图片资源，分步加载，一次加载10张，两次完成，
 * 怎么控制图片请求的并发，怎样感知当前异步请求是否已完成？
 * **/

const urls = [];

function loadingImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            resolve(img)
        };
        img.onerror = reject;
        img.src = url;
    })
}

const addToHtml = () =>{};

// 调用Promise.resolve会返回一个状态为fulfilled状态的promise对象
let promise = Promise.resolve();
for(let i = 0; i < urls.length; i++){
    promise = promise
        .then(()=>loadingImg(urls[i]))
        .then(addToHtml)
}

// promise 变量就像是一个迭代器，不断指向最新的返回的 Promise
urls.reduce((promise, url) => {
    return promise
        .then(()=>loadingImg(url))
        .then(addToHtml)
},Promise.resolve());


// 控制最大并发数量

let index = 0;
const step1 = [], step2 = [];

while(index < 10){
    // 得到 10 个 promise 对象
    step1.push(loadingImg('./img/pic/${index}.jpg'));
    index ++;
}

step1.reduce((task, imgPromise, i) => {
    return task
        // 返回一个新的promise 对象 加载成功 执行 then 再返回一个 promise对象resolve
        .then(() => imgPromise)
        .then(() => { console.log('第i+1张图片加载完成')})
},Promise.resolve())
        // 不使用return语句，那样默认就是将返回的promise对象resolve
        .then(() => { console.log('前面10张图片已经加载完成')})
        .then(() => {
            while (index < 20) {
                step2.push(loadingImg('./img/pic/${index}.jpg'));
                index ++;
            }
            return step2.reduce((task, imgPromise, i) => {
                return task
                    .then(()=> imgPromise)
                    .then(() => {
                        console.log('第i + 11 张图片已经加载完成')
                    })
            },Promise.resolve())
        }).then(() => {
    console.log('后面 10张图片已经加载完成')
});




/**
 * 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；
 * 如何让三个灯不断交替重复亮灯？（用Promise实现）
 * **/

function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

const loop = (timer, light)=>{
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            light();
            resolve(); // 调用then
        },timer)
    })
};


function repeat() {
    Promise.resolve()
        .then(()=> loop(3000,red)) // 第一个promise执行完毕后返回 fulfilled 然后 执行下一个 then 以此类推
        .then(()=> loop(1000,green))
        .then(()=> loop(2000, yellow))
        .then(()=> {repeat()});
}

repeat();






