#!/usr/bin/env node
const minimist = require('minimist');
const { generateGitVersion } = require('../index');

// argument parser
const args = minimist(process.argv.slice(2), {
    alias: { f: 'file', b: 'branch', j: 'json' },
    boolean: ['branch', 'json'],
    string: ['file'],
    default: { file: './package.json', branch: false, json: false },
});

const version = generateGitVersion(args.file, { includeBranch: args.branch, outputJson: args.json });
console.log(version);
