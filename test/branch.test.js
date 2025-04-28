const { writeFileSync, unlinkSync } = require('fs');
const childProcess = require('child_process');
const { generateGitVersion } = require('../index');
const { test } = require('node:test');
const assert = require('assert');
const sinon = require('sinon');

const TEMP_PACKAGE_PATH = './test/temp-package.json';

test('generateGitVersion correctly appends branch name and Git SHA to package version with --branch flag', async () => {
    // Arrange
    const fakePackage = {
        name: "fake-package",
        version: "2.5.7"
    };
    writeFileSync(TEMP_PACKAGE_PATH, JSON.stringify(fakePackage, null, 2));

    // Mock Git commands
    const shortSHA = 'abc123';
    const branchName = 'feature/test-branch';
    const execSyncStub = sinon.stub(childProcess, 'execSync');
    execSyncStub.withArgs('git rev-parse --short HEAD').returns(shortSHA);
    execSyncStub.withArgs('git rev-parse --abbrev-ref HEAD').returns(branchName);

    // Act
    const result = generateGitVersion(TEMP_PACKAGE_PATH, { includeBranch: true });

    // Assert
    const expected = `2.5.7-feature-test-branch.${shortSHA}`;
    assert.strictEqual(result, expected);

    // Cleanup
    unlinkSync(TEMP_PACKAGE_PATH);

    // Restore stubs
    execSyncStub.restore();
});