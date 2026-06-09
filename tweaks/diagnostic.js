var subs = r_msg2(first, "subviews");

if (subs != 0)
    log("Got subviews");

var count = r_msg2(subs, "count");

log("Subviews = " + count);
