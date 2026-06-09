// parallax_scale_pages.js

log("Applying Scale Effect");

var cls = r_class("SBIconController");
var ctrl = r_msg2(cls, "sharedInstance");

var list = r_msg2(ctrl, "currentRootIconList");

if (list != 0) {

    var icons = r_msg2(list, "subviews");
    var count = r_msg2(icons, "count");

    for (var i = 0; i < count; i++) {

        var icon = r_msg2(icons, "objectAtIndex:", i);

        r_msg2_main(icon, "setAlpha:", 0.85);
        r_msg2_main(icon, "setScale:", 0.92);
    }

    log("Scale effect applied");
}
