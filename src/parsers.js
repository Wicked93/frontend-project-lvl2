import yaml from 'js-yaml';

export default (path, extName) => {
  if (extName.includes('json')) {
    return JSON.parse(path);
  }
  if (extName.includes('yml') || extName.includes('yaml')) {
    return yaml.load(path);
  }
  return Error(`Format ${extName} is not found`);
};
