log("Start");

var appCls = r_class("UIApplication");

var app = r_msg2(appCls, "sharedApplication");

if (app != 0)
    log("Got app");

var windows = r_msg2(app, "windows");

if (windows != 0)
    log("Got windows");

var count = r_msg2(windows, "count");

log("Count = " + count);
