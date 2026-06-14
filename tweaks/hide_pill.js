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


