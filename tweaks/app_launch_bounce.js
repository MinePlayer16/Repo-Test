// app_launch_bounce.js

log("Launch Bounce Started");

function onAppLaunch(iconView) {

    var scale1 = makeScaleTransform(1.3, 1.3);
    var scale2 = makeScaleTransform(1.0, 1.0);

    r_msg2_main(iconView, "setTransform:", scale1);

    setTimeout(function() {
        r_msg2_main(iconView, "setTransform:", scale2);
    }, 150);
}
