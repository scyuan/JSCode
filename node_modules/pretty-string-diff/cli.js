#!/usr/bin/env node

const fs = require('fs');

const stringDiff = require('./index');

const fileArg = process.argv.find(arg => arg === '--file');

const strings = process.argv
  .slice(2)
  .filter(arg => !arg.startsWith('--'))
  .slice(0, 2);

if (strings.length !== 2) {
  throw new Error('Must provide two strings as arguments');
}

if (fileArg) {
  const files = strings.map(string => fs.readFileSync(string, 'utf8'));

  stringDiff(...files, process.stdout);
} else {
  stringDiff(...strings, process.stdout);
}

// output a newline
console.log();
