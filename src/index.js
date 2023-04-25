import fs from 'fs';
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  
  const result = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, type: 'nested', children: genDiff(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }else if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };

    } else if (data1[key] !== data2[key]) {
       return {
        key, type: 'changed', valueBefore: data1[key], valueAfter: data2[key],
       };
    } else {
      return {
        key, type: 'unchanged', value: data1[key]
      };
    }
});
  return result;
  };
  

export default (filepath1, filepath2) => {
 // const data = fs.readFileSync(path, 'utf-8');
 // const dataParse = JSON.parse(data);

  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');
  
  const dataParse1 = JSON.parse(file1);
  const dataParse2 = JSON.parse(file2);
 
}
genDiff(dataParse1, dataParse2);
