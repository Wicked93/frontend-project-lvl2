import yaml from 'js-yaml';

export default (path, extName) => {
  if (extName === '.json') {
    return JSON.parse(path);
  }
  if (extName === '.yml' || extName === '.yaml') {
    return yaml.load(path);
  }
  return Error(`Format ${extName} is not found`);
};
