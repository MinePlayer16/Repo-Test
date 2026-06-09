// icon_rotation.js

log("JS Engine Started: Cylinder Lite");

var cls = r_class("SBIconController");
if (cls == 0) {
    log("SBIconController not found");
    return;
}

var ctrl = r_msg2(cls, "sharedInstance");

var scrollView = r_msg2(ctrl, "scrollView");
if (scrollView == 0) {
    scrollView = r_msg2(ctrl, "iconScrollView");
}

if (scrollView == 0) {
    log("Scroll view not found");
    return;
}

function applyCylinder() {

    var icons = r_msg2(scrollView, "subviews");
    if (icons == 0) return;

    var count = r_msg2(icons, "count");

    for (var i = 0; i < count; i++) {

        var icon = r_msg2(icons, "objectAtIndex:", i);
        if (icon == 0) continue;

        var frame = r_msg2(icon, "frame");

        var x = frame.origin.x;

        // crude position-based rotation
        var angle = (x - 160) / 320.0;

        var transform =
            CATransform3DMakeRotation(
                angle * 0.5,
                0,
                1,
                0
            );

        r_msg2_main(icon, "setTransform:", transform);
    }
}

applyCylinder();

log("Cylinder Lite applied");
