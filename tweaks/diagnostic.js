log("Start");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var first = r_msg2(windows, "objectAtIndex:", 0);

var subs = r_msg2(first, "subviews");

if (subs != 0)
    log("Got subviews");

var count = r_msg2(subs, "count");

log("Subviews = " + count);
