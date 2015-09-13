# Octanis1-Mission-Base-Station
Octanis communicates via two way Iridium, VHF and Bluetooth. All data received from the rover is sent to what we'll call "Mission Base Station". This is a service running on a cloud server accepting structured data via REST API. Since this interface is standardised and centralised, it can be used for various other purposes like monitoring displays, phone apps and web apps.

This base station currently accepts incoming LoRaWAN end-device packets from an Thingpark Actility LoRaWAN application server.

__Warning:__ This software is currently for testing/dev purposes only.


## Requirements
- MongoDB instance running somewhere.
- nodejs / npm

You must set these environment variables prior to running:
```
export MONGODB_ADDON_USER=yourmongouser
export MONGODB_ADDON_PASSWORD=yourmongopassword
export MONGODB_ADDON_HOST=yourmongohost
export MONGODB_ADDON_PORT=27017
export MONGODB_ADDON_DB=yourmongodb
export GATEWAY_KEY=yoursecretkeyforapplicationserveraccess
```



## Quick Start
```
git clone https://github.com/Octanis1/Octanis1-Mission-Base-Station
cd Octanis1-Mission-Base-Station
npm install
PORT=8080 npm start  
```

## Usage as LoRaWAN AS (application server)
Make sure the base station is up and running by browsing to it (e.g. http://localhost:8080). The  base station accepts XML POST requests at this address, which you must setup in your ThingPark device manager:
```
http://[basestation_host]/lorawan_packets/[GATEWAY_KEY environment variable that you setup previously]
```
You can also get a listing of all received packets at the same URL.





