// hide_pill.js
log("JS Engine Started: Safely Hiding Search Pill...");

var pillClass = r_class("SBHSearchPillView");

// This function acts like a scanner, crawling the UI tree layer by layer
function scanAndHidePill(view) {
    if (view == 0) return 0;
    
    // Check if the current view in the tree is our target
    var isTarget = r_msg2(view, "isKindOfClass:", pillClass);
    if (isTarget) {
        // Target acquired, hide it safely on the main thread
        r_msg2_main(view, "setHidden:", 1);
        r_msg2_main(view, "setAlpha:", 0.0);
        return 1; // Signal that we found it
    }
    
    // If not, get all child views (subviews) and scan them
    var subviews = r_msg2(view, "subviews");
    if (subviews != 0) {
        var count = r_msg2(subviews, "count");
        for (var i = 0; i < count; i++) {
            var child = r_msg2(subviews, "objectAtIndex:", i);
            if (scanAndHidePill(child)) {
                return 1; // Stop scanning once found
            }
        }
    }
    return 0;
}

// 1. Get the SpringBoard Icon Controller
var sbIconCtrlClass = r_class("SBIconController");
if (sbIconCtrlClass != 0 && pillClass != 0) {
    var ctrl = r_msg2(sbIconCtrlClass, "sharedInstance");
    
    // 2. Start from the highest level window to guarantee we catch it
    var rootWindow = r_msg2(ctrl, "window");
    
    if (rootWindow == 0) {
        // Fallback to the main application window if the controller window is null
        var app = r_msg2(r_class("UIApplication"), "sharedApplication");
        rootWindow = r_msg2(app, "keyWindow");
    }
    
    if (rootWindow != 0) {
        // 3. Execute the scan
        var found = scanAndHidePill(rootWindow);
        if (found) {
            log("SUCCESS: SBHSearchPillView found via tree traversal and hidden!");
        } else {
            log("WARNING: SBHSearchPillView not found in the current view tree.");
        }
    } else {
        log("ERROR: Could not locate a root window to begin the scan.");
    }
} else {
    log("ERROR: Required classes not found. SpringBoard might not be fully loaded.");
}
