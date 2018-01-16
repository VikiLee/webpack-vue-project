/* eslint-disable */
export function getUrlParams () {
  var params = window.location.href.split('?')[1]
  if (!params) return {}
  return params.split('&')
    .reduce(function (obj, str) {
      var arr = str.split('=')
      obj[arr[0]] = arr[1]
      return obj
    }, {})
}

export function getUrlParam (key) {
  var query = window.location.href
  var reg = '^.*[\\?|\\&]' + key + '\\=([^\\&|\\/#]*)'
  reg = new RegExp(reg)
  var ret = query.match(reg)
  if (ret != null) {
    return decodeURIComponent(ret[1])
  } else {
    return ''
  }
}

export function getCookie (name) {
  return decodeURIComponent((document.cookie.match(new RegExp("(^" + name + "| " + name + ")=([^;]*)")) === null) ? "" : RegExp.$2)
}

export function setCookie (name, value = '', days) {
  var str = name + '=' + encodeURIComponent(value) + '; path=/; domain=.xunlei.com;'
  if(days) {
    var exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    str += ' expires=' + exp.toGMTString()
  }
  document.cookie = str
    
}

export function isLteIE (version) {
  var b = document.createElement('b')
  b.innerHTML = `<!--[if lte IE ${version}]><i></i><![endif]-->`
  return b.getElementsByTagName('i').length === 1
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function hasClass(el, className) {
  if(!el) {
    return false
  }
  var cls = el.className
  return new RegExp(className).test(cls)
}

export function addClass(el, className) {
  if (!el || hasClass(el, className)) {
    return
  }
  var cls = el.className + ' ' + className
  el.className = cls
}

export function removeClass(el, className) {
  if (!el || !hasClass(el, className)) {
    return
  }
  var cls = el.className.replace(className, '')
  el.className = cls
}

/**
 * 显示小站发布的动态的时间
 * @param {*} timestamp 时间戳
 */
export function getDateDes(timestamp) {
  var publishTime = timestamp / 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,
    date = new Date(timestamp),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (H < 10) {
    H = '0' + H
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  d = timeNow - publishTime
  d_days = parseInt(d / 86400)
  d_hours = parseInt(d / 3600)
  d_minutes = parseInt(d / 60)
  d_seconds = parseInt(d)
  if (d_days > 0 && d_days < 3) {
    return d_days + '天前'
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前'
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前'
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚'
    } else {
      return d_seconds + '秒前'
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + '-' + D + ' ' + H + ':' + m
  } else if (d_days >= 30) {
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m
  }
}　
/**
 * 获取会员图标
 * @param {*} isVip  是否会员
 * @param {*} vasType  会员类型
 * @param {*} level 会员等级
 */
export const getVipIcon = (isVip = 1, vasType = 2, level = 0) => {
  var VIP_MAP = {
    0: 'icvip',
    2: 'icvip',
    3: 'icgold',
    5: 'icsuper'
  }
  var suffix = ''
  if(level >= 10) {
    suffix = level + ''
  } else {
    suffix = '0' + level
  }
  if(isVip == 1) {
      return VIP_MAP[vasType] + suffix
  } else {
      return VIP_MAP[vasType] + suffix + 'hui'
  }
}
/********************
 * 取窗口滚动条高度
 ******************/
function getScrollTop() {
  var scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
      scrollTop = document.body.scrollTop
  }
  return scrollTop
}
/********************
 * 取窗口可视范围的高度
 *******************/
function getClientHeight() {
  var clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}
/********************
* 取文档内容实际高度
*******************/
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
/********************
* 获取页面是不是滚到底部了
*******************/
export function goBottom() {
  if (getScrollTop() + getClientHeight() == getScrollHeight()) {
      return true
  } else {
      return false
  }
}
/********************
* 节流函数
*******************/
export function throttle(fn, delay) {
  var timer = null
  return function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
          fn()
      }, delay)
  }
}
/**
 * 输出格式化时间
 * @param {*} date 要格式的时间
 * @param {*} format 格式 y：年 M:月 d:日 h:小时 m:分钟 s:秒
 */
export function dateFormat(date, format){
  var o = {
 "M+" : date.getMonth()+1, //month
 "d+" : date.getDate(),    //day
 "h+" : date.getHours(),   //hour
 "m+" : date.getMinutes(), //minute
 "s+" : date.getSeconds(), //second
 "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
 "S" : date.getMilliseconds() //millisecond
}
if(/(y+)/.test(format)){
   format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
} 
for(var k in o){
   if(new RegExp("("+ k +")").test(format)){
     format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
   }
}
return format;
}

/**
 * 打开新窗口 防止被拦截
 * @param {*} url 要打开的地址 
 */
export function windowOpen(url) {
  var form = document.createElement('form')
  form.action = url
  form.target = '_blank'
  form.method = 'GET'
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

/**
 * 讲字节转为容易读的类型
 * @param {*} bytes 字节数
 */
export function bytesToSize(bytes) {
  if (bytes == 0) {
    return '0 B'
  }
  var k = 1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i]
} 

/**
 * 生成用户订单
 * @param {*} userid 用户id 
 * @param {*} sessionid 回话id，cookie中获取
 */
export function getGorderid (userid, sessionid) {
  return genSkey(userid, sessionid) + userid + Date.now()
}

export function genSkey (userid, sessionid) {
  var hash = 5381
  var str = userid + sessionid
  for (var i = 0, len = str.length; i < len; ++i) {
    hash += (hash << 5) + str.charCodeAt(i)
  }
  return hash & 0x7fffffff
}

/**
 * 产生指定范围的随机数
 * @param {*} min 范围的下限
 * @param {*} max 范围的上限
 */
export function random(min, max){
  return Math.ceil(Math.random() * (max - min) + min);
}

export function getExplore(){
  var Sys = {}
  var ua = navigator.userAgent.toLowerCase()
  var s
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
  (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] : 0
  // 根据关系进行判断
  if (Sys.ie) {
    return 'IE'
  } else if (Sys.chrome) {
    return 'Chrome'
  } else {
    return 'Unkonwn'
  }
}

export function getParam (name) {
  var url = location.href
  return new RegExp(name + '=([^#&]+)').exec(url) === null ? '' : RegExp.$1
}

export function timetrans (timestamp) {
  if ((timestamp + '').length === 10) timestamp *= 1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  return Y + M + D + h + m
}

export function browerInnerSize () {
  let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  return {width, height}
}

export function getBLen (str) {
  if (!str) return 0
  str += ''
  return str.replace(/[^\x00-\xff]/g, '01').length
}

/**
 * 将转义过的字符串（为了防止跨站脚本攻击转换）还原
 * @param {*} s 
 */
export function htmldecode(s){
  var div = document.createElement('div');  
  div.innerHTML = s;  
  return div.innerText || div.textContent;  
}