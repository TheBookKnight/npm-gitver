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

function generateGitVersion(filePath, options = {}) {
    const sha = getShortGitSHA();
    const pkg = readPackageJson(filePath);

    if (!pkg.version) {
        throw new Error('The "version" key is missing in package.json.');
    }

    const baseVersion = pkg.version.split('-')[0]; // remove any pre-release suffix

    let suffix = sha;

    if (options.includeBranch) {
        const branch = getGitBranch()
            .replace(/\//g, '-')   // replace slashes in branch name for safety
            // eslint-disable-next-line no-useless-escape
            .replace(/[^\w\-]/g, ''); // remove any unsafe characters
        suffix = `${branch}.${sha}`;
    }

    const newVersion = `${baseVersion}-${suffix}`;

    if (options.outputJson) {
        return JSON.stringify({ 'version': newVersion })
    } else {
        return newVersion;
    }
}

function getGitBranch() {
    return childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

module.exports = {
    generateGitVersion,
};
