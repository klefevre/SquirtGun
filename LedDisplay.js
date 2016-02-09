'use strict';

var mraa = require('mraa');
var redLed;
var ledState = false;
var shouldBlink = false;

function LedDisplay() {
    // Setup led
    redLed = new mraa.Gpio(2);
    redLed.dir(mraa.DIR_OUT);
    
    // Swift off red led
    toggleRedLed(false);
}

LedDisplay.prototype.toggleRedLed = function (activate) {
    toggleRedLed(activate);
};

LedDisplay.prototype.startBlink = function () {
    shouldBlink = true;
    periodicActivity();
};

LedDisplay.prototype.stopBlink = function () {
    shouldBlink = false;
};

function toggleRedLed(activate) {
    redLed.write(activate ? 1 : 0);   
}

function periodicActivity() {
    if (shouldBlink) {
        toggleRedLed(ledState = !ledState);
        setTimeout(periodicActivity, 1000);
    }
}

module.exports = LedDisplay;
