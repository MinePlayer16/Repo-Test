log("Test");

var cls = r_class("SBIconController");

if (cls != 0) {

    var ctrl = r_msg2(cls, "sharedInstance");

    log("1");

    if (r_responds(ctrl, "view")) {
        log("2");

        var view = r_msg2(ctrl, "view");

        if (view != 0) {
            log("3");
        }
    }
}

log("Done");
