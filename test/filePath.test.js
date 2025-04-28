const { writeFileSync, unlinkSync } = require('fs');
const childProcess = require('child_process');
const { generateGitVersion } = require('../index');
const { test } = require('node:test');
const assert = require('assert');

const TEMP_PACKAGE_PATH = './test/temp-package.json';

test('generateGitVersion correctly appends Git SHA to package version', async (t) => {
    // Arrange
    const fakePackage = {
        name: "fake-package",
        version: "2.5.7"
    };
    writeFileSync(TEMP_PACKAGE_PATH, JSON.stringify(fakePackage, null, 2));

    // Get current short Git SHA
    const shortSHA = childProcess.execSync('git rev-parse --short HEAD').toString().trim();

    // Act
    const result = generateGitVersion(TEMP_PACKAGE_PATH);

    // Assert
    const expected = `2.5.7-${shortSHA}`;
    assert.strictEqual(result, expected);

    // Cleanup
    unlinkSync(TEMP_PACKAGE_PATH);
});
