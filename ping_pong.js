#!/usr/bin/env node

const fs = require('fs');
const process = require('process');
const {Input, Output} = require("web-ext-native-msg");

fs.appendFileSync('/Users/mantou/log', `titile: ${process.title}, pid: ${process.pid}, ppid: ${process.ppid}, execPath: ${process.execPath}, start\n`);

const handleReject = e => {
  e = (new Output()).encode(e);
  e && process.stdout.write(e);
  return false;
};

const writeStdout = async msg => {
  msg = await (new Output()).encode(msg);
  return msg && process.stdout.write(msg);
};

const handleMsg = async msg => {
  fs.appendFileSync('/Users/mantou/log', `Received: ${msg}\n`);
  fs.appendFileSync('/Users/mantou/log', `Sending: pong\n`);
  writeStdout('pong');
};

const input = new Input();

const readStdin = chunk => {
  const arr = input.decode(chunk);
  const func = [];
  Array.isArray(arr) && arr.length && arr.forEach(msg => {
    msg && func.push(handleMsg(msg));
  });
  return Promise.all(func).catch(handleReject);
};

process.stdin.on("data", readStdin);

