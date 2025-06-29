import { promises as fs } from 'fs';
import { extname, join } from 'path';
import { Command } from 'commander';
import BlurryDetector from 'blurry-detector';

export interface BlurResult {
  file: string;
  score: number;
}

/**
 * Get JPEG files sorted from most blurry to least blurry.
 * @param dir directory to scan
 */
export async function listBlurryFiles(dir: string): Promise<BlurResult[]> {
  const files = await fs.readdir(dir);
  const jpegs = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return ext === '.jpeg' || ext === '.jpg';
  });

  const detector = new BlurryDetector();
  const results: BlurResult[] = [];
  for (const file of jpegs) {
    const path = join(dir, file);
    const variance = await detector.computeLaplacianVariance(path);
    results.push({ file, score: variance });
  }

  results.sort((a, b) => a.score - b.score);
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
