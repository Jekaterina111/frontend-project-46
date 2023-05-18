import _ from 'lodash';

const getIndent = (depth, str = ' ', identCount = 4) => str.repeat((depth * identCount) - 2);

const stringify = (value, depth = 1) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)} ${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIndent(depth)}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (treeNode, depth = 1) => {
    const result = treeNode.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${getIndent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n ${getIndent(depth)} }`;
        }
        case 'deleted': {
          return `${getIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        }
        case 'added': {
          return `${getIndent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        }
        case 'changed': {
          return `${getIndent(depth)}- ${item.key}: ${stringify(item.valueBefore, depth)}\n${getIndent(depth)}+ ${item.key}: ${stringify(item.valueAfter, depth)}`;
        }
        case 'unchanged': {
          return `${getIndent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        }
        default: {
          throw new Error(`Unknow type ${item.type}`);
        }
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(data)}\n}`;
};

export default stylish;
