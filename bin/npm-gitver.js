#!/usr/bin/env node
const minimist = require('minimist');
const { generateGitVersion } = require('../index');

// argument parser
const args = minimist(process.argv.slice(2), {
    alias: { f: 'file', b: 'branch' },
    boolean: ['branch'],
    string: ['file'],
    default: { file: './package.json', branch: false },
});

const version = generateGitVersion(args.file, { includeBranch: args.branch });
console.log(version);
