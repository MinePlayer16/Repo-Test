log("Search Pill scan started");

var app = r_msg2(r_class("UIApplication"), "sharedApplication");
var windows = r_msg2(app, "windows");

var winCount = r_msg2(windows, "count");

function scan(view, depth) {

    if (view == 0 || depth > 10) return 0;

    var cls = r_msg2(view, "class");

    // try to stringify class safely
    var name = r_msg2(cls, "description");

    // match Search Pill
    if (name && ("" + name).indexOf("SBHSearchPillView") != -1) {
        log("FOUND Search Pill → hiding");
        r_msg2_main(view, "setHidden:", 1);
        return view;
    }

    var subs = r_msg2(view, "subviews");
    if (subs == 0) return 0;

    var count = r_msg2(subs, "count");

    for (var i = 0; i < count; i++) {

        var child = r_msg2(subs, "objectAtIndex:", i);

        var result = scan(child, depth + 1);
        if (result != 0) return result;
    }

    return 0;
}

// scan all windows
for (var i = 0; i < winCount; i++) {

    var w = r_msg2(windows, "objectAtIndex:", i);

    log("Scanning window " + i);

    var found = scan(w, 0);

    if (found != 0) {
        log("Done: Search Pill hidden");
        break;
    }
}

log("Scan complete");
