log("Start");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var first = r_msg2(windows, "objectAtIndex:", 0);

if (first != 0)
    log("Got first window");
