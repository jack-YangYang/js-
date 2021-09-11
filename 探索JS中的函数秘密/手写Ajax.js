let xml = new XMLHttpRequest()
xml.open(url, method)
xml.onreadystatechange = function() {
    if (xml.status === 200 && xml.readyState === 4) {
        console.log(xml.response)
    } else {
        console.log(xml.statusText)
    }
}
xml.onerror = function() {
    console.log(xml.statusText)
}
xml.responseType = 'json'
xml.setRequestHeader('Accept', "application/json")
xml.send(null)

// feng'h'
setTimeout(function () { // 宏任务直接进入队列等待 所有的同步任务和微任务执行完以后，再开始执行  所以第七次打印1
    console.log("1");
  }, 0); // 这里的时间跟前面的任务队列消耗的时间有关系
async function async1() {
    console.log("2"); // 先执行的async1() 所以第一个打印2没毛病
    const data = await async2(); // 遇到await 代码阻塞 执行 async2()
    console.log("3"); // 等待await执行完毕 第五个打印3
    return data;
}
async function async2() {
    return new Promise((resolve) => {
        console.log("4"); // 同步代码先执行 第二个打印4
        resolve("async2的结果");
    }).then((data) => { // 成功以后打印 第四个 5
        console.log("5");
        return data;
    });
}
async1().then((data) => {
    console.log("6"); // 在async2全部执行完毕 自身的同步任务执行完以后 再执行微任务打印 第六个6
    console.log(data);
});
new Promise(function (resolve) {
    console.log("7"); // 同步代码先执行 第三个打印7
    //   resolve()
    }).then(function () {
    console.log("8");
});
// 2  4  7 5 3 6