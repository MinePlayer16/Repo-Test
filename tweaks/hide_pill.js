// hide_pill.js
log("JS Engine Started: Hide Search PIll Tweak Initializing...");

// --- 1. Hide SBHSearchPillView ---

// Approach A: Global UIAppearance (Applies to new instances or upon refresh)
var pillClass = r_class("SBHSearchPillView");
if (pillClass != 0) {
    var pillAppearance = r_msg2(pillClass, "appearance");
    if (pillAppearance != 0) {
        r_msg2_main(pillAppearance, "setHidden:", 1);
        r_msg2_main(pillAppearance, "setAlpha:", 0.0);
        log("SUCCESS: SBHSearchPillView hidden via UIAppearance.");
    }
} else {
    log("ERROR: SBHSearchPillView class not found.");
}

// Approach B: Direct active instance manipulation (Instant hide)
var sbControllerClass = r_class("SBIconController");
if (sbControllerClass != 0) {
    var ctrl = r_msg2(sbControllerClass, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    var rootFolderCtrl = r_msg2(mgr, "rootFolderController");
    
    if (rootFolderCtrl != 0) {
        var rootFolderView = r_msg2(rootFolderCtrl, "view");
        if (rootFolderView != 0) {
            var searchPill = r_msg2(rootFolderView, "searchPillView");
            if (searchPill != 0) {
                r_msg2_main(searchPill, "setHidden:", 1);
                r_msg2_main(searchPill, "setAlpha:", 0.0);
                log("SUCCESS: Active search pill instance hidden instantly!");
            } else {
                log("WARNING: Active searchPillView not found on root folder.");
            }
        }
    }
}
