// rainbow_dock.js

log("Rainbow Dock Started");

var hue = 0;

function tick() {

    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");

    var dock = r_msg2(ctrl, "dockListView");

    if (dock != 0) {

        var bg = r_msg2(dock, "backgroundView");

        if (bg != 0) {

            var color = UIColor_HSB(
                hue / 360.0,
                1.0,
                1.0,
                1.0
            );

            r_msg2_main(bg, "setBackgroundColor:", color);

            hue++;

            if (hue > 360)
                hue = 0;
        }
    }
}

setInterval(tick, 30);
