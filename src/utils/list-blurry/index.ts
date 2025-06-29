import { promises as fs } from 'fs';
import { extname, join } from 'path';
import { Command } from 'commander';
import { getBlurrinessAsync } from '@bstrickl/blurriness';

export interface BlurResult {
  file: string;
  score: number;
}

/**
 * Get JPEG files sorted by blurriness descending.
 * @param dir directory to scan
 */
export async function listBlurryFiles(dir: string): Promise<BlurResult[]> {
  const files = await fs.readdir(dir);
  const jpegs = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return ext === '.jpeg' || ext === '.jpg';
  });

  const results: BlurResult[] = [];
  for (const file of jpegs) {
    const path = join(dir, file);
    const score = await getBlurrinessAsync(path);
    results.push({ file, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

const command = new Command('list-blurry')
  .argument('<dir>', 'directory to scan')
  .description('List JPEGs sorted by blurriness (most blurry first)')
  .action(async (dir: string) => {
    const results = await listBlurryFiles(dir);
    for (const { file, score } of results) {
      console.log(`${file}: ${score.toFixed(4)}`);
    }
  });

export default command;
