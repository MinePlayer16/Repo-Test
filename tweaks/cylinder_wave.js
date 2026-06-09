// cylinder_wave.js

log("Cylinder Wave Started");

function updateIcons(offset) {

    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");

    var listView = r_msg2(ctrl, "currentRootIconListView");

    if (listView == 0)
        return;

    var icons = r_msg2(listView, "subviews");

    var count = r_msg2(icons, "count");

    for (var i = 0; i < count; i++) {

        var icon = r_msg2(icons, "objectAtIndex:", i);

        var wave =
            Math.sin((offset * 0.01) + (i * 0.4))
            * 25;

        r_msg2_main(
            icon,
            "setTransform:",
            makeTranslationTransform(0, wave)
        );
    }
}
