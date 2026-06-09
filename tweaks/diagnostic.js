log("Searching windows");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var count = r_msg2(windows, "count");

for (var i = 0; i < count; i++) {

    var w = r_msg2(windows, "objectAtIndex:", i);

    if (w != 0)
        log("Window " + i + " = " + w);
}
