import _ from 'lodash';

const buildTreeOfChanges = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const sortKeys = _.sortBy(_.union(keys));
  const nodes = sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'object',
        children: buildTreeOfChanges(value1, value2),
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      };
    }
    return {
      key,
      type: 'changed',
      value: value2,
      oldValue: value1,
    };
  });
  return nodes;
};

export default buildTreeOfChanges;
