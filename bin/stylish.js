import _ from 'lodash';

const getValue = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const indent = '  ';
  const mapKeys = valueKeys.map((key) => `${indent.repeat(depth + 3)}${key}: ${getValue(value[key], depth)}`);
  return `{\n${mapKeys.join('\n')}\n${indent.repeat(depth + 1)}}`;
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
  const indent = '  ';
  if (type === 'object') {
    const flatChildren = children.flatMap((child) => getStyle(child, depth + 1));
    return `${indent.repeat(depth)}${key}: {\n${flatChildren.join('\n')}\n${indent.repeat(depth)}}`;
  }
  if (type === 'deleted') {
    return `${indent.repeat(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'added') {
    return `${indent.repeat(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  if (type === 'unchanged') {
    return `${indent.repeat(depth)}${types[type]} ${key}: ${getValue(value, depth)}`;
  }
  return `${indent.repeat(depth)}${types.deleted} ${key}: ${getValue(oldValue, depth)}\n${indent.repeat(depth)}${types.added} ${key}: ${getValue(value, depth)}`;
};

export default (diff) => {
  const result = diff.map((node) => getStyle(node));
  return `{\n${result.join('\n')}\n}`;
};
