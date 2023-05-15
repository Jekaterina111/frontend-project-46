import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';
import { fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonResult = readFixture('jsonResult.txt');

test('genDiff', () => {
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
expect(genDiff(filepath1, filepath2)).toEqual(jsonResult);
});