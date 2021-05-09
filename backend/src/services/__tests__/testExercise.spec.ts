jest.mock('fs');
jest.mock('util', () => ({
  promisify: jest.fn().mockImplementation((fn) => fn),
}));

import * as fs from 'fs';
import {
  compileCode,
  createFileFromCode,
  testCode,
} from '../testExercise.service';
const tsc = require('node-typescript-compiler');

describe('File: testExercise.ts', () => {
  describe('Function: createFileFromCode', () => {
    it('Should call writeFile function', async () => {
      jest.spyOn(fs, 'writeFile').mockImplementation(jest.fn());
      const code = 'console.log("this is a test")';
      await createFileFromCode(code);
      expect(fs.writeFile).toBeCalledWith(expect.any(String), code);
    });
  });

  describe('Function: compileCode', () => {
    it('Should compile a .ts file', async () => {
      jest.spyOn(tsc, 'compile').mockResolvedValue({});
      await compileCode();
      expect(tsc.compile).toBeCalled();
    });

    it('Should return the generated typescript error', async () => {
      const expectedError = '(1,1) Some error';
      jest
        .spyOn(tsc, 'compile')
        .mockRejectedValue({ stdout: `temp/tsFile.ts${expectedError}` });
      try {
        await compileCode();
      } catch (error) {
        expect(error).toEqual({ tscError: [expectedError] });
      }
    });
  });

  describe('Function: testCode', () => {
    it('Should return a validated test', async () => {
      const fileContent = 'function test(i) { return i + 1; }';
      jest
        .spyOn(fs, 'readFile')
        .mockReturnValue({ toString: () => fileContent } as any);
      const res = await testCode({ call: 'test(1)', result: 2 });
      expect(res.isValid).toBe(true);
      expect(res).not.toHaveProperty('error');
    });

    it('Should return an unvalidated test', async () => {
      const fileContent = 'function test(i) { return i; }';
      jest
        .spyOn(fs, 'readFile')
        .mockReturnValue({ toString: () => fileContent } as any);
      const res = await testCode({ call: 'test(1)', result: 2 });
      expect(res.isValid).toBe(false);
      expect(res.error).toBeDefined();
    });
  });
});
