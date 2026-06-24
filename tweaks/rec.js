log("[Jindo] Running...");

var jindoWinCls = r_class("SBSystemApertureWindow");
var portalCls = r_class("_UIPortalView");
var decCls = r_class("NSDecimalNumber");

function makeDec(val) {
    return r_msg2_main(decCls, "decimalNumberWithString:", r_nsstr(val.toString()));
}

function blindThePortals(view, depth) {
    if (view === "0x0" || depth > 15) return;

    if (r_msg2_main(view, "class") === portalCls) {
        var layer = r_msg2_main(view, "layer");
        r_msg2_main(layer, "setValue:forKeyPath:", makeDec(0.0), r_nsstr("opacity"));
        r_msg2_main(view, "setAlpha:", makeDec(0.0));
    }

    var subs = r_msg2_main(view, "subviews");
    if (subs !== "0x0") {
        var c = parseInt(r_msg2_main(subs, "count"));
        for (var i = 0; i < c; i++) {
            blindThePortals(r_msg2_main(subs, "objectAtIndex:", i), depth + 1);
        }
    }
}


setInterval(function() {
    var sharedApp = r_msg2_main(r_class("UIApplication"), "sharedApplication");
    var windows = r_msg2_main(sharedApp, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"));

    for (var i = 0; i < winCount; i++) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        
        if (parseInt(r_msg2_main(win, "isKindOfClass:", jindoWinCls)) !== 0) {
            

            if (parseInt(r_msg2_main(win, "isHidden")) === 0) {
                blindThePortals(win, 0);
            }
        }
    }
}, 1000);
