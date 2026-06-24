log("[Jindo-Nuke] Avvio blocco GPU contro la registrazione...");

// I tre bersagli possibili (Pillola iOS 17, Pillola iOS 16, e il Pallino Jindo)
var indicatorViewCls = r_class("SBRecordingIndicatorView");
var pill1Cls = r_class("STUIStatusBarPillView");
var pill2Cls = r_class("_UIStatusBarPillView");

var animCls = r_class("CABasicAnimation");
var decCls = r_class("NSDecimalNumber");

function makeDec(val) {
    return r_msg2_main(decCls, "decimalNumberWithString:", r_nsstr(val.toString()));
}

// 1. Fabbrichiamo il "Lucchetto": Un'animazione infinita bloccata a opacità ZERO
var anim = r_msg2_main(animCls, "animationWithKeyPath:", r_nsstr("opacity"));
r_msg2_main(anim, "setFromValue:", makeDec(0.0));
r_msg2_main(anim, "setToValue:", makeDec(0.0));
r_msg2_main(anim, "setValue:forKey:", makeDec(999999), r_nsstr("duration"));
r_msg2_main(anim, "setRemovedOnCompletion:", 0); // Impedisce che iOS la cancelli
r_msg2_main(anim, "setFillMode:", r_nsstr("forwards"));

// 2. Il Cecchino che cerca i bersagli
function nukeVisibility(view, depth) {
    if (view === "0x0" || depth > 20) return;

    var cls = r_msg2_main(view, "class");
    
    // Se troviamo uno dei colpevoli...
    if (cls === indicatorViewCls || cls === pill1Cls || cls === pill2Cls) {
        var layer = r_msg2_main(view, "layer");
        // ...gli agganciamo il lucchetto direttamente sulla scheda video!
        r_msg2_main(layer, "addAnimation:forKey:", anim, r_nsstr("GPULock"));
    }

    var subs = r_msg2_main(view, "subviews");
    if (subs !== "0x0") {
        var c = parseInt(r_msg2_main(subs, "count"));
        for (var i = 0; i < c; i++) {
            nukeVisibility(r_msg2_main(subs, "objectAtIndex:", i), depth + 1);
        }
    }
}

// 3. Watcher Loop (Gira ogni secondo per ricaricare l'arma se serve)
setInterval(function() {
    var sharedApp = r_msg2_main(r_class("UIApplication"), "sharedApplication");
    var windows = r_msg2_main(sharedApp, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"));

    for (var i = 0; i < winCount; i++) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        if (parseInt(r_msg2_main(win, "isHidden")) === 0) {
            nukeVisibility(win, 0);
        }
    }
}, 1000);
