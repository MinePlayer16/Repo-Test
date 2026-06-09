log("Step 1");

var cls = r_class("SBIconController");

if (cls != 0) {

    log("Step 2");

    var ctrl = r_msg2(cls, "sharedInstance");

    if (ctrl != 0) {

        log("Step 3");

        var mgr = r_msg2(ctrl, "iconManager");

        if (mgr != 0) {
            log("Step 4");
        }
    }
}

log("Done");
