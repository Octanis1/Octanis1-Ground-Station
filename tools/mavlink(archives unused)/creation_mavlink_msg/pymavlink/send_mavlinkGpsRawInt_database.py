#!/usr/bin/python

import sys
from subprocess import call
import base64
import os

f = open(sys.argv[1],'r')
lines  = f.readlines()
f.close()
i=0
for line in lines:
      line=base64.b64decode(line)
      line=[format(ord(x),'x') for x in line] 
      line="".join(line)
      line="fe1e018018"+line[10:] # I've changed the header because those of the library is wrong (the ID was not 24)
      #print(line)
      os.system("curl -X POST -H \"Content-Type:application/xml\" --data '<?xml version=\"1.0\" encoding=\"UTF-8\" ?><packet><imei>321</imei><momsn>432</momsn><transit_time>16-07-1610:41:50</transit_time><iridium_latitude>9</iridium_latitude><iridium_longitude>9</iridium_longitude><iridium_cep>9</iridium_cep><data>"+line+"</data></packet>' https://octanis-ground-station-jajoe.c9users.io/rockblock_packets")
