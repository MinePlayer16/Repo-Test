// matrix_lock.js

log("Matrix Lock Started");

var chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function spawnCharacter() {

    var label = createLabel();

    var c =
        chars[
            Math.floor(
                Math.random() * chars.length
            )
        ];

    r_msg2_main(label, "setText:", c);

    r_msg2_main(
        label,
        "setTextColor:",
        UIColor_green()
    );

    addToLockScreen(label);

    animateMatrixFall(label);
}

setInterval(spawnCharacter, 50);
