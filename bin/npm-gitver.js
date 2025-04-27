#!/usr/bin/env node

const { generateGitVersion } = require('../index');

const version = generateGitVersion();
console.log(version);
