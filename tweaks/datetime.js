log("[Datetime Tweak] Running...");

var stringViewCls = r_class("STUIStatusBarStringView");

function injectDate(view, depth) {
    if (view === "0x0" || depth > 15) return;

    if (r_msg2_main(view, "class") === stringViewCls) {
        var nsText = r_msg2_main(view, "text");
        
        if (nsText !== "0x0") {
            //checking if it's the time ":"
            var hasColon = parseInt(r_msg2_main(nsText, "containsString:", r_nsstr(":")));
            
            //checking if it's already applied "\n"
            var hasNewline = parseInt(r_msg2_main(nsText, "containsString:", r_nsstr("\n")));

            if (hasColon === 1 && hasNewline === 0) {
                
                //generate time and date
                var d = new Date();
                var timeStr = d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                var dateStr = d.getDate() + "/" + (d.getMonth() + 1); // Formato es: 24/6
                
                var customText = timeStr + "\n" + dateStr;
                
                r_msg2_main(view, "setNumberOfLines:", 2);
                r_msg2_main(view, "setTextAlignment:", 1); // Allineamento al centro
                
                //reduce font size
                var currentFont = r_msg2_main(view, "font");
                if (currentFont !== "0x0") {
                    var smallFont = r_msg2_main(currentFont, "fontWithSize:", 10);
                    r_msg2_main(view, "setFont:", smallFont);
                }
                
                r_msg2_main(view, "setText:", r_nsstr(customText));
                r_msg2_main(view, "sizeToFit");
            }
        }
    }
    var subs = r_msg2_main(view, "subviews");
    if (subs !== "0x0") {
        var c = parseInt(r_msg2_main(subs, "count"));
        for (var i = 0; i < c; i++) {
            injectDate(r_msg2_main(subs, "objectAtIndex:", i), depth + 1);
        }
    }
}

setInterval(function() {
    var sharedApp = r_msg2_main(r_class("UIApplication"), "sharedApplication");
    var windows = r_msg2_main(sharedApp, "windows");
    var winCount = parseInt(r_msg2_main(windows, "count"));

    for (var i = 0; i < winCount; i++) {
        var win = r_msg2_main(windows, "objectAtIndex:", i);
        if (parseInt(r_msg2_main(win, "isHidden")) === 0) {
            injectDate(win, 0);
        }
    }
}, 1000);
