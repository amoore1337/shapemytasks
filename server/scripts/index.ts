import { existsSync } from 'fs';
import path from 'path';

const [_npm, _scripts, filename, ...args] = process.argv;

const file = path.resolve('./scripts', filename);
try {
  if (existsSync(file)) {
    require(file).default(...(args ?? []));
  } else {
    console.error(`No script found with name '${filename}'`);
  }
} catch (err) {
  console.error(err);
}
