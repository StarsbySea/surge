/*

type: http-request
regex: ^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=(basicConfig|genToken)$
script-path: https://raw.githubusercontent.com/chiupam/surge/main/scripts/wskey.js
box: https://raw.githubusercontent.com/chiupam/surge/main/boxjs/chiupam.boxjs.json

###### Surge ######
[Script]
http-request ^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=(basicConfig|genToken)$ script-path=https://raw.githubusercontent.com/chiupam/surge/main/scripts/wskey.js, requires-body=true, timeout=120, tag=京东获取wskey

[Mitm]
hostname = %APPEND% api.m.jd.com

###### Loon ######
[Script]
http-request ^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=(basicConfig|genToken)$ script-path=https://raw.githubusercontent.com/chiupam/surge/main/scripts/wskey.js, requires-body=true, timeout=120, tag=京东获取wskey

[Mitm]
hostname = api.m.jd.com

###### QuanX ######
[rewrite_local]
^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=(basicConfig|genToken)$ url script-request-header https://raw.githubusercontent.com/chiupam/surge/main/scripts/wskey.js

[Mitm]
hostname = api.m.jd.com

*/

const $ = Env()
if (typeof $request !== 'undefined') {
  set()
  $.done()
}

function set() {
  var old = $.read("jd_wskey")
  if (!old) {$.write("pin=xxxxxx;wskey=xxxxxx;", "jd_wskey")}
  var old_pin = old.split(";")[0] + ";"
  var old_wskey = old.split(";")[1] + ";"
  var url = $request.url
  var cookie = $request.headers.Cookie || $request.headers.cookie
  if (url.indexOf("basicConfig") != -1) {
    var new_pin = cookie.match(/(pt_pin=[^;]*)/)[1].replace('pt_', '')
    var jd_wskey = new_pin + old_wskey
    $.write(jd_wskey, "jd_wskey")
    $.log(new_pin)
  }
  if (url.indexOf("genToken") != -1) {
    var new_wskey = cookie.match(/(wskey=[^;]*)/)[1]
    var jd_wskey = old_pin + new_wskey + ";"
    $.write(jd_wskey, "jd_wskey")
    $.log(new_wskey)
  }
}


function Env() {
  LN = typeof $loon != "undefined"
  SG = typeof $httpClient != "undefined" && !LN
  QX = typeof $task != "undefined"
  read = (key) => {
    if (LN || SG) return $persistentStore.read(key)
    if (QX) return $prefs.valueForKey(key)
  }
  write = (key, val) => {
    if (LN || SG) return $persistentStore.write(key, val);
    if (QX) return $prefs.setValueForKey(key, val)
  }
  notice = (title, subtitle, message, url) => {
    if (LN) $notification.post(title, subtitle, message, url)
    if (SG) $notification.post(title, subtitle, message, { url: url })
    if (QX) $notify(title, subtitle, message, { "open-url": url })
  }
  get = (url, cb) => {
    if (LN || SG) {$httpClient.get(url, cb)}
    if (QX) {url.method = 'GET'; $task.fetch(url).then((resp) => cb(null, {}, resp.body))}
  }
  post = (url, cb) => {
    if (LN || SG) {$httpClient.post(url, cb)}
    if (QX) {url.method = 'POST'; $task.fetch(url).then((resp) => cb(null, {}, resp.body))}
  }
  put = (url, cb) => {
    if (LN || SG) {$httpClient.put(url, cb)}
    if (QX) {url.method = 'PUT'; $task.fetch(url).then((resp) => cb(null, {}, resp.body))}
  }
  log = (message) => console.log(message)
  done = (value = {}) => {$done(value)}
  return { LN, SG, QX, read, write, notice, get, post, put, log, done }
}
