// @param: switch | enableBlinker | Enable Test Blinker | true
// @param: slider | dockAlpha | Trasparenza Dock | 0.5 | 0.0-1.0

log("Test Blinker: Script avviato, generazione sicura...");

if (typeof enableBlinker !== 'undefined' && enableBlinker === true) {
    var isRed = true;
    
    // 1. Troviamo il Dock
    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    var dockList = r_msg2(mgr, "dockListView");
    
    if (dockList === "0x0") { dockList = r_msg2(ctrl, "dockListView"); }
    var dockView = r_msg2(dockList, "superview");
    if (dockView === "0x0") { dockView = dockList; }
    
    var bgView = r_msg2(dockView, "backgroundView");
    
    if (bgView !== "0x0") {
        log("Test Blinker: Dock agganciato! Alloco i colori in memoria fissa...");
        
        var ciColorCls = r_class("CIColor");
        var uiColorCls = r_class("UIColor");
        
        // --- CREAZIONE COLORE ROSSO ---
        var strRed = r_nsstr("1.0 0.0 0.0 1.0");
        var ciRed = r_msg2(ciColorCls, "colorWithString:", strRed);
        var colorRed = r_msg2(uiColorCls, "colorWithCIColor:", ciRed);
        r_msg2(colorRed, "retain"); // MAGIA: Lo proteggiamo dal Garbage Collector!
        r_msg2(strRed, "release");  // Puliamo la stringa che non ci serve più
        
        // --- CREAZIONE COLORE BLU ---
        var strBlue = r_nsstr("0.0 0.0 1.0 1.0");
        var ciBlue = r_msg2(ciColorCls, "colorWithString:", strBlue);
        var colorBlue = r_msg2(uiColorCls, "colorWithCIColor:", ciBlue);
        r_msg2(colorBlue, "retain"); // MAGIA: Lo proteggiamo dal Garbage Collector!
        r_msg2(strBlue, "release");  // Puliamo la stringa
        
        log("Test Blinker: Avvio Polling Loop Ottimizzato...");
        
        // 2. IL LOOP PERFETTO (Zero allocazioni di memoria)
        setInterval(function() {
            var colorToApply = isRed ? colorRed : colorBlue;
            
            r_msg2_main(bgView, "setHidden:", 0);
            r_msg2_main(bgView, "setBackgroundColor:", colorToApply);
            
            log("Test Blinker: Tick eseguito. Colore cambiato in " + (isRed ? "Rosso" : "Blu"));
            
            isRed = !isRed;
            
        }, 2000); 
        
    } else {
        log("Test Blinker: Errore, Dock non trovato.");
    }
}
