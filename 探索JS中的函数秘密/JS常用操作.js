
/**
 * new 操作符中里面做了什么
 * @param {*} func 需要执行new 操作的函数
 */
function _new(func) {
    // 第一步创建一个新对象
    const newObj = {}
    // 第二步 让新对象的__proro__属性指向func构造函数的prototype上的属性和方法
    newObj.__proto__ = func.prototype
    // 总结成一步就是  const newObj = Object.create(func.prototype)

    // 第三步 调用appl方法，属性和方法添加到this的引用对象中
    const result = func.apply(newObj)

    if (result && (typeof result === 'object' || typeof result === 'function' )) {
        // 如果构造函数返回的是一个对象，那么则返回这个对象
        return result
    }
    // 否则返回新创建出来的对象
    return newObj
}
/**
 * 防抖
 * @param {*} fun 需要使用防抖的函数
 * @param {*} delay 当前指定的最小触发时间
 */
function debancde(fun, delay = 400) {
    let timer = null
    return () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun()
        }, delay)
    }
}
/**
 * 节流
 * @param fn 需要执行的函数 
 * @param delay 多长时间内执行
 */
function throttle(fn, delay) {
    let startTime = new Date()
    return () => {
        let endTime = new Date()
        if (endTime - startTime >= delay) {
            fn()
            startTime = endTime
        } else {
            return
        }
    }
}
 /**
  * 
  * @param 获取一个数组中出现次数最多有的一项和次数
  * @param {key } 当前数组中的元素
  * @param { value } 当前数组这一项出现的次数
  * @param { arr } 需要检测的数组
  * @param { Maxvalue } 最大大次数
  * @param { maxKey } 出现最多次数的哪一项
  */
  function getMaxNum(arr) {
    if (!Array.isArray(arr)) return undefined
    if (!arr.length) return undefined
    // 拿到数组中所有项组成一个对象 
    const formatObj = arr.reduce((obj, item) => {
        obj[item] = obj[item] ? ++obj[item] : 1 // 有则+1 无则等于1
        return obj
    }, {})
    return max(formatObj)
    function max(obj) {
        const Maxvalue = Math.max.apply(Math, Object.values(obj)) // 拿到最大次数
        let maxKey = null
        for (let key in obj) {
            if (obj[key] === Maxvalue) { // 通过最大次数寻找是哪一项
                maxKey = key
                break
            }
        }
        return [maxKey, Maxvalue]
    }
}