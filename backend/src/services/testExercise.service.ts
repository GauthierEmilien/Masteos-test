import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { ExerciseTest } from './exerciseSet.service';

const tsc = require('node-typescript-compiler');

const tempCodeFileTs = `${path.resolve(__dirname, '../../temp')}/tsFile.ts`;
const tempCodeFileJs = `${path.resolve(__dirname, '../../temp')}/tsFile.js`;

export async function createFileFromCode(code: string) {
  const writeFile = util.promisify(fs.writeFile);

  await writeFile(tempCodeFileTs, code);
}

export async function compileCode() {
  try {
    await tsc.compile(
      {
        skipLibCheck: true,
        target: 'ES2017',
        module: 'Commonjs',
        outDir: '.',
        rootDir: '.',
        strict: false,
      },
      tempCodeFileTs,
    );
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw {
      tscError: error.stdout.replace(/temp\/tsFile.ts/g, '').split('\n'),
    };
  }
}

export async function testCode(test: ExerciseTest) {
  const readFile = util.promisify(fs.readFile);
  const code = (await readFile(tempCodeFileJs)).toString();
  const codeToEval = `${code}${test.call}`;
  // eslint-disable-next-line no-eval
  const res = eval(codeToEval);
  const isValid = test.result === res;
  return {
    isValid,
    ...(!isValid && {
      error: `${test.call} : expected ${test.result}, got ${res}`,
    }),
  };
}
