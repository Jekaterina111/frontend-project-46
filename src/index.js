import fs from 'fs';
import path from 'path';
import makeTree from './makeTree.js';
import parser from './parsers.js';
import formatStyle from './formatters/index.js';

const getFullPath = (file) => {
  const fullPath = path.resolve(process.cwd(), file);
  return fullPath;
};

const readFile = (file) => {
  const data = fs.readFileSync(file, 'utf-8');
  const extention = path.extname(file).slice(1);
  return parser(data, extention);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(getFullPath(filepath1));
  const data2 = readFile(getFullPath(filepath2));
  const asTree = makeTree(data1, data2);
  return formatStyle(asTree, format);
};

export default genDiff;
