log("Testing");

var cls = r_class("SBIconController");

if (cls != 0) {

    var ctrl = r_msg2(cls, "sharedInstance");

    log("Controller: " + ctrl);

    var list = r_msg2(ctrl, "currentRootIconList");
    log("List: " + list);

    var scroll = r_msg2(ctrl, "scrollView");
    log("Scroll: " + scroll);

    var manager = r_msg2(ctrl, "iconManager");
    log("Manager: " + manager);
}
