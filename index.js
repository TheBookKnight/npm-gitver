const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function getShortGitSHA() {
    return execSync('git rev-parse --short HEAD').toString().trim();
}

function readPackageJson() {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const raw = fs.readFileSync(pkgPath);
    return JSON.parse(raw);
}

function generateGitVersion() {
    const sha = getShortGitSHA();
    const pkg = readPackageJson();

    const baseVersion = pkg.version.split('-')[0]; // remove any pre-release suffix
    const newVersion = `${baseVersion}-${sha}`;

    return newVersion;
}

module.exports = {
    generateGitVersion,
};
