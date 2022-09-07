import _ from 'lodash';

const getValue = (value) => {
  if (!_.isObject(value)) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return `${value}`;
  }
  return '[complex value]';
};

const getStyle = (obj, path = []) => {
  const {
    key,
    type,
    value,
    oldValue,
    children,
  } = obj;
  if (Array.isArray(children)) {
    path.push(key);
  } else {
    path.pop();
  }
  if (type === 'object') {
    const flatChildren = children.flatMap((child) => getStyle(child, path));
    const filteredArray = flatChildren.filter((child) => child !== undefined);
    return `${filteredArray.join('\n')}`;
  }
  const parent = path.join('.');
  let fullPath = `${parent}.${key}`;
  if (fullPath.startsWith('.')) {
    fullPath = fullPath.slice(1);
  }
  if (type === 'deleted') {
    return `Property '${fullPath}' was removed`;
  }
  if (type === 'added') {
    return `Property '${fullPath}' was added with value: ${getValue(value)}`;
  }
  if (type === 'changed') {
    return `Property '${fullPath}' was updated. From ${getValue(oldValue)} to ${getValue(value)}`;
  }
};

export default (diff) => {
  const result = diff.map((node) => getStyle(node));
  return `\n${result.join('\n')}\n`;
};
