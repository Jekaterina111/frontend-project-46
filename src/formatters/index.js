import stylish from './stylish.js';

const formatStyle = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknow format ${format}`);
  }
};

export default formatStyle;
