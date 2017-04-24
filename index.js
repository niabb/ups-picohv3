'use strict';

const i2c = require('i2c-bus');

const STATUS_REGISTERS = 0x69;

const STATUS_MODE = 0x00;
const STATUS_BATLEVEL = 0x08;
const STATUS_FV = 0x26;

const i2c1 = i2c.openSync(1);


function readStatus() {
  let status = {};
  status.poweringMode = i2c1.readByteSync(STATUS_REGISTERS, STATUS_MODE);
  status.batteryLevel = new Number(i2c1.readWordSync(STATUS_REGISTERS, STATUS_BATLEVEL).toString(16));
  status.batteryLevel = status.batteryLevel/100;
  status.firmwareVersion = i2c1.readWordSync(STATUS_REGISTERS, STATUS_FV).toString(16);

  console.log(status); 
  return status;
}

readStatus();