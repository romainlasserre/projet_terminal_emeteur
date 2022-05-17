def on_button_pressed_a():
    global led2
    if led2 == 4:
        led2 = 0
    elif led2 == 0:
        led2 = 4
input.on_button_pressed(Button.A, on_button_pressed_a)

dif = 0
_new = 0
old = 0
led2 = 0
radio.set_group(23)
led2 = 0

def on_forever():
    global old, _new, dif
    old = input.acceleration(Dimension.Y)
    basic.pause(20)
    _new = input.acceleration(Dimension.Y)
    dif = _new - old
    if dif >= 500 or dif <= -500:
        radio.send_value("frainage", 2)
    elif input.rotation(Rotation.ROLL) >= 35 and input.rotation(Rotation.ROLL) <= 145:
        radio.send_value("gauche", 1)
    elif input.rotation(Rotation.ROLL) <= -35 and input.rotation(Rotation.ROLL) >= -145:
        radio.send_value("droite", 3)
    else:
        radio.send_value("led", led2)
basic.forever(on_forever)
