input.onButtonPressed(Button.A, function () {
    if (led2 == 4) {
        led2 = 0
    } else if (led2 == 0) {
        led2 = 4
    }
    radio.sendValue("led", led2)
})
input.onButtonPressed(Button.AB, function () {
    if (warn == 5) {
        warn = 6
    } else if (warn == 6) {
        warn = 5
    }
})
let dif = 0
let _new = 0
let old = 0
let warn = 0
let led2 = 0
radio.setGroup(23)
led2 = 0
warn = 6
basic.forever(function () {
    old = input.acceleration(Dimension.Y)
    basic.pause(20)
    _new = input.acceleration(Dimension.Y)
    dif = _new - old
    if (dif >= 500 || dif <= -500) {
        radio.sendValue("frainage", 2)
    } else {
        radio.sendValue("rien", 10)
    }
    basic.pause(100)
})
basic.forever(function () {
    if (input.rotation(Rotation.Roll) >= 35 && input.rotation(Rotation.Roll) <= 145) {
        radio.sendValue("gauche", 1)
    } else if (input.rotation(Rotation.Roll) <= -35 && input.rotation(Rotation.Roll) >= -145) {
        radio.sendValue("droite", 3)
    } else if (warn == 5) {
        radio.sendValue("warning", 5)
    } else {
        radio.sendValue("rien", 10)
    }
    basic.pause(100)
})
