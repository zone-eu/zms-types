# @zone-eu/types

Shared TypeScript types for the ZMS stack: WildDuck, ZoneMTA, ZMS
plugins, and related packages.

This package only publishes declarations. Add stack-specific types under `src/`,
export them from `src/index.ts`, and run:

```sh
npm run build
```

The build emits `.d.ts` files into `dist/`.
