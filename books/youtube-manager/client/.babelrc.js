module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: {
              version: 2,
            },
            targets: { node: 'current' },
          },
        ],
      ],
    },
  },
};

