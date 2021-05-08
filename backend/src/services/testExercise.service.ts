const tsc = require("node-typescript-compiler");
import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import { ExerciseTest } from "./exerciseSet.service";
const tsconfig = { json: require("../../tsconfig.json") };

const tempCodeFileTs = path.resolve(__dirname, "../../temp") + "/tsFile.ts";
const tempCodeFileJs = path.resolve(__dirname, "../../temp") + "/tsFile.js";

export async function createFileFromCode(code: string) {
  const writeFile = util.promisify(fs.writeFile);

  await writeFile(tempCodeFileTs, code);
}

export async function compileCode() {
  try {
    await tsc.compile(
      {
        ...tsconfig.json.compilerOptions,
        outDir: ".",
        rootDir: ".",
        strict: false,
      },
      tempCodeFileTs
    );
  } catch (error) {
    throw {
      tscError: error.stdout.replace(/temp\/tsFile.ts/g, "").split("\n"),
    };
  }
}

export async function testCode(test: ExerciseTest) {
  const readFile = util.promisify(fs.readFile);
  let code = (await readFile(tempCodeFileJs)).toString();
  const codeToEval = code + `${test.call}`;
  const res = eval(codeToEval);
  const isValid = test.result === res;
  return {
    isValid,
    ...(!isValid && {
      error: `${test.call} : expected ${test.result}, got ${res}`,
    }),
  };
}
