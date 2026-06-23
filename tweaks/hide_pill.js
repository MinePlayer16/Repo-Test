log("[SearchPill-JS] Hiding SBFolderScrollAccessoryView...");

var homeWindowCls = r_class("SBHomeScreenWindow");
var accessoryCls  = r_class("SBFolderScrollAccessoryView");
var iconListCls   = r_class("SBIconListView"); 

if (accessoryCls === "0x0") {
    log("[SearchPill-JS] SBFolderScrollAccessoryView not found.");
} else {
    var app = r_msg2_main(r_class("UIApplication"), "sharedApplication");
    var windows = r_msg2_main(app, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"), 16);
    
    var homeWindow = "0x0";
    for (var i = 0; i < winCount; i++) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        if (r_msg2_main(win, "class") === homeWindowCls) {
            homeWindow = win;
            break;
        }
    }
    
    if (homeWindow === "0x0") {
        log("[SearchPill-JS] SBHomeScreenWindow not found.");
    } else {
        var found = false; // flag to exit the loop
        
        function fastFindAndHide(view, depth) {
            if (view === "0x0" || depth > 8 || found) return;
            
            var cls = r_msg2_main(view, "class");
            if (cls === iconListCls) return; // Skip icons
            
            if (cls === accessoryCls) {
                r_msg2_main(view, "setHidden:", 1);
                
                found = true; //to exit the loop
                log("[SearchPill-JS] Hid AccessoryView at depth " + depth);
                return;
            }
            
            var subviews = r_msg2_main(view, "subviews");
            if (subviews !== "0x0") {
                var childCount = parseInt(r_msg2_main(subviews, "count"), 16);
                for (var j = 0; j < childCount; j++) {
                    if (found) break;
                    var child = r_msg2_main(subviews, "objectAtIndex:", j);
                    fastFindAndHide(child, depth + 1);
                }
            }
        }
        
        fastFindAndHide(homeWindow, 0);
        
        if (!found) {
            log("[SearchPill-JS] Could not find the AccessoryView.");
        }
    }
}
