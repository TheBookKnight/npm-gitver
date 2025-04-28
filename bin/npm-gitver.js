#!/usr/bin/env node

const { generateGitVersion } = require('../index');

// argument parser
const args = process.argv.slice(2);

let filePath = './package.json'; // default file path to package.json

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f') {
        filePath = args[i + 1];
        i++;
    }
}

const version = generateGitVersion(filePath);
console.log(version);
