log("Fake cylinder layout");

var ctrl = r_msg2(r_class("SBIconController"), "sharedInstance");

var mgr = r_msg2(ctrl, "iconManager");
var dockList = r_msg2(mgr, "dockListView");

if (dockList == 0)
    dockList = r_msg2(ctrl, "dockListView");

var icons = r_msg2(dockList, "subviews");

if (icons != 0) {

    var count = r_msg2(icons, "count");

    for (var i = 0; i < count; i++) {

        var icon = r_msg2(icons, "objectAtIndex:", i);

        var angleOffset = (i - count/2) * 0.05;

        r_msg2_main(
            icon,
            "setTransform:",
            makeRotationTransform(angleOffset)
        );
    }

    log("Cylinder static layout applied");
}
