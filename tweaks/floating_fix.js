// floating_icons_tracer.js
// @param: slider | floatY | Vertical Float | 12.0 | 0.0-30.0
// @param: slider | floatX | Horizontal Float | 5.0 | 0.0-20.0
// @param: slider | floatRot | Rotation | 0.035 | 0.0-0.1
// @param: slider | minScale | Min Scale | 0.98 | 0.8-1.0

(function () {
    "use strict";

    var VERSION = "1.0.0-TRACER";
    say("[DEBUG-TRACER] Avvio script v" + VERSION + "...");

    function say(msg) {
        try { if (typeof log === "function") { log(String(msg)); return; } } catch (_) {}
        try { if (typeof console !== "undefined" && console.log) console.log(String(msg)); } catch (_) {}
    }

    function isPtr(v) {
        if (v === null || v === undefined) return false;
        if (typeof v === "number") return v !== 0;
        if (typeof v === "string") return v !== "" && v !== "0" && v !== "0x0";
        return true;
    }

    function cls(name) { try { return r_class(name); } catch (_) { return 0; } }
    function msg(obj, sel, a1, a2, a3, a4) { if (!isPtr(obj)) return 0; try { return r_msg2(obj, sel, a1 || 0, a2 || 0, a3 || 0, a4 || 0); } catch (_) { return 0; } }
    function msgMain(obj, sel, a1, a2, a3, a4) { if (!isPtr(obj)) return 0; try { return r_msg2_main(obj, sel, a1 || 0, a2 || 0, a3 || 0, a4 || 0); } catch (_) { return 0; } }
    function ns(str) { try { return r_nsstr(String(str)); } catch (_) { return 0; } }
    function truthy(v) {
        if (typeof v === "number") return v !== 0;
        if (typeof v === "string") return v !== "" && v !== "0" && v !== "0x0";
        return !!v;
    }
    
    function responds(obj, sel) { 
        say("[DEBUG-TRACER] Controllo respondsToSelector per: " + sel);
        if (!isPtr(obj)) return false; 
        try { 
            return typeof r_responds === "function" ? truthy(r_responds(obj, sel)) : true; 
        } catch (_) { 
            return false; 
        } 
    }
    
    function call(obj, sel, main, a1, a2, a3, a4) { 
        say("[DEBUG-TRACER] Eseguo call() per: " + sel);
        if (!isPtr(obj) || !responds(obj, sel)) {
            say("[DEBUG-TRACER] FALLITO o saltato call() per: " + sel);
            return 0; 
        }
        var res = main ? msgMain(obj, sel, a1, a2, a3, a4) : msg(obj, sel, a1, a2, a3, a4); 
        say("[DEBUG-TRACER] SUCCESSO call() per: " + sel + " -> " + String(res));
        return res;
    }

    function clampNumber(value, lo, hi, def) {
        var n = Number(value);
        if (!isFinite(n)) n = def;
        if (n < lo) n = lo;
        if (n > hi) n = hi;
        return n;
    }

    var curY = clampNumber((typeof floatY !== "undefined") ? floatY : 12.0, 0.0, 30.0, 12.0);
    var curX = clampNumber((typeof floatX !== "undefined") ? floatX : 5.0, 0.0, 20.0, 5.0);
    var curRot = clampNumber((typeof floatRot !== "undefined") ? floatRot : 0.035, 0.0, 0.1, 0.035);
    var curScale = clampNumber((typeof minScale !== "undefined") ? minScale : 0.98, 0.8, 1.0, 0.98);

    var animCls = cls("CABasicAnimation");
    var decCls = cls("NSDecimalNumber");

    function dec(value) {
        return msg(decCls, "decimalNumberWithString:", ns(String(value)));
    }

    function createAnim(keyPath, fromVal, toVal, duration) {
        var anim = msg(animCls, "animationWithKeyPath:", ns(keyPath));
        msg(anim, "setFromValue:", dec(fromVal));
        msg(anim, "setToValue:", dec(toVal));
        msg(anim, "setValue:forKey:", dec(duration), ns("duration"));
        msg(anim, "setValue:forKey:", dec("99999.0"), ns("repeatCount"));
        msg(anim, "setAutoreverses:", 1);
        msg(anim, "setRemovedOnCompletion:", 0);

        var tf = msg(cls("CAMediaTimingFunction"), "functionWithName:", ns("easeInEaseOut"));
        msg(anim, "setTimingFunction:", tf);
        return anim;
    }

    var animY = createAnim("transform.translation.y", (-curY).toString(), curY.toString(), "3.7");
    var animX = createAnim("transform.translation.x", (-curX).toString(), curX.toString(), "4.3");
    var animRot = createAnim("transform.rotation.z", (-curRot).toString(), curRot.toString(), "2.9");
    var animScale = createAnim("transform.scale", curScale.toString(), "1.0", "5.1");

    function iconManager() {
        say("[DEBUG-TRACER] Cerco SBIconController...");
        var ctrl = msg(cls("SBIconController"), "sharedInstance");
        say("[DEBUG-TRACER] Cerco iconManager...");
        return msg(ctrl, "iconManager");
    }

    function rootFolderView(mgr) {
        say("[DEBUG-TRACER] Dentro rootFolderView(), cerco rootFolderController...");
        var rootController = call(mgr, "rootFolderController", false);
        
        say("[DEBUG-TRACER] Cerco rootFolderView...");
        var rootView = call(rootController, "rootFolderView", true);
        
        say("[DEBUG-TRACER] Cerco rootFolderViewIfLoaded (se serve)...");
        if (!isPtr(rootView)) rootView = call(rootController, "rootFolderViewIfLoaded", true);
        
        say("[DEBUG-TRACER] Cerco folderView (se serve)...");
        if (!isPtr(rootView)) rootView = call(rootController, "folderView", true);
        
        return rootView;
    }

    function addTarget(targets, view, label) {
        if (!isPtr(view)) return;
        var key = String(view);
        for (var i = 0; i < targets.length; i++) if (String(targets[i].view) === key) return;
        targets.push({ view: view, label: label });
        say("[DEBUG-TRACER] Aggiunto target alla lista: " + label);
    }

    function applyAnimations(view, label) {
        if (!isPtr(view)) return false;
        var layer = msgMain(view, "layer");
        if (!isPtr(layer)) return false;
        var keys = ["FloatY", "FloatX", "FloatRot", "FloatScale"];
        for (var i = 0; i < keys.length; i++) msgMain(layer, "removeAnimationForKey:", ns(keys[i]));
        msgMain(layer, "addAnimation:forKey:", animY, ns("FloatY"));
        msgMain(layer, "addAnimation:forKey:", animX, ns("FloatX"));
        msgMain(layer, "addAnimation:forKey:", animRot, ns("FloatRot"));
        msgMain(layer, "addAnimation:forKey:", animScale, ns("FloatScale"));
        say("[Floating Icons] Animated " + label + ".");
        return true;
    }

    // --- ESECUZIONE PRINCIPALE ---
    
    say("[DEBUG-TRACER] --- FASE 1: Inizializzazione ---");
    var mgr = iconManager();
    say("[DEBUG-TRACER] mgr ottenuto: " + String(mgr));
    
    var rootView = rootFolderView(mgr);
    say("[DEBUG-TRACER] rootView ottenuto: " + String(rootView));
    
    var targets = [];

    say("[DEBUG-TRACER] --- FASE 2: Ricerca Bersagli ---");
    
    say("[DEBUG-TRACER] TENTATIVO 1: dockListView da mgr...");
    addTarget(targets, call(mgr, "dockListView", false), "dockListView");

    say("[DEBUG-TRACER] TENTATIVO 2: dockListView da rootView...");
    addTarget(targets, call(rootView, "dockListView", true), "rootFolderView.dockListView");

    say("[DEBUG-TRACER] TENTATIVO 3: scrollView da rootView...");
    addTarget(targets, call(rootView, "scrollView", true), "rootFolderView.scrollView");
    
    say("[DEBUG-TRACER] TENTATIVO 4: rootFolderController isolato...");
    var rootController = call(mgr, "rootFolderController", false);
    
    say("[DEBUG-TRACER] TENTATIVO 5: folderView isolata...");
    var folderView = call(rootController, "folderView", true);
    
    say("[DEBUG-TRACER] TENTATIVO 6: scrollView da folderView...");
    addTarget(targets, call(folderView, "scrollView", true), "folderView.scrollView");

    say("[DEBUG-TRACER] --- FASE 3: Applicazione Animazioni ---");
    var applied = 0;
    for (var i = 0; i < targets.length; i++) {
        say("[DEBUG-TRACER] Applico animazione a: " + targets[i].label);
        if (applyAnimations(targets[i].view, targets[i].label)) applied++;
    }

    say(applied > 0 ? "[Floating Icons] SUCCESS: applied animation to " + applied + " layer(s)." : "[Floating Icons] ERROR: no icon layers found.");
})();
