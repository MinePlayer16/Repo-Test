// red_clock.js

log("Attempting to color status bar text RED...");

var colorCls = r_class("UIColor");
var redColor = r_msg2(colorCls, "systemRedColor");

if (redColor == 0) {
    redColor = r_msg2(colorCls, "redColor");
}

var appCls = r_class("UIApplication");
var app = r_msg2(appCls, "sharedApplication");

var statusBar = r_msg2(app, "statusBar");

if (statusBar != 0) {

    var subviews = r_msg2(statusBar, "subviews");
    var count = r_msg2(subviews, "count");

    for (var i = 0; i < count; i++) {

        var view = r_msg2(subviews, "objectAtIndex:", i);

        var clsName = r_msg2(view, "className");

        if (clsName && clsName.indexOf("_UIStatusBarStringView") != -1) {

            r_msg2_main(view, "setTextColor:", redColor);

            log("Changed _UIStatusBarStringView text color.");
        }
    }

} else {
    log("Status bar not found.");
}
