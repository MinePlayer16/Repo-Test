log("[Dump-Views] 5s Timer: Load the views you need...");

setTimeout(function() {
    log("[Dump-Views] Generating dump...");

    var appCls = r_class("UIApplication");
    var sharedApp = r_msg2_main(appCls, "sharedApplication");
    var windows = r_msg2_main(sharedApp, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"));

    var mutStrCls = r_class("NSMutableString");
    var fullDump = r_msg2_main(mutStrCls, "string");
    var foundCount = 0;

    // gather data
    for (var i = winCount - 1; i >= 0; i--) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        if (parseInt(r_msg2_main(win, "isHidden")) === 0) {
            var dumpStr = r_msg2_main(win, "recursiveDescription");
            if (dumpStr !== "0x0") {
                r_msg2_main(fullDump, "appendString:", r_nsstr("==========================================\n"));
                r_msg2_main(fullDump, "appendString:", r_nsstr("WINDOW " + i + "\n"));
                r_msg2_main(fullDump, "appendString:", r_nsstr("==========================================\n"));
                r_msg2_main(fullDump, "appendString:", dumpStr);
                r_msg2_main(fullDump, "appendString:", r_nsstr("\n\n"));
                foundCount++;
            }
        }
    }

    if (foundCount > 0) {
        // saves file to /tmp/
        var timestamp = Math.floor(Date.now() / 1000);
        var fileName = "UITreeDump_" + timestamp + ".txt";
        var pathStr = r_nsstr("/tmp/" + fileName);

        var result = r_msg2_main(fullDump, "writeToFile:atomically:encoding:error:", pathStr, 1, 4, "0x0");

        if (parseInt(result) !== 0) {
            log("[Dump-Views] File created in /tmp! Opening share menu...");
            var urlCls = r_class("NSURL");
            var fileUrl = r_msg2_main(urlCls, "fileURLWithPath:", pathStr);
            var arrayCls = r_class("NSArray");
            var itemsArray = r_msg2_main(arrayCls, "arrayWithObject:", fileUrl);

            // share menu
            var activityVCCls = r_class("UIActivityViewController");
            var activityVC = r_msg2_main(activityVCCls, "alloc");
            activityVC = r_msg2_main(activityVC, "initWithActivityItems:applicationActivities:", itemsArray, "0x0");

            // finding active ViewController
            var rootVC = "0x0";
            var keyWin = r_msg2_main(sharedApp, "keyWindow");
            
            if (keyWin !== "0x0") {
                rootVC = r_msg2_main(keyWin, "rootViewController");
            }

            if (rootVC !== "0x0") {
                r_msg2_main(rootVC, "presentViewController:animated:completion:", activityVC, 1, "0x0");
            } else {
                log("[Dump-Views] ERROR: No active ViewController found to open share menu.");
            }

        } else {
            log("[Dump-Views] ERROR: Impossible to save in /tmp/");
        }
    } else {
        log("[Dump-Views] ERROR: No visible view found.");
    }
}, 5000);
