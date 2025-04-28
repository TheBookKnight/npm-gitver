#!/usr/bin/env node

const { generateGitVersion } = require('../index');

// argument parser
const args = process.argv.slice(2);

let filePath = './package.json'; // default file path to package.json
let includeBranch = false;        // whether to include branch name

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f') {
        filePath = args[i + 1];
        i++;
    }
    if (args[i] === '--branch' || args[i] === '-b') {
        includeBranch = true;
    }
}

const version = generateGitVersion(filePath, { includeBranch });
console.log(version);
