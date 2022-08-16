import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath, pathOfFile) => {
  let file;
  const typeOfFile = path.extname(filepath);
  if (typeOfFile === '.json') {
    file = JSON.parse(fs.readFileSync(pathOfFile, 'utf-8'));
  }
  if (typeOfFile === '.yml' || typeOfFile === '.yaml') {
    file = yaml.load(fs.readFileSync(pathOfFile, 'utf-8'));
  }
  return file;
};
