var cls = r_class("SBIconController");

var ctrl = r_msg2(cls, "sharedInstance");

log("ctrl = " + ctrl);

var dock = r_msg2(ctrl, "dockListView");

log("dock = " + dock);
