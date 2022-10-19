module.exports = {
  core: {
    builder: {
      name: 'webpack5',
      options: {
        fsCache: true,
      },
    },
  },
  features: { storyStoreV7: true },
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/web-components',
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('postcss-import'),
                require('tailwindcss')('./tailwind.config.js'),
                require('postcss-nested'),
                require('postcss-custom-properties'),
                require('autoprefixer'),
                require('postcss-discard-comments'),
              ],
            },
            sourceMap: true,
          },
        },
      ],
    });

    return config;
  },
};
