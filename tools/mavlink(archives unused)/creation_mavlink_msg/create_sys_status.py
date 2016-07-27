# def raw_pressure_encode(self, usec, press_abs, press_diff1, press_diff2, temperature)
# def sys_status_encode(self, mode, nav_mode, status, load, vbat, battery_remaining, packet_drop):

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

def sys_status_rawToHex(data):
   data=str(data)
   data=[format(ord(x),'x') for x in data] 
   data="".join(data)
   print(data)
   return data

def raw_pressure_rawToHex(data):
   data=[format(ord(x),'x') for x in data] 
   data="".join(data)
   print(data)
   return data

def create_sys_status(mode=1, nav_mode=1, status=1, load=10, vbat=100, battery_remaining=-1, packet_drop=0, error_cm=0, error_c1=0, error_c2=0, error_c3=0, error_c4=0):
   mav = mavlink.MAVLink(f)
	# def sys_status_encode(self, mode, nav_mode, status, load, vbat, battery_remaining, packet_drop) 1 vbat = 1 mv, 1 vbat = 10 mA
   m = mav.sys_status_encode(0,mode, nav_mode, status, load, vbat, battery_remaining, packet_drop,error_cm, error_c1, error_c2, error_c3, error_c4)
   print(m)
   m.pack(mav)
   data = m.get_msgbuf()
   print(data)
   data_sys = sys_status_rawToHex(data)
   return data_sys

create_sys_status(mode=1, nav_mode=1, status=1, load=10000, vbat=15, battery_remaining=15, packet_drop=1, error_cm=1, error_c1=1, error_c2=1, error_c3=1, error_c4=1)
