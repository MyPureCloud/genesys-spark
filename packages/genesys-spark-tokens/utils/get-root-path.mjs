import path from 'path';
import { fileURLToPath } from 'url';

export function getRootPath() {
  const filepath = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filepath);

  return path.resolve(dirname, '../');
}
