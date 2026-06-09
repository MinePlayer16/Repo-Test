// cylinder_barrel.js

log("Cylinder Barrel Started");

function updateIcons(offset) {

    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");

    var listView = r_msg2(ctrl, "currentRootIconListView");

    var icons = r_msg2(listView, "subviews");

    var count = r_msg2(icons, "count");

    for (var i = 0; i < count; i++) {

        var icon = r_msg2(icons, "objectAtIndex:", i);

        var angle =
            (offset * 0.002)
            + (i * 0.1);

        r_msg2_main(
            icon,
            "setTransform:",
            makeRotationTransform(angle)
        );
    }
}
