import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, dataType) => {
 const parse = parsers[dataType];
 return parse(data);
};

export default parse;
