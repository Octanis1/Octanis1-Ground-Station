import time
from pymavlink.dialects.v10 import common as mavlink
import pymavlink.mavutil as mavutil
import socket
import base64
import ast
import sys 
import binascii

class fifo(object):
    def __init__(self):
        self.buf = []
    def write(self, data):
        self.buf += data
        return len(data)
    def read(self):
        return self.buf.pop(0)
  
# we will use a fifo as an encode/decode buffer
f = fifo()
# create a mavlink instance, which will do IO on file object 'f'
mav = mavlink.MAVLink(f)

def encodeBase64(data):
	return base64.b64encode(data)

def encodeData(data):
	data64=encodeBase64(data)
	return data64

def publishMQTT_gps_raw_int(obs_time=0,fix_type=4,lat=0,lon=0,alt=0):
   mav = mavlink.MAVLink(f)
	#gps_raw_int_encode(usec, fix_type, lat, lon, alt, eph, epv, v, hdg)
   m = mav.gps_raw_int_encode(0,obs_time,fix_type,lat,lon,alt,0,0,0,0)
   m.pack(mav)
   data = m.get_msgbuf()
   print(data)
   dataEncode = encodeData(data)
   print(dataEncode)

for x in range(30):
   for y in range(30):
      publishMQTT_gps_raw_int(lat=x,lon=y+30*x,alt=1)
