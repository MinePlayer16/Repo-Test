log("Start");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var first = r_msg2(windows, "objectAtIndex:", 0);

var subs = r_msg2(first, "subviews");

var count = r_msg2(subs, "count");

log("Subviews = " + count);

if (count > 0) {

    var child = r_msg2(subs, "objectAtIndex:", 0);

    if (child != 0)
        log("Got child");
}
