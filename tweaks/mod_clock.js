// color_statusbar_bg.js
log("JS Engine Started: Coloring Status Bar Background...");

// 1. Define the color (e.g., systemGreenColor, systemRedColor, cyanColor)
var colorClass = r_class("UIColor");
var customColor = r_msg2(colorClass, "systemGreenColor"); 

// --- TARGET A: The System-Wide Status Bar Instance ---
var app = r_msg2(r_class("UIApplication"), "sharedApplication");
if (app != 0) {
    var statusBar = r_msg2(app, "statusBar");
    if (statusBar != 0) {
        r_msg2_main(statusBar, "setBackgroundColor:", customColor);
        log("SUCCESS: Colored active UIApplication statusBar.");
    }
}

// --- TARGET B: SpringBoard's Home Screen Legibility View ---
var sbControllerClass = r_class("SBIconController");
if (sbControllerClass != 0) {
    var ctrl = r_msg2(sbControllerClass, "sharedInstance");
    var hsView = r_msg2(ctrl, "view"); 
    
    if (hsView != 0) {
        // Attempting to hit the SBFStatusBarLegibilityView from the UI tree
        var legibilityView = r_msg2(hsView, "statusBarLegibilityView");
        if (legibilityView == 0) {
            legibilityView = r_msg2(hsView, "_statusBarLegibilityView");
        }
        
        if (legibilityView != 0) {
            r_msg2_main(legibilityView, "setBackgroundColor:", customColor);
            log("SUCCESS: Colored SBHomeScreenView legibility background.");
        }
    }
}

// --- TARGET C: UIAppearance Fallback for _UIStatusBar ---
var internalStatusBarClass = r_class("_UIStatusBar");
if (internalStatusBarClass != 0) {
    var appearance = r_msg2(internalStatusBarClass, "appearance");
    if (appearance != 0) {
        r_msg2_main(appearance, "setBackgroundColor:", customColor);
        log("SUCCESS: Applied UIAppearance background color to _UIStatusBar.");
    }
}
