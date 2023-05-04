import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  
  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
        return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: compare(data1[key], data2[key]) };

    } 
    if (data1[key] !== data2[key]) {
       return {
        key, type: 'changed', valueBefore: data1[key], valueAfter: data2[key],
       };
    } 
      return {
        key, type: 'unchanged', value: data1[key]
      };
    
});
  return result;
  };

  const formatStyle = (tree) => {
    const result = tree.map((style) => {
      const styleTree = style.type;
      switch (styleTree) {
       case 'deleted':
        return ` - ${style.key}: ${style.value}`;
       case 'added':
        return ` + ${style.key}: ${style.value}`;
       case 'changed':
        return ` - ${style.key}: ${style.valueBefore} \n + ${style.key}: ${style.valueAfter}`;
       case 'unchanged':
        return `   ${style.key}: ${style.value}`;
        default:
          return null;
      }
    });
    return `{\n${result.join('\n')}\n}`;
  };
  
  const getPath = (file) => path.resolve(process.cwd(), file);
  const readFile = (file) => fs.readFileSync(getPath(file), 'utf-8');
  const getFile = (file) => JSON.parse(readFile(file));
  
  const genDiff = (filepath1, filepath2) =>{

  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const file3 = compare(file1, file2);
 // const str = JSON.stringify(file3)
  return formatStyle(file3);
}

export default genDiff;
