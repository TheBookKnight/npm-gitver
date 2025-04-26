const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function applyGitVersion() {
    const sha = getShortGitSHA();
    const { pkgPath, pkg } = readPackageJson();

    const baseVersion = pkg.version.split('-')[0]; // strip pre-release if any
    const newVersion = `${baseVersion}-${sha}`;

    console.log(`📦 Updating version: ${pkg.version} → ${newVersion}`);
    pkg.version = newVersion;
    writePackageJson(pkgPath, pkg);
}

function getShortGitSHA() {
    return execSync('git rev-parse --short HEAD').toString().trim();
}

function readPackageJson() {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const raw = fs.readFileSync(pkgPath);
    return { pkgPath, pkg: JSON.parse(raw) };
}

function writePackageJson(pkgPath, updatedPkg) {
    fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2) + '\n');
}

module.exports = {
    applyGitVersion,
};
