import _ from 'lodash';

const getReplacer = (depth, replacer = ' ') => replacer.repeat(depth * 4 - 2);

const getValue = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const replacer = ' ';
  const mapKeys = valueKeys.map((key) => `${getReplacer(depth + 1)}  ${key}: ${getValue(value[key], depth + 1)}`);
  return `{\n${mapKeys.join('\n')}\n  ${getReplacer(depth)}}`;
};

const getStyle = (obj, depth = 1) => {
  const types = {
    unchanged: ' ',
    deleted: '-',
    added: '+',
  };
  const {
    key,
    type,
    value,
    oldValue,
    children,
  } = obj;
  const replacer = ' ';
  if (type === 'object') {
    const flatChildren = children.flatMap((child) => getStyle(child, depth + 1));
    return `${getReplacer(depth)}  ${key}: {\n${flatChildren.join('\n')}\n${getReplacer(depth)}  }`;
  }
  if (type === 'deleted') {
    return `${replacer.repeat(depth * 4 -2)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'added') {
    return `${getReplacer(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'unchanged') {
    return `${getReplacer(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  return `${getReplacer(depth)}${types.deleted} ${key}: ${getValue(oldValue, depth)}\n${getReplacer(depth)}${types.added} ${key}: ${getValue(value, depth)}`;
};

export default (diff) => {
  const result = diff.map((node) => getStyle(node));
  return `{\n${result.join('\n')}\n}`;
};
