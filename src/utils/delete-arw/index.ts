import { promises as fs } from 'fs';
import { extname, join } from 'path';

/**
 * Delete `.ARW` files that don't have matching JPEGs.
 * @param dir Directory to process
 */
export async function deleteOrphanArw(dir: string): Promise<void> {
  const files = await fs.readdir(dir);
  const jpegs = new Set(
    files
      .filter((f) => extname(f).toLowerCase() === '.jpeg' || extname(f).toLowerCase() === '.jpg')
      .map((f) => f.replace(/\.(jpeg|jpg)$/i, ''))
  );

  await Promise.all(
    files
      .filter((f) => extname(f).toLowerCase() === '.arw')
      .map(async (f) => {
        const base = f.replace(/\.arw$/i, '');
        if (!jpegs.has(base)) {
          await fs.unlink(join(dir, f));
        }
      })
  );
}
