// @param: switch | enableBlinker | Enable Test Blinker | true

log("Test Blinker: Script avviato...");

if (typeof enableBlinker !== 'undefined' && enableBlinker === true) {
    var isRed = true;
    
    // 1. Troviamo la backgroundView del Dock
    var cls = r_class("SBIconController");
    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    var dockList = r_msg2(mgr, "dockListView");
    
    if (dockList === "0x0") { dockList = r_msg2(ctrl, "dockListView"); }
    var dockView = r_msg2(dockList, "superview");
    if (dockView === "0x0") { dockView = dockList; }
    
    var bgView = r_msg2(dockView, "backgroundView");
    
    if (bgView !== "0x0") {
        log("Test Blinker: Dock agganciato! Avvio Polling Rate (2000ms)...");
        
        // 2. IL TEST DEL POLLING RATE
        setInterval(function() {
            // Scegliamo la stringa del colore (R G B A)
            var colorString = isRed ? "1.0 0.0 0.0 1.0" : "0.0 0.0 1.0 1.0"; 
            
            // Usiamo la nuova API r_nsstr per evitare i float!
            var remoteStr = r_nsstr(colorString);
            var ciColorObj = r_msg2(r_class("CIColor"), "colorWithString:", remoteStr);
            var finalColorPtr = r_msg2(r_class("UIColor"), "colorWithCIColor:", ciColorObj);
            
            // Pulizia memoria della stringa
            r_msg2(remoteStr, "release"); 
            
            // 3. Applichiamo la modifica visiva sul Main Thread
            r_msg2_main(bgView, "setHidden:", 0);
            r_msg2_main(bgView, "setBackgroundColor:", finalColorPtr);
            
            log("Test Blinker: Tick eseguito. Colore cambiato in " + (isRed ? "Rosso" : "Blu"));
            
            // Invertiamo lo stato per il prossimo ciclo
            isRed = !isRed;
            
        }, 2000); // 2000 millisecondi = 2 secondi
        
    } else {
        log("Test Blinker: Errore, Dock non trovato.");
    }
}
