import _ from 'lodash';

const getIndent = (depth) => ('  '.repeat(depth));

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value)
    .map((key) => `${getIndent(depth + 2)}  ${key}: ${stringify(value[key], depth + 2)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth + 1)}}`;
};

const stylish = (data) => {
  const iter = (treeNode, depth = 1) => {
    const result = treeNode.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${getIndent(depth)}  ${item.key}: ${iter(item.children, depth + 2)}`;
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
    return `{\n${result.join('\n')}\n${getIndent(depth - 1)}}`;
  };
  return iter(data);
};

export default stylish;
