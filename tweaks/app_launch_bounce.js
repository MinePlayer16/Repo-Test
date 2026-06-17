// @param: switch | enablePulse | Enable CyberPulse | true
// @param: color  | pulseColor  | Pulse Color | #00FFCC
// @param: slider | pulseAlpha  | Max Opacity | 0.4 | 0.1-1.0
// @param: slider | pulseSpeed  | Speed (ms) | 1000 | 200-3000
// @param: switch | enableHaptic| Haptic Heartbeat | true

log("[CyberPulse] Inizializzazione motore...");

// 1. Failsafe: Lettura sicura dei parametri JIT
var safeColor = (typeof pulseColor !== 'undefined' && pulseColor !== "") ? pulseColor : "#00FFCC";
var safeAlpha = (typeof pulseAlpha !== 'undefined') ? parseFloat(pulseAlpha) : 0.4;
var safeSpeed = (typeof pulseSpeed !== 'undefined') ? parseInt(pulseSpeed) : 1000;

if (typeof enablePulse !== 'undefined' && enablePulse === "false") {
    log("[CyberPulse] Tweak disabilitato dall'utente.");
} else {
    // 2. Troviamo la finestra principale di SpringBoard
    var app = r_msg2(r_class("UIApplication"), "sharedApplication");
    var keyWindow = r_msg2(app, "keyWindow");

    if (keyWindow === "0x0") {
        log("[CyberPulse] ERRORE: Impossibile trovare la UIWindow di SpringBoard.");
    } else {
        log("[CyberPulse] Finestra agganciata: " + keyWindow);

        // 3. Inizializziamo il Taptic Engine (Motore di vibrazione)
        var hapticGen = "0x0";
        if (typeof enableHaptic !== 'undefined' && enableHaptic === "true") {
            hapticGen = r_msg2(r_class("UIImpactFeedbackGenerator"), "alloc");
            hapticGen = r_msg2(hapticGen, "initWithStyle:", 1); // 1 = Impatto Medio
            log("[CyberPulse] Taptic Engine armato.");
        }

        // Estrazione RGB dall'esadecimale (necessario per CIColor)
        var hex = safeColor.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16) / 255.0;
        var g = parseInt(hex.substring(2, 4), 16) / 255.0;
        var b = parseInt(hex.substring(4, 6), 16) / 255.0;

        // 4. Il Loop di Background (Multithreading)
        var toggleState = false;
        
        var timerId = setInterval(function() {
            toggleState = !toggleState;

            // Calcola l'opacità per l'effetto pulsazione (High/Low)
            var currentAlpha = toggleState ? safeAlpha : (safeAlpha * 0.2);
            var colorString = r + " " + g + " " + b + " " + currentAlpha;

            // Allocazione sicura in memoria della stringa
            var remoteStr = r_nsstr(colorString);
            
            // Creazione colore nativo
            var ciColor = r_msg2(r_class("CIColor"), "colorWithString:", remoteStr);
            var uiColor = r_msg2(r_class("UIColor"), "colorWithCIColor:", ciColor);

            // APPLICAZIONE GRAFICA (Strettamente sul Main Thread!)
            r_msg2_main(keyWindow, "setBackgroundColor:", uiColor);

            // Pulizia della RAM: distruggiamo la stringa allocata
            r_msg2(remoteStr, "release");

            // Esecuzione Feedback Aptico
            if (hapticGen !== "0x0") {
                r_msg2_main(hapticGen, "prepare");
                r_msg2_main(hapticGen, "impactOccurred");
            }

            log("[CyberPulse] Battito eseguito. (Alpha: " + currentAlpha.toFixed(2) + ")");

        }, safeSpeed);

        log("[CyberPulse] Motore avviato con successo. TimerID: " + timerId);
    }
}
