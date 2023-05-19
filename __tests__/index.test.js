import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFixture('stylishResult.txt');

test.each([
  ['file1.json', 'file2.json', 'stylish', stylishResult],
  ['file1.yaml', 'file2.yaml', 'stylish', stylishResult],
  ['file1.json', 'file2.json', 'undefined', stylishResult],
])('gendiff', (path1, path2, format, result) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), format)).toEqual(result);
});
