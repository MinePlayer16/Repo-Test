log("[Floating icons] Starting tweak...");

var animCls = r_class("CABasicAnimation");
var decCls = r_class("NSDecimalNumber");

// Helper to generate decimal values
function makeDec(strValue) {
    return r_msg2(decCls, "decimalNumberWithString:", r_nsstr(strValue));
}

// the actual animation
function createAnim(keyPath, fromVal, toVal, duration) {
    var anim = r_msg2(animCls, "animationWithKeyPath:", r_nsstr(keyPath));
    r_msg2(anim, "setFromValue:", makeDec(fromVal));
    r_msg2(anim, "setToValue:", makeDec(toVal));
    r_msg2(anim, "setValue:forKey:", makeDec(duration), r_nsstr("duration"));
    r_msg2(anim, "setValue:forKey:", makeDec("99999.0"), r_nsstr("repeatCount"));
    r_msg2(anim, "setAutoreverses:", 1);
    r_msg2(anim, "setRemovedOnCompletion:", 0);

    // smoothens the animation like a pendulum
    var tfCls = r_class("CAMediaTimingFunction");
    var tf = r_msg2(tfCls, "functionWithName:", r_nsstr("easeInEaseOut"));
    r_msg2(anim, "setTimingFunction:", tf);

    return anim;
}


// Y (up and down)
var animY = createAnim("transform.translation.y", "-12.0", "12.0", "3.7");

// X (right and left)
var animX = createAnim("transform.translation.x", "-5.0", "5.0", "4.3");

// Rotation
var animRot = createAnim("transform.rotation.z", "-0.035", "0.035", "2.9");

// Scaling
var animScale = createAnim("transform.scale", "0.98", "1.0", "5.1");


//home and dock
var ctrl = r_msg2(r_class("SBIconController"), "sharedInstance");
var mgr = r_msg2(ctrl, "iconManager");

// ---> DOCK
var dockList = r_msg2(mgr, "dockListView");
if (dockList === "0x0") dockList = r_msg2(ctrl, "dockListView");

if (dockList !== "0x0") {
    var dockLayer = r_msg2(dockList, "layer");
    r_msg2_main(dockLayer, "addAnimation:forKey:", animY, r_nsstr("FloatY"));
    r_msg2_main(dockLayer, "addAnimation:forKey:", animX, r_nsstr("FloatX"));
    r_msg2_main(dockLayer, "addAnimation:forKey:", animRot, r_nsstr("FloatRot"));
    r_msg2_main(dockLayer, "addAnimation:forKey:", animScale, r_nsstr("FloatScale"));
}

// ---> HOME SCREEN (SBIconContentView)
var rootFC = r_msg2(mgr, "rootFolderController");
if (rootFC === "0x0") rootFC = r_msg2(mgr, "_rootFolderController");

if (rootFC !== "0x0") {
    var contentView = r_msg2(rootFC, "contentView");
    if (contentView !== "0x0") {
        var homeLayer = r_msg2(contentView, "layer");
        r_msg2_main(homeLayer, "addAnimation:forKey:", animY, r_nsstr("FloatY"));
        r_msg2_main(homeLayer, "addAnimation:forKey:", animX, r_nsstr("FloatX"));
        r_msg2_main(homeLayer, "addAnimation:forKey:", animRot, r_nsstr("FloatRot"));
        r_msg2_main(homeLayer, "addAnimation:forKey:", animScale, r_nsstr("FloatScale"));
    }
}

log("[Floating icons] Successfully applied the Animation!");