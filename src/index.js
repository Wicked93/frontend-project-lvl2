import path from 'path';
import fs from 'fs';
import buildTreeOfChanges from './buildTreeOfChanges.js';
import parsers from './parsers.js';
import getFormatter from './formatters/index.js';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const getExtName = (filePath) => path.basename(filePath);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const dataOfFile1 = fs.readFileSync(getPath(filepath1), 'utf-8');
  const extName1 = getExtName(filepath1);
  const dataOfFile2 = fs.readFileSync(getPath(filepath2), 'utf-8');
  const extName2 = getExtName(filepath2);
  const obj1 = parsers(dataOfFile1, extName1);
  const obj2 = parsers(dataOfFile2, extName2);
  const diff = buildTreeOfChanges(obj1, obj2);
  return getFormatter(diff, formatName);
};
