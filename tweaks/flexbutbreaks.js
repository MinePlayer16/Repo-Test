// @param: switch | enableMicroFlex | Abilita MicroFLEX JS | true

log("MicroFLEX JS: Initializing...");

if (typeof enableMicroFlex !== 'undefined' && enableMicroFlex === true) {

    // 1. Stato Globale Persistente
    var listScrollView = "0x0";
    var stateStoreView = "0x0";
    
    // Il nostro dizionario intelligente: Mappa "Indirizzo Bottone" -> "Indirizzo Target View"
    var flexNodes = {}; 

    // 2. Funzione Core: Estrazione Gerarchia
    function drillDownIntoView(parentView) {
        log("MicroFLEX: Drilling down into " + parentView);

        var subviews = r_msg2_main(parentView, "subviews");
        var count = parseInt(r_msg2_main(subviews, "count")); 

        for (var i = 0; i < count; i++) {
            var child = r_msg2_main(subviews, "objectAtIndex:", i);

            // Creazione Bottone
            var btnClass = r_class("UIButton");
            var btn = r_msg2_main(r_msg2_main(btnClass, "alloc"), "init");

            // Magia JS: Prendiamo il puntatore NSString e lo diamo in pasto al bottone
            var childClass = r_msg2_main(child, "class");
            var clsNameNsStr = r_msg2_main(childClass, "description");
            r_msg2_main(btn, "setTitle:forState:", clsNameNsStr, 0);

            var colorCls = r_class("UIColor");
            r_msg2_main(btn, "setTitleColor:forState:", r_msg2_main(colorCls, "blackColor"), 0);

            // ROP HACK: Il target action (64 = UIControlEventTouchUpInside)
            r_msg2_main(btn, "addTarget:action:forControlEvents:", stateStoreView, "setTag:", 64);

            // Salvataggio istantaneo nel dizionario
            flexNodes[btn] = child;
        }
        log("MicroFLEX: Mappati " + count + " subviews.");
    }

    // 3. Setup Virtuale
    function setupUI() {
        var uiViewCls = r_class("UIView");
        stateStoreView = r_msg2_main(r_msg2_main(uiViewCls, "alloc"), "init");
        
        var app = r_msg2_main(r_class("UIApplication"), "sharedApplication");
        var keyWindow = r_msg2_main(app, "keyWindow");
        
        if (keyWindow !== "0x0") {
            drillDownIntoView(keyWindow);
        }
    }

    setupUI();

    // ==========================================================
    // IL CUORE DELLA PERSISTENZA: Polling Asincrono GCD
    // ==========================================================
    var tickInterval = setInterval(function() {
        if (stateStoreView !== "0x0") {
            
            // Leggiamo il tag per vedere se il ROP hack ha catturato un tocco UI
            var pressedButtonPtr = r_msg2_main(stateStoreView, "tag");
            
            if (pressedButtonPtr !== "0x0") {
                log("MicroFLEX: Tocco intercettato! ID Bottone: " + pressedButtonPtr);
                
                // Resettiamo lo stato per evitare loop infiniti
                r_msg2_main(stateStoreView, "setTag:", 0);
                
                // O(1) Lookup nel nostro dizionario JS
                var targetView = flexNodes[pressedButtonPtr];
                if (targetView) {
                    drillDownIntoView(targetView);
                }
            }
        }
    }, 150); // Gira a ~6FPS in background, impatto zero sulla SpringBoard

    log("MicroFLEX JS: Polling loop avviato con successo.");
}
