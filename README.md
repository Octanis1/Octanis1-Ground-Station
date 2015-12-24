# Octanis1-Mission-Base-Station
Octanis communicates via two way Iridium, LoRa and Bluetooth. All data received from the rover is sent to what we'll call "Mission Base Station" (MBS). 
This is a service running on a cloud server accepting structured data (XML, JSON) via REST API. The MBS provides data to monitoring displays, phone apps and web apps.

This MBS currently accepts incoming LoRaWAN end-device packets from an Thingpark Actility LoRaWAN application server.

__Warning:__ This software is currently for testing/dev purposes only.


## Requirements
- MongoDB instance running somewhere.
- nodejs / npm

You must set these environment variables prior to running:

**Unix / OSX**:
```
export MONGODB_ADDON_USER=yourmongouser
export MONGODB_ADDON_PASSWORD=yourmongopassword
export MONGODB_ADDON_HOST=yourmongohost
export MONGODB_ADDON_PORT=27017
export MONGODB_ADDON_DB=yourmongodb
export GATEWAY_KEY=yoursecretkeyforapplicationserveraccess
```
**Windows**:
```
SET MONGODB_ADDON_USER=yourmongouser
SET MONGODB_ADDON_PASSWORD=yourmongopassword
SET MONGODB_ADDON_HOST=yourmongohost
SET MONGODB_ADDON_PORT=27017
SET MONGODB_ADDON_DB=yourmongodb
SET GATEWAY_KEY=yoursecretkeyforapplicationserveraccess
```
**Windows Powershell**:
```
$env:MONGODB_ADDON_USER = "yourmongouser"
$env:MONGODB_ADDON_PASSWORD = "yourmongopassword"
$env:MONGODB_ADDON_HOST = "yourmongohost"
$env:MONGODB_ADDON_PORT = 27017
$env:MONGODB_ADDON_DB = "yourmongodb"
$env:GATEWAY_KEY = "yoursecretkeyforapplicationserveraccess"
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




## Working Principle
1. Raw data comes in to the base station from various sources through HTTP requests.
2. Raw data is stored in a collection per source. E.g. "rockblock_packets"
3. Raw data is searched for protobuf identifiers and decoded accordingly. E.g "rover_status"
4. The decoded raw data is then stored in higher level collections. E.g. raw data from any source can contribute to "rover_status" collection.
