Explication by example of the protocol Mavlink for the GPS\_RAW\_INT messages :
=============================================================================

# Example 1 :
the mavlink message is fe1e000180180000040001000100010000000002e4b 
we have a fix\_type of 4 and lat, lon, alt = 1
In binary, we have :
11111110 00011110 00000001 10000000 00011000 00000000 00000000 00000000 00000100 00000000 00000001 00000000 00000001 00000000 00000001 00000000 00000000 00000000 00000000 00000010 11100100 00001011
Header = 6 bytes. The first byte is always 11111110. The second byte is the length of the payload (30 for a GPS\_RAW\_INT message).
observation time = 2 bytes (so we have obs time = 00000000 00000000)
fix = 1 byte (so we have fix = 00000100)
lat = 2 bytes (so we have lat = 00000000 00000001)
lon = 2 bytes (so we have lon = 00000000 00000001)
alt = 2 bytes (so we have alt = 00000000 00000001)

#Example 2 :
the mavlink message is fe1e00018018000004000f00010002000000000147c 
we have a fix\_type of 4 and lat = 15, lon = 1, alt = 2
In binary, we have :
11111110 00011110 00000001 10000000 00011000 00000000 00000000 00000000 00000100 00000000 00001111 00000000 00000001 00000000 00000010 00000000 00000000 00000000 00000000 00000001 01000111 00001100
Header = 6 bytes and doesn't change (it's the same as the first example)
fix = 1 byte (so we have fix = 00000100)
lat = 2 bytes (so we have lat = 00000000 00001111)
lon = 2 bytes (so we have lon = 00000000 00000001)
alt = 2 bytes (so we have alt = 00000000 00000010)

