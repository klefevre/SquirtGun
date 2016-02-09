'use strict';

var mraa = require('mraa');
console.log('MRAA Version: ' + mraa.getVersion());

var LedDisplay = require('./LedDisplay.js');
var MotionSensor = require('./MotionSensor.js');
var Motor = require('./Motor.js');

var ledDisplay = new LedDisplay();
var motionSensor = new MotionSensor();
var motor = new Motor(true);

var gunActivated = false;

var button = new mraa.Gpio(7);
button.dir(mraa.DIR_IN);

function toggleGun(activated) {
    if (activated) {
        console.log('Gun activated');
        ledDisplay.startBlink();
        motionSensor.start(function(found) {
            if (found) {
                motor.startMotorThenOff(); 
            }
        });
    } else {
        console.log('Gun disabled');
        motionSensor.stop();
        motor.stop();
        ledDisplay.stopBlink();
        ledDisplay.toggleRedLed(true);
    }    
}

function loop() {
    var buttonState = button.read();
    
    if (buttonState) {
        gunActivated = !gunActivated;
        toggleGun(gunActivated);
    }
}

function start() {
    console.log('Start WaterGun');
    
    ledDisplay.toggleRedLed(true);
    
    setInterval(loop, 500);
}

start();
