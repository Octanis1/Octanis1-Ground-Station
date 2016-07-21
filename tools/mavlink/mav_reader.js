/* reference : http://www.jiunn-kai-huang.com/#!Mavlink/c1mbt/5649a9f70cf2f51f323cffb7
   examples : FE094E0101000000000002035104031C7F, fe1e01811800000000000000001000000000ffff4fff5fd
*/

var convertNumToBase = function( num, baseA, baseB ){
	if( !( baseA < 2 || baseB < 2 || isNaN( baseA ) 
		|| isNaN(baseB) || baseA > 36 || baseB > 36) ){
        return parseInt( num, baseA ).toString( baseB );
    }
};	
//convertNumToBase( 1111, 2, 10 );		// return "15"
//convertNumToBase( 10101111, 2, 16 );		// return "af"


function mav_getLen(packet){
  var result="".concat(packet[2],packet[3]);
  return parseInt(result,16);
}

function mav_getId(packet){
  var result="".concat(packet[8],packet[9]);
  return parseInt(result,16);
}

function mav_getData(packet){
  var length=mav_getLen(packet);
  var i=12;
  var limit=i+length;
  var result="";
  while(i<limit){
    result=result.concat(packet[i]);
    i+=1;
  }
  return result;
}

function mav_getBinData(packet){
  var raw=mav_getData(packet);
  var lenIni=raw.length
  var binData=convertNumToBase(raw, 16, 2);
  var addZeros=4*lenIni-binData.length
  binData=("0".repeat(addZeros)).concat(binData)
  return binData;
}

function separate_multiple_mav(packet){
  var result=[];
  var lengthTotal=packet.length;
  var lengthActuel=mav_getLen(packet)+16;
  result.push(packet.substr(0,lengthActuel));
  if(lengthActuel<lengthTotal){
    packet=packet.substr(lengthActuel);
  }
  while(lengthActuel<lengthTotal){
    lengthActuel+=mav_getLen(packet)+16;
    tmp=mav_getLen(packet)+16;
    result.push(packet.substr(0,tmp));
    if(lengthActuel<lengthTotal){
      packet=packet.substr(tmp);
    }
  }
  return result;
}

function mav_is_gps_raw_int(packet){
  if(mav_getId(packet)==24){
    return true;
  }
  else{
    return false;
  }
}

function mav_gps_raw_int(packet){
  var binData=mav_getBinData(packet);
  var time_usec=binData.substr(0,64), eph=binData.substr(136,16), epv=binData.substr(152,16), vel=binData.substr(168,16), cog=binData.substr(184,16), sat_visible=binData.substr(200,8);
  var fix=binData.substr(16,8), lat=binData.substr(24,16), lon=binData.substr(40,16), alt=binData.substr(56,16);
  // you can add the other variables to this if you need more information (e.g time_usec, etc.)
  //return [fix, lat, lon, alt];  
  return [convertNumToBase(fix,2,10), convertNumToBase(lat,2,10), convertNumToBase(lon,2,10), convertNumToBase(alt,2,10)];
}

function upper_hex(hexa){
  return hexa.toUpperCase();
}

function transform_into_array(data){
  var myArray=new Array();
  var lines=data.split("\n");
  console.log(lines)
  for(i=0;i<lines.length;i++){
    line=upper_hex(lines[i])
    console.log(line)
    if(mav_is_gps_raw_int(line)){
      dataLine=mav_gps_raw_int(line)
      console.log(dataLine);
      myArray.push(dataLine)
    }
  }
  return myArray
}

function create_cloud(testData){
  var cloud=new Array();
  var arrayMsg=transform_into_array(testData);
  console.log(arrayMsg);
  for(i=0;i<arrayMsg.length;i++){
    point=arrayMsg[i]
    cloud.push({x:parseInt(point[2]),y:parseInt(point[1]),z:parseInt(point[3]),color:"red"})
  }
  return cloud
}
