//mod_clock.js
log("JS Engine Started: Mod Clock Tweak Initializing...");

// --- 2. Modify Clock in Status Bar ---

// The clock text inside notched status bars uses _UIStatusBarStringView
var stringViewClass = r_class("_UIStatusBarStringView");
if (stringViewClass != 0) {
    var clockAppearance = r_msg2(stringViewClass, "appearance");
    if (clockAppearance != 0) {
        // Change color to green
        var colorClass = r_class("UIColor");
        var customColor = r_msg2(colorClass, "systemGreenColor"); 
        
        r_msg2_main(clockAppearance, "setTextColor:", customColor);
        log("SUCCESS: Status bar clock text color modified to green.");
        
        // Note: For changing fonts, you would typically need a bridge method capable 
        // of passing primitive numbers (like float for size), which depends on your 
        // JS engine's specific message passing capabilities for multiple arguments.
    }
} else {
    log("ERROR: _UIStatusBarStringView not found.");
}
