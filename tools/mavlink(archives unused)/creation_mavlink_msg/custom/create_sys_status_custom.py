import time
import sys 
import math

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
 
def mavlinkMsg(v=1,a=1,bat=100): 
  header="111111100001111100000000000000010000000100000001"
  other1="000100000000000000010000000000000001"
  vBin=intToBin(v,1)
  aBin=intToBin(a,1)
  other2="000000010000000100000001000000010000000100000001"
  batBin=intToBin(bat,1)
  end="00011110110000001101"
  msg=header+other1+vBin+aBin+other2+batBin+end
  msg=binToHex(msg)
  return msg

for i in range(300):
  print(mavlinkMsg(a=150+50*int(math.cos(i)),bat=(300-i)%100))
