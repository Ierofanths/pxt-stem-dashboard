/**
 * Αισθητήρες του πίνακα τάξης
 */
enum DashSensor {
    //% block="temperature (°C)"
    Temperature = 0,
    //% block="humidity (%)"
    Humidity = 1,
    //% block="light (0-100)"
    Light = 2,
    //% block="UV"
    UV = 3,
    //% block="soil moisture (0-100)"
    Soil = 4,
    //% block="water level (0-100)"
    Water = 5
}

/**
 * STEM Education – class dashboard.
 * Each station sends its values by radio to a receiver micro:bit on the teacher's computer.
 */
//% weight=90 color="#0E9F6E" icon="\uf080" block="Dashboard"
namespace dashboard {
    const GROUP = 77
    const KEYS = ["temp", "hum", "light", "uv", "soil", "water"]
    let station = 0

    /**
     * Set the number of this station (1-9) and start the radio for the class dashboard.
     * @param n station number, eg: 1
     */
    //% blockId=dashboard_station block="dashboard: this is station %n"
    //% n.min=1 n.max=9 n.defl=1
    //% weight=100
    export function setStation(n: number): void {
        station = Math.max(1, Math.min(9, Math.round(n)))
        radio.setGroup(GROUP)
        radio.setTransmitPower(7)
    }

    /**
     * Send a sensor value to the class dashboard.
     */
    //% blockId=dashboard_send block="send to dashboard %sensor = %value"
    //% weight=90
    export function send(sensor: DashSensor, value: number): void {
        sendNamed(KEYS[sensor], value)
    }

    /**
     * Send any value with your own short name (up to 6 Latin letters, e.g. noise, wind).
     * @param name short name, eg: "noise"
     */
    //% blockId=dashboard_send_named block="send to dashboard named %name = %value"
    //% weight=80
    export function sendNamed(name: string, value: number): void {
        if (station == 0) setStation(1)
        radio.sendValue(station + ":" + name.substr(0, 6), value)
        basic.pause(20) // short gap so consecutive values don't collide
    }
}
