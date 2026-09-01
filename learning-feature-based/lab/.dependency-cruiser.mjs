/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    {
      name: 'app-dependencies', severity: 'error', from: { path: '^src/app/' },
      to: {
        pathNot: [
          '^src/app/',
          '^src/features/[^/]+/index\.(?:ts|tsx)$',
          '^src/features/[^/]+/index\.server\.ts$',
          '^src/entities/[^/]+/index\.(?:ts|tsx)$',
          '^src/shared/',
        ],
        dependencyTypes: ['local', 'localmodule'],
      },
    },
    {
      name: 'feature-dependencies', severity: 'error', from: { path: '^src/features/([^/]+)/' },
      to: {
        pathNot: [
          '^src/features/$1/',
          '^src/entities/[^/]+/index\.(?:ts|tsx)$',
          '^src/shared/',
        ],
        dependencyTypes: ['local', 'localmodule'],
      },
    },
    {
      name: 'entity-dependencies', severity: 'error', from: { path: '^src/entities/([^/]+)/' },
      to: {
        pathNot: ['^src/entities/$1/', '^src/shared/'],
        dependencyTypes: ['local', 'localmodule'],
      },
    },
    {
      name: 'shared-dependencies', severity: 'error', from: { path: '^src/shared/' },
      to: { pathNot: '^src/shared/', dependencyTypes: ['local', 'localmodule'] },
    },
  ],
  options: {
    includeOnly: '^src/',
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
  },
}

export default config
