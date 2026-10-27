// STEM Education – δέκτης πίνακα τάξης / class dashboard receiver
// Μένει συνδεδεμένο με USB στον υπολογιστή του εκπαιδευτικού. Χρειάζεται μόνο το radio (χωρίς bluetooth).
// Stays plugged into the teacher's computer by USB. Needs radio only (no bluetooth).
radio.setGroup(77)
serial.setBaudRate(BaudRate.BaudRate115200)
basic.showLeds(`
    . . # . .
    . # . # .
    # . # . #
    . . . . .
    . . # . .
    `)
radio.onReceivedValue(function (name, value) {
    serial.writeLine(name + "," + value + "," + radio.receivedPacket(RadioPacketProperty.SignalStrength))
    led.toggle(2, 4) // αναβοσβήνει σε κάθε μήνυμα / blinks on every message
})
