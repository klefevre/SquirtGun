'use strict';

var mraa = require('mraa');
var motor;
var greenLed;

var motorActivated;
var _simulation;

function Motor(simulation) {
    _simulation = typeof simulation !== 'undefined' ? simulation : false;
    if (!simulation) {
        console.log('Setup real Motor');
        // Setup motor
        motor = new mraa.Gpio(4);
        motor.dir(mraa.DIR_OUT);
    } else {
        console.log('Setup simulated Motor');
        // Setup led simulation
        greenLed = new mraa.Gpio(3);
        greenLed.dir(mraa.DIR_OUT);        
    }
}

Motor.prototype.startMotorThenOff = function () {
    var timeout = 500;
    
    if (!motorActivated) {
        console.log('Start running motor for ' + timeout + ' ms');   
        motorActivated = true;
        toggleMotor(true);
        setTimeout(function () {
            motorActivated = false;
            toggleMotor(false);
        }, timeout);
    } else {
        console.log('Motor already running -> Skipping');   
    }
};

Motor.prototype.stop = function () {
    toggleMotor(false);
};

function toggleMotor(activate) {
    if (!_simulation) {
        motor.write(activate ? 1 : 0);
    } else {
        greenLed.write(activate ? 1 : 0);   
    }
}

module.exports = Motor;
