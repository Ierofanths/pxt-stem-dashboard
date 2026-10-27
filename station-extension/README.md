# STEM Dashboard (micro:bit)

Στέλνει τιμές αισθητήρων με radio (ομάδα 77) στον **πίνακα τάξης** της STEM Education.
Ένα micro:bit-δέκτης στον υπολογιστή του εκπαιδευτικού τις περνά στο TurboWarp.

Sends sensor values by radio (group 77) to the STEM Education **class dashboard**.

```blocks
dashboard.setStation(1)
basic.forever(function () {
    dashboard.send(DashSensor.Temperature, input.temperature())
    basic.pause(2000)
})
```

Μορφή μηνύματος / message format: `radio.sendValue("<station>:<name>", value)`.
