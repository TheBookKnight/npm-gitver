const fs = require('fs');
const childProcess = require('child_process');
const path = require('path');

function getShortGitSHA() {
    return childProcess.execSync('git rev-parse --short HEAD').toString().trim();
}

function readPackageJson(filePath = './package.json') {
    const pkgPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(pkgPath)) {
        throw new Error('package.json not found in the current working directory.');
    }
    const raw = fs.readFileSync(pkgPath);
    return JSON.parse(raw);
}

function generateGitVersion(filePath) {
    const sha = getShortGitSHA();
    const pkg = readPackageJson(filePath);

    if (!pkg.version) {
        throw new Error('The "version" key is missing in package.json.');
    }
    const baseVersion = pkg.version.split('-')[0]; // remove any pre-release suffix
    const newVersion = `${baseVersion}-${sha}`;

    return newVersion;
}

module.exports = {
    generateGitVersion,
};
