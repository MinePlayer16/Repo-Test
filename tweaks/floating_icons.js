// floating_icons.js

log("Floating Icons Started");

var cls = r_class("SBIconController");
var ctrl = r_msg2(cls, "sharedInstance");

function tick() {
    var listView = r_msg2(ctrl, "currentRootIconListView");

    if (listView != 0) {
        var icons = r_msg2(listView, "subviews");

        var count = r_msg2(icons, "count");

        for (var i = 0; i < count; i++) {
            var icon = r_msg2(icons, "objectAtIndex:", i);

            var y = Math.sin(Date.now()/500 + i) * 5;

            r_msg2_main(icon, "setTransform:",
                makeTranslationTransform(0, y));
        }
    }
}

setInterval(tick, 16);
