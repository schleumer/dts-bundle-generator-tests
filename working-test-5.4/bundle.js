/* eslint-disable import/no-extraneous-dependencies */

const generator = require('dts-bundle-generator');
const shell = require('shelljs');
const fs = require('fs');

shell.rm('-rf', './dist');
shell.mkdir('-p', './dist')

const dts = () => {
  const options = {
    entries: [
      {
        filePath: './src/index.d.ts',
        $output: './dist/index.d.ts',
        libraries: {
          inlinedLibraries: ['ramda', 'cheerio'],
        },
      }
    ],
    compilationOptions: {
      preferredConfigPath: './tsconfig.json',
      followSymlinks: true,
    },
  };

  /* eslint-disable import/no-extraneous-dependencies */
  const generated = generator.generateDtsBundle(options.entries, options.compilationOptions);

  options.entries.forEach((entry, i) => {
    const output = generated[i];

    fs.writeFileSync(
      entry.$output,
      output,
    );
  });
};

dts();