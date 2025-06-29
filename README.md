# Photo Genie

A Node.js CLI providing photo utilities. Each utility lives in its own folder inside `src/utils` and exposes an `index.ts` entry point with a brief README.

## Development

Install dependencies and build the CLI:

```bash
npm install
npm run build
```

During development you can run the CLI via ts-node:

```bash
npm run dev -- delete-arw <directory>
```

## Utilities

### delete-arw

Deletes `.ARW` files when a JPEG of the same name is not present. See the [utility README](src/utils/delete-arw/README.md) for details.

