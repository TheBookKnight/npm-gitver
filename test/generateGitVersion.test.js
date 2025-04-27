const fs = require('fs');
const childProcess = require('child_process');
const { generateGitVersion } = require('../index');
const assert = require('assert');
const { test } = require('node:test');
const sinon = require('sinon');

test('should generate a version with Git SHA when package.json is valid', (t) => {
    // Mock dependencies
    const execSyncStub = sinon.stub(childProcess, 'execSync').returns('abc123');
    const existsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
    const readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({ version: '1.0.0' }));

    try {
        // Run the function
        const result = generateGitVersion();

        // Assertions
        assert.strictEqual(result, '1.0.0-abc123');
    } finally {
        // Restore original behavior
        existsSyncStub.restore();
        readFileSyncStub.restore();
        execSyncStub.restore();
    }
});

test('should throw an error if package.json is missing', (t) => {
    // Mock dependencies
    const existsSyncStub = sinon.stub(fs, 'existsSync').returns(false);

    try {
        // Run the function and assert error
        assert.throws(() => generateGitVersion(), {
            message: 'package.json not found in the current working directory.',
        });
    } finally {
        // Restore original behavior
        existsSyncStub.restore();
    }
});

test('should throw an error if version key is missing in package.json', (t) => {
    // Mock dependencies
    const existsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
    const readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({}));

    try {
        // Run the function and assert error
        assert.throws(() => generateGitVersion(), {
            message: 'The "version" key is missing in package.json.',
        });
    } finally {
        // Restore original behavior
        existsSyncStub.restore();
        readFileSyncStub.restore();
    }
});

test('should throw an error if Git SHA cannot be retrieved', (t) => {
    // Mock dependencies
    const existsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
    const readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({ version: '1.0.0' }));
    const execSyncStub = sinon.stub(childProcess, 'execSync').throws(new Error('Git command failed'));

    try {
        // Run the function and assert error
        assert.throws(() => generateGitVersion(), {
            message: 'Git command failed',
        });
    } finally {
        // Restore original behavior
        existsSyncStub.restore();
        readFileSyncStub.restore();
        execSyncStub.restore();
    }
});