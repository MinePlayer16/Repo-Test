// @param: switch | enableBlinker | Enable Test Blinker | true

log("Test Blinker: Running script...");

if (typeof enableBlinker !== 'undefined' && enableBlinker === true) {
    var isRed = true;
    
    // Dock
    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    var dockList = r_msg2(mgr, "dockListView");
    
    if (dockList === "0x0") { dockList = r_msg2(ctrl, "dockListView"); }
    var dockView = r_msg2(dockList, "superview");
    if (dockView === "0x0") { dockView = dockList; }
    
    var bgView = r_msg2(dockView, "backgroundView");
    
    if (bgView !== "0x0") {
        log("Test Blinker: Dock found, allocating colors...");
        
        var ciColorCls = r_class("CIColor");
        var uiColorCls = r_class("UIColor");
        
        //red
        var strRed = r_nsstr("1.0 0.0 0.0 1.0");
        var ciRed = r_msg2(ciColorCls, "colorWithString:", strRed);
        var colorRed = r_msg2(uiColorCls, "colorWithCIColor:", ciRed);
        r_msg2(colorRed, "retain"); // MAGIA: Lo proteggiamo dal Garbage Collector!
        r_msg2(strRed, "release");  // Puliamo la stringa che non ci serve più
        
        //blue
        var strBlue = r_nsstr("0.0 0.0 1.0 1.0");
        var ciBlue = r_msg2(ciColorCls, "colorWithString:", strBlue);
        var colorBlue = r_msg2(uiColorCls, "colorWithCIColor:", ciBlue);
        r_msg2(colorBlue, "retain"); // MAGIA: Lo proteggiamo dal Garbage Collector!
        r_msg2(strBlue, "release");  // Puliamo la stringa
        
        log("Test Blinker: running polling loop...");
        
        //loop
        setInterval(function() {
            var colorToApply = isRed ? colorRed : colorBlue;
            
            r_msg2_main(bgView, "setHidden:", 0);
            r_msg2_main(bgView, "setBackgroundColor:", colorToApply);
            
            log("Test Blinker: Tick. Color changed to " + (isRed ? "Red" : "Blue"));
            
            isRed = !isRed;
            
        }, 2000); 
        
    } else {
        log("Test Blinker: Error, dock not found.");
    }
}
