log("Start");

var cls = r_class("SBIconController");

if (cls != 0) {

    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");

    if (mgr != 0) {

        log("Manager OK");

        if (r_responds(mgr, "rootFolderController"))
            log("rootFolderController");

        if (r_responds(mgr, "currentRootIconList"))
            log("currentRootIconList");

        if (r_responds(mgr, "contentView"))
            log("contentView");

        if (r_responds(mgr, "folderController"))
            log("folderController");
    }
}

log("Done");
