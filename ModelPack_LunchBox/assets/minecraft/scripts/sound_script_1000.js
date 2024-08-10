//include <scripts/pck_importPackage.js>
 
function onUpdate(su){
    //include <scripts/pck_basicFunction.js>
    //include <scripts/pck_main/alstom_GTO.js>
 
    deadsection(entity, dataMap, 0);
    signalChange(entity, dataMap, 0);
    doorBeep(entity, dataMap, 0, 2800);
}
//include <scripts/pck_plugin/deadsection.js>
//include <scripts/pck_plugin/signalChange.js>
//include <scripts/pck_plugin/doorBeep.js>