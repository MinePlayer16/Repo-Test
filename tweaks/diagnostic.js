log("Starting SBIconController scan");

var ic = r_msg2(r_class("SBIconController"), "sharedInstance");

function scan(view, depth) {

    if (view == 0 || depth > 12) return 0;

    var cls = r_msg2(view, "class");
    var name = "" + cls;

    // broaden match (Apple renames sometimes)
    if (name.indexOf("Search") != -1) {
        log("MATCH CLASS: " + name);
    }

    if (name.indexOf("SBHSearchPillView") != -1) {
        log("FOUND PILL → hiding");
        r_msg2_main(view, "setHidden:", 1);
        return view;
    }

    var subs = r_msg2(view, "subviews");
    if (subs == 0) return 0;

    var count = r_msg2(subs, "count");

    for (var i = 0; i < count; i++) {

        var child = r_msg2(subs, "objectAtIndex:", i);

        var res = scan(child, depth + 1);
        if (res != 0) return res;
    }

    return 0;
}

scan(ic, 0);

log("Done");
