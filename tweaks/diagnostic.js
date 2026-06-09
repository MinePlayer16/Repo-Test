log("Dumping windows");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var count = r_msg2(windows, "count");

for (var i = 0; i < count; i++) {

    var w = r_msg2(windows, "objectAtIndex:", i);

    var cls = "" + r_msg2(w, "class");

    log(i + " -> " + cls);
}

log("Done");
