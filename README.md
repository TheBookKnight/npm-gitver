# npm-gitver

`npm-gitver` is an NPM library for managing versioning in your Node.js projects using Git tags.

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

## Linting

Follow best practices for linting your code. Refer to the ESLint documentation for setup and configuration:

[ESLint Documentation](https://eslint.org/docs/latest/)

## Additional Information

For more details on how `npm-gitver` works, refer to the [GitHub repository](https://github.com/your-repo/npm-gitver).
