import _ from 'lodash';

const getReplacer = (depth, replacer = ' ') => replacer.repeat(depth * 4 - 2);

const getValue = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const mapKeys = valueKeys.map((key) => `${getReplacer(depth + 1)}  ${key}: ${getValue(value[key], depth + 1)}`);
  return `{\n${mapKeys.join('\n')}\n  ${getReplacer(depth)}}`;
};

const getStyle = (obj, depth = 1) => {
  const types = {
    unchanged: ' ',
    deleted: '-',
    added: '+',
  };
  const { type } = obj;
  if (type === 'object') {
    const {
      key,
      children,
    } = obj;
    const flatChildren = children.flatMap((child) => getStyle(child, depth + 1));
    return `${getReplacer(depth)}  ${key}: {\n${flatChildren.join('\n')}\n${getReplacer(depth)}  }`;
  }
  if (type === 'deleted') {
    const {
      key,
      value,
    } = obj;
    return `${getReplacer(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'added') {
    const {
      key,
      value,
    } = obj;
    return `${getReplacer(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'unchanged') {
    const {
      key,
      value,
    } = obj;
    return `${getReplacer(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  const {
    key,
    value,
    oldValue,
  } = obj;
  return `${getReplacer(depth)}${types.deleted} ${key}: ${getValue(oldValue, depth)}\n${getReplacer(depth)}${types.added} ${key}: ${getValue(value, depth)}`;
};

const formatStylish = (diff) => {
  const result = diff.map((node) => getStyle(node));
  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;
