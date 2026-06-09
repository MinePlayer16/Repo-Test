var cls = r_class("SBIconController");
var ctrl = r_msg2(cls, "sharedInstance");

var dock = r_msg2(ctrl, "dockListView");

if (dock != 0) {

    r_msg2_main(
        dock,
        "setHidden:",
        1
    );

    log("Dock hidden");
}
