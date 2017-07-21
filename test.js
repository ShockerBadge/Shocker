

onButtonClick = function() {
    var shocker_service_UUID ='2a1dcfb0-4bff-4a8f-9887-2e4b0b56cef5';
    var shocker_chr_UUID = '01f176bd-b16e-4cf3-9536-dc0c211ffc6b';
    var name_chr_UUID = '01f176bd-b16e-4cf3-9536-dc0c211ffc6c';
    var service =null;
    log("Searching for shocker...");
    navigator.bluetooth.requestDevice(
        {//filters: [{services: [shocker_service_UUID]}]
            acceptAllDevices: true,
            optionalServices:[shocker_service_UUID]
         })
        .then(device => {
        log('Connecting to GATT Server...' );
    return device.gatt.connect();
}).then(server => {
        log('Getting Battery Service...');
    return server.getPrimaryService(shocker_service_UUID);
}).then(s => {
        log('Getting Battery Level Characteristic...');
    service = s;
    return service.getCharacteristic(shocker_chr_UUID);
}).then(characteristic => {
        log('Write to shocker...');
    return characteristic.writeValue(Uint8Array.of(10));
}).then(()=> {
        log('Getting Name Characteristic...');
    return service.getCharacteristic(name_chr_UUID);
}).then(characteristic => {
        log('Write to name...');
     var name = "Dan".split("").map( function( val ) {
         return val.charCodeAt( 0 );
     } )
     characteristic.writeValue(Uint8Array.from(name));
    return characteristic;
}).then((characteristic) => {
        log("Getting Name Value");
    return characteristic.readValue();
    }).then((v)=> {
        var name="";
        for(var i=0; i< v.byteLength; i++) name += String.fromCharCode(v.getUint8(i));
        alert(name);

    });
}

/*
.then(characteristic => {
    log('Reading Battery Level...');
    return characteristic.readValue();
})
.then(value => {
    let batteryLevel = value.getUint8(0);
log('> Battery Level is ' + batteryLevel + '%');
})
.catch(error => {
    log('Argh! ' + error);
});
    */
