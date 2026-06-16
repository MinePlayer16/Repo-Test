// @param: color | dockColor | Dock Color | #FF0000

log("JS Engine: Starting Color Dock Tweak...");

// SISTEMA DI SICUREZZA: Controlla se Cyanide ha iniettato 'dockColor'
// Se non esiste (undefined), usa il rosso di default.
var safeColor = (typeof dockColor !== 'undefined' && dockColor !== "") ? dockColor : "#FF0000";

// Usiamo safeColor invece della variabile diretta
var hex = safeColor.replace('#', '');
var r = parseInt(hex.substring(0, 2), 16) / 255.0;
var g = parseInt(hex.substring(2, 4), 16) / 255.0;
var b = parseInt(hex.substring(4, 6), 16) / 255.0;

var cls = r_class("SBIconController");
if (cls !== "0x0") {
    var ctrl = r_msg2(cls, "sharedInstance");
    var mgr = r_msg2(ctrl, "iconManager");
    
    var dockList = r_msg2(mgr, "dockListView");
    if (dockList === "0x0") {
        dockList = r_msg2(ctrl, "dockListView");
    }
    
    var dockView = r_msg2(dockList, "superview");
    if (dockView === "0x0") {
        dockView = dockList;
    }

    var bgView = r_msg2(dockView, "backgroundView");
    if (bgView !== "0x0") {
        var colorCls = r_class("UIColor");
        
        // 2. Generiamo il UIColor nativo usando il nostro eccezionale bridge float
        var customColorPtr = r_msg2_float(colorCls, "colorWithRed:green:blue:alpha:", r, g, b, 1.0);
        
        if (customColorPtr !== "0x0") {
            // 3. Applichiamo il colore scelto dall'utente tramite la UI di Cyanide
            r_msg2_main(bgView, "setHidden:", 0);
            r_msg2_main(bgView, "setBackgroundColor:", customColorPtr);
            
            log("[Dock-JS] Success! Dock has been colored!.");
        } else {
            log("[Dock-JS] Error: Could not create UIColor pointer.");
        }
    }
}
