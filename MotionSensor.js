'use strict';

var mraa = require('mraa');
var motionSensor;

var shouldSensor = false;
var found = false;
var _callback;

function MotionSensor() {
    console.log('Setup Motion Sensor');
    // Setup motion sensor
    motionSensor = new mraa.Gpio(6);
    motionSensor.dir(mraa.DIR_IN);
}

MotionSensor.prototype.start = function (callback) {
    if (!shouldSensor) {
        _callback = callback;
        console.log('Start Motion Sensor');
        shouldSensor = true;
        periodicActivity();
    } else {
        console.log('Motion sensor already running -> skipping');   
    }
};

MotionSensor.prototype.stop = function () {
    shouldSensor = false;
};

function periodicActivity() {
	var motionSensorState = motionSensor.read();

	if (motionSensorState && !found) {
        console.log("FOUND !");
        _callback(true);
        found = true;
	} else if (!motionSensorState && found) { 
        console.log("NOT FOUND :(");
        _callback(false);
        found = false;
	}
    
    if (shouldSensor) {
        setTimeout(periodicActivity, 500);
    }
}

module.exports = MotionSensor;
