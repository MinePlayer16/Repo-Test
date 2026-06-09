log("Glass Dock static");

var cls = r_class("SBIconController");
var ctrl = r_msg2(cls, "sharedInstance");

var mgr = r_msg2(ctrl, "iconManager");
var dockList = r_msg2(mgr, "dockListView");

if (dockList == 0)
    dockList = r_msg2(ctrl, "dockListView");

var dockView = r_msg2(dockList, "superview");
if (dockView == 0) dockView = dockList;

var bg = r_msg2(dockView, "backgroundView");

if (bg != 0) {

    r_msg2_main(bg, "setAlpha:", 0.3);

    r_msg2_main(bg, "setHidden:", 0);

    log("Glass dock applied once");
}
