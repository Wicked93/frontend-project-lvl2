import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), `./__fixtures__/${filePath}`);
};

export default (file) => {
  const content = fs.readFileSync(getPath(file), 'utf-8');
  if (path.extname(file) === '.json') {
    return JSON.parse(content);
  }
  if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
    return yaml.load(content);
  }
  return false;
};
