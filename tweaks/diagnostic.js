log("Search Pill safe path start");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var winCount = r_msg2(windows, "count");

var home = 0;

// find SBHomeScreenWindow safely (NO recursion)
for (var i = 0; i < winCount; i++) {

    var w = r_msg2(windows, "objectAtIndex:", i);
    var cls = "" + r_msg2(w, "class");

    if (cls.indexOf("SBHomeScreenWindow") != -1) {
        home = w;
        log("Found Home Screen Window at index " + i);
        break;
    }
}

if (home == 0) {
    log("No home window found");
} else {

    var v1 = r_msg2(home, "subviews");
    var c1 = r_msg2(v1, "count");

    log("Level 1 subviews: " + c1);

    var rootView = r_msg2(v1, "objectAtIndex:", 0);

    var v2 = r_msg2(rootView, "subviews");
    var c2 = r_msg2(v2, "count");

    log("Level 2 subviews: " + c2);

    // now you manually step deeper ONE level at a time
}

log("Done");
