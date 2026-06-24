log("[StatusBar] Cerco la ForegroundView per iniettare 'Ciao'...");

var parentCls = r_class("STUIStatusBarForegroundView");
var childCls = r_class("STUIStatusBarStringView");

// --- FASE 2: Cerca il testo SOLO dentro la scatola trovata ---
function changeTextToCiao(view, depth) {
    if (view === "0x0" || depth > 5) return; // Profondità bassa, la scatola è piccola!

    if (r_msg2_main(view, "class") === childCls) {
        // Leggiamo il testo attuale
        var currentText = r_msg2_main(view, "text");
        
        // ATTENZIONE: Modifichiamo solo se NON è già "Ciao". 
        // Questo evita che il JS impazzisca e lo scriva 60 volte al secondo!
        var isAlreadyCiao = parseInt(r_msg2_main(currentText, "isEqualToString:", r_nsstr("Ciao")));
        
        if (isAlreadyCiao === 0) {
            r_msg2_main(view, "setText:", r_nsstr("Ciao"));
            log("[StatusBar-Hacker] Testo orologio modificato in Ciao!");
        }
        return; // Abbiamo finito con questa vista
    }

    var subs = r_msg2_main(view, "subviews");
    if (subs !== "0x0") {
        var c = parseInt(r_msg2_main(subs, "count"));
        for (var i = 0; i < c; i++) {
            changeTextToCiao(r_msg2_main(subs, "objectAtIndex:", i), depth + 1);
        }
    }
}

// --- FASE 1: Trova il contenitore principale (ForegroundView) ---
function findForegroundBox(view, depth) {
    if (view === "0x0" || depth > 15) return;

    // Se troviamo la scatola principale...
    if (r_msg2_main(view, "class") === parentCls) {
        // ...lanciamo la seconda funzione esploratrice SOLO qui dentro!
        changeTextToCiao(view, 0);
        return; // Inutile cercare altre ForegroundView in questo ramo
    }

    var subs = r_msg2_main(view, "subviews");
    if (subs !== "0x0") {
        var c = parseInt(r_msg2_main(subs, "count"));
        for (var i = 0; i < c; i++) {
            findForegroundBox(r_msg2_main(subs, "objectAtIndex:", i), depth + 1);
        }
    }
}

// --- LOOP DI CONTROLLO ---
setInterval(function() {
    var sharedApp = r_msg2_main(r_class("UIApplication"), "sharedApplication");
    var windows = r_msg2_main(sharedApp, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"));

    for (var i = 0; i < winCount; i++) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        if (parseInt(r_msg2_main(win, "isHidden")) === 0) {
            // Avviamo la ricerca del contenitore partendo dalla finestra
            findForegroundBox(win, 0);
        }
    }
}, 1000); // Controlla ogni secondo nel caso iOS rimetta l'ora
