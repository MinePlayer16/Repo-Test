// red_dock.js

log("JS Engine: Attempting to color the dock RED...");

var cls = r_class("SBIconController");
if (cls != 0) {
    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    
    var dockList = r_msg2(mgr, "dockListView");
    if (dockList == 0) {
        dockList = r_msg2(ctrl, "dockListView");
    }
    
    var dockView = r_msg2(dockList, "superview");
    if (dockView == 0) {
        dockView = dockList;
    }

    var bgView = r_msg2(dockView, "backgroundView");
    if (bgView != 0) {
        // 1. Get the UIColor class
        var colorCls = r_class("UIColor");
        
        // 2. Ask it for the standard Red color object pointer
        var redColorPtr = r_msg2(colorCls, "systemRedColor"); 
        if (redColorPtr == 0) {
            redColorPtr = r_msg2(colorCls, "redColor"); // Fallback for older iOS
        }
        
        // 3. Make sure the background isn't hidden from a previous test!
        r_msg2_main(bgView, "setHidden:", 0);
        
        // 4. Apply the color object to the background view
        r_msg2_main(bgView, "setBackgroundColor:", redColorPtr);
        
        // Because the dock uses a blur material, we also color the container to be safe
        r_msg2_main(dockView, "setBackgroundColor:", redColorPtr);
        
        log("SUCCESS: Dock should now be bright red!");
    } else {
        log("ERROR: Could not find the backgroundView.");
    }
} else {
    log("ERROR: SBIconController not found.");
}
