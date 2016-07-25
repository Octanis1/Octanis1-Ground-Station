import time
import sys 

def binToHex(bits):
  hexString=""
  for i in range(int(len(bits)/4)):
    tmp=hex(int(bits[i*4:i*4+4],2))
    hexString+=tmp[2:]
  return hexString

def intToBin(nombre,taille):
  nombreBin=bin(nombre)
  nombreBin=nombreBin[2:]
  nombreBin=(taille*8-len(nombreBin))*"0"+nombreBin
  return nombreBin
 
def mavlinkMsg(fix,lat,lon,alt): 
  header="111111100001111000000001100000000001100000000000"
  obs_time="0000000000000000"
  fix=intToBin(fix,1)
  lat=intToBin(lat,2)
  lon=intToBin(lon,2)  
  alt=intToBin(alt,2)
  end="000000000000000000000000000000000000000011111111111111111"
  msg=header+obs_time+fix+lat+lon+alt+end
  msg=binToHex(msg)
  return msg

j=1
for i in range(50):
   print(mavlinkMsg(4,0,i,1))
longitude=i
for i in range(50):
   print(mavlinkMsg(4,i,longitude,1))
latitude=i
for i in range(50):
   print(mavlinkMsg(4,latitude,longitude+i,1+i))
longitude=longitude+i
altitude=1+i
for i in range(50):
   print(mavlinkMsg(4,latitude+i,longitude,altitude))
latitude = latitude+i
for i in range(50):
   print(mavlinkMsg(4,latitude,longitude+i,altitude))
