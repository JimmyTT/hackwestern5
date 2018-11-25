const { exec } = require('child_process');
const request = require('request');
const nmap = require('node-nmap');

const NETWORK_TO_SCAN="172.30.94.0/21"


//nmap.nmapLocation = 'C:\Nmap\nmap.exe'; //default



var minutes = 2, the_interval = minutes * 60 * 1000;
setInterval(function() {
    var date = new Date();
    console.log(date.toJSON());
    let quickscan = new nmap.QuickScan('172.30.94.0/21', '-sn');

    var deviceManufacturerCount = {};

    quickscan.on('complete', function(data){
        console.log(data);
        for (var device in data) {
            var vendor = data[device].vendor;
            console.log(vendor);
            if (deviceManufacturerCount.hasOwnProperty(vendor)) {
                deviceManufacturerCount[vendor]++;
              } else {
                deviceManufacturerCount[vendor] = 1;
            }
        }
        sortedDevices = sortByCount(deviceManufacturerCount);
        console.log(sortedDevices);
    
        var dataString = '';
        for (dev in sortedDevices) {
            var device = sortedDevices[dev];
            dataString+= ('deviceCount,deviceType=' + device.name.replace(/ /g,"_") + " value=" + device.total + "\n");
        }    
        console.log(dataString);
        var options = {
            url: 'http://hackwestern5.purplelettuce.net:8086/write?db=Devices',
            auth: {
                'user': 'influxadmin',
                'pass': 'DragonBoard'
            },
            method: 'POST',
            body: dataString
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            else {
                console.log(error);
            }
        }
        
        request(options, callback);
        
    
    
    
    
    });
       
      quickscan.on('error', function(error){
        console.log(error);
    });

    quickscan.startScan();
}, the_interval);

function sortByCount (wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });
  
    finalWordsArray.sort(function (a, b) {
      return b.total - a.total;
    });
  
    return finalWordsArray;
  
}