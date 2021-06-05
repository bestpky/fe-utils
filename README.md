# fe-utils

Typescript 实现的前端常用工具库，持续更新

## 使用

```shell
npm i -S @pky/fe-utils
```

## JS 相关

| 文件名        | 使用                                 |
| ------------- | ------------------------------------ |
| deep-copy     | 深拷贝                               |
| delay         | 延迟                                 |
| flatten       | 数组扁平化                           |
| for-each      | 同 Array.prototype.forEach           |
| get-ext       | 获取 string 或 FileLike 对象后缀名   |
| hex-to-rgb    | #fff 转 rgb(255,255,255)             |
| keys          | 同 Object.keys，正确 key 类型        |
| many          | 数组包裹                             |
| map           | 同 Array.prototype.map               |
| mime-to-ext   | mime 类型转后缀名                    |
| remove        | 删除元素或根据规则函数删除           |
| separate      | 根据规则函数把数组中元素分成两个数组 |
| sort-by       | 根据规则函数排序                     |
| swap          | 交换数组中两个元素                   |
| type-of       | toString 类型判断                    |
| debounce      | 防抖                                 |
| throttle      | 节流                                 |
| event-emitter | 发布订阅                             |

## 浏览器环境

| 文件名          | 使用                                      |
| --------------- | ----------------------------------------- |
| url-to-blob     | url 转 blob 对象，支持 dataUrl 和 blobUrl |
| load-image      | 加载图片                                  |
| parse-url-query | 解析 url 的 query                         |
| resize-watch    | 监听元素尺寸变化，基于 ResizeObserver     |
| select-file     | 选择文件                                  |

## 判断类

| 文件名        | 使用                              |
| ------------- | --------------------------------- |
| is-array-like | 是否类数组                        |
| is-data-url   | 是否 data url，data 协议          |
| is-empty      | 是否空值，支持所有类型            |
| is-file-like  | 是否类文件对象                    |
| is-image      | 是否图片，支持 FileLike 和 string |
| is-object-url | 是否 object url，blob 协议        |
| is-prototype  | 是否原型对象                      |
