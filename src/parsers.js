import yaml from 'js-yaml';

const parser = (data, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknow extention ${extention}`);
  }
};

export default parser;
