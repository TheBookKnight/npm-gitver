# npm-gitver

`npm-gitver` is an NPM library for managing versioning in your Node.js projects using your project's Git SHA.

## Installation

Install the library using npm:

```bash
npm install npm-gitver --save-dev
```

## Usage

### Running via npm script

1. Ensure you are using the correct Node.js version specified in the `.nvmrc` file:

   ```bash
   nvm use
   ```

2. Add a script in your `package.json` to run `npm-gitver`:

   ```json
   "scripts": {
     "version": "npm-gitver"
   }
   ```

3. Run the versioning script:

   ```bash
   npm run version
   ```

   This will automatically update your project version based on Git tags.

### Running directly via CLI

You can also run `npm-gitver` directly using `npx` without adding it to your `package.json`:

```bash
npx npm-gitver
```

This will execute the package directly from the command line, creating or updating the version based on Git tags.

### Specifying a Custom `package.json` File Path

If your `package.json` file is located in a custom directory, you can use the `--file` or `-f` flag to specify its path:

```bash
npx npm-gitver --file ./path/to/package.json
```

or

```bash
npx npm-gitver -f ./path/to/package.json
```

This will use the specified `package.json` file to determine the base version and update it accordingly.

### Including the Git Branch in the Version

You can use the `--branch` flag to include the current Git branch name in the generated version. This is useful for identifying builds from different branches.

```bash
npx npm-gitver --branch
```

or

```bash
npx npm-gitver -b
```

When using this flag, the generated version will include the branch name as a prefix to the Git SHA, formatted as `<branch>.<sha>`. For example, if the branch is `feature/new-feature` and the Git SHA is `abc123`, the version will look like:

```
1.0.0-feature-new-feature.abc123
```

Note: Slashes (`/`) in branch names will be replaced with dashes (`-`), and any unsafe characters will be removed.

### Outputting the Version in JSON Format

If you want the version to be output in JSON format, you can use the `--json` flag. This is useful for programmatic consumption of the version information.

```bash
npx npm-gitver --json
```

or

```bash
npx npm-gitver -j
```

When using this flag, the output will be a JSON object containing the version. For example:

```json
{
  "version": "1.0.0-abc123"
}
```

This can be combined with other flags, such as `--branch`, to include additional information in the version.

### Using the API Programmatically

You can also use `npm-gitver` programmatically in your Node.js scripts. Here's an example:

```javascript
const { generateGitVersion } = require("npm-gitver");

const options = {
  includeBranch: true, // Include the Git branch name in the version
  outputJson: true, // Output the version in JSON format
};

const version = generateGitVersion("./path/to/package.json", options);

console.log(version);
// Example output: {"version":"1.0.0-feature-new-feature.abc123"}
```

#### Parameters for `generateGitVersion`

- **`filePath`** (string): The path to the `package.json` file. Defaults to `./package.json`.
- **`options`** (object):
  - `includeBranch` (boolean): Whether to include the Git branch name in the version. Default is `false`.
  - `outputJson` (boolean): Whether to output the version in JSON format. Default is `false`.

#### Return Value

- If `outputJson` is `false`, the function returns a string representing the version (e.g., `1.0.0-abc123`).
- If `outputJson` is `true`, the function returns a JSON string (e.g., `{"version":"1.0.0-abc123"}`).

## Use Cases

Here are some common use cases for `npm-gitver`:

1. **Automated Versioning for CI/CD Pipelines:**

   - Use `npm-gitver` in your CI/CD pipelines to automatically generate unique versions for each build based on Git tags and branch names.
   - Example: Include the branch name and Git SHA in the version to differentiate builds from `main` and feature branches.

2. **Semantic Versioning with Git Tags:**

   - Ensure your project follows semantic versioning by using Git tags as the source of truth for version numbers.
   - Example: Tag your releases with `v1.0.0`, and `npm-gitver` will use the tag to generate the version.

3. **Programmatic Version Management:**

   - Use the API to programmatically generate versions in custom scripts or tools.
   - Example: Generate a JSON-formatted version string for use in a deployment manifest.

4. **Debugging and Build Identification:**

   - Include the Git SHA and branch name in the version to easily identify the source of a build.
   - Example: A version like `1.0.0-feature-new-feature.abc123` helps trace the build back to a specific commit and branch.

5. **Custom Versioning for Monorepos:**
   - Specify a custom `package.json` file path for projects in a monorepo setup.
   - Example: Use the `--file` flag to generate versions for individual packages in a monorepo.

## Additional Information

For more details on how `npm-gitver` works, refer to the [GitHub repository](https://github.com/TheBookKnight/npm-gitver).

If you have questions or issues about this project, you can open an issue
