# Stepper Motor

## Identify the Polarization

### LED Method
If you do not have a datasheet indicating which wire is positive or negative, you can use a simple method with an LED (Light Emitting Diode).
An LED will only light up when current flows in the correct direction.

Materials Needed:
* An LED.
* A resistor (to limit current, if needed).
* A DC power supply (low voltage, like 5V or less).

Procedure:
1) Connect the LED in series with a resistor (if needed) and one pair of wires (for example, Black and Green).
2) Momentarily connect the pair to a low-voltage DC power source. Ensure to do this briefly to avoid damaging the motor winding.
3) Observe the LED:
If the LED lights up, note which direction it was connected (i.e., which wire was connected to the positive terminal of the power supply).
The wire connected to the positive terminal of the power supply will be the positive end of the coil for that pair.
Repeat this process for the other pair (Red and Blue).

### Stepper Motor Driver Method
Some stepper motor drivers are able to auto-detect the proper coil polarity based on how the motor is wired to them. Simply wire the motor to the driver and run a test to see if the motor turns correctly in the desired direction.
If the motor moves in the wrong direction, reverse one pair of wires (e.g., swap Black with Green) to reverse the direction of the current through one coil.

### Manual Spin Method
Another simple way to determine the polarization is to manually turn the motor shaft with one pair of coils shorted and observe resistance.
When one coil is shorted (e.g., connect Black and Green together), and you turn the motor shaft manually, you'll feel more resistance due to the electromagnetic braking effect.
This won’t tell you exact polarity but will confirm correct pairs and that the motor is generating a magnetic field.