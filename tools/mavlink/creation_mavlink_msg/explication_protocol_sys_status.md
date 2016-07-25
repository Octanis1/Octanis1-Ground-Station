Explication of the protocol Mavlink for the SYS_STATUS messages :
=================================================================

# Conclusion of the observations :

we want the voltage_battery, current_battery and battery_remaining
current_battery = bytes 11(2nd part) 12(1st part) = hex number 22 and 23
current_battery = bytes 12(2nd part) 13(1st part) = hex number 24 and 25
battery_remaining = bytes 19(2nd part) 20(1st part) = hex number 38 and 39
