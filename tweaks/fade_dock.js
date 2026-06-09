// fade_dock.js

log("JS Engine Started");

var cls = r_class("SBIconController");

if (cls != 0) {

    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");

    var dockList = r_msg2(mgr, "dockListView");

    if (dockList == 0) {
        dockList = r_msg2(ctrl, "dockListView");
    }

    if (dockList != 0) {

        var bgView = r_msg2(dockList, "backgroundView");

        if (bgView != 0) {
            r_msg2_main(bgView, "setAlpha:", 0.2);
            log("Dock faded");
        }
    }
}
