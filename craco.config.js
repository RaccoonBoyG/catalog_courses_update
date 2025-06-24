// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Меняем путь для JS, CSS, изображений и шрифтов
      webpackConfig.output.filename = 'cstatic/js/[name].[contenthash:8].js';
      webpackConfig.output.chunkFilename = 'cstatic/js/[name].[contenthash:8].chunk.js';

      // Настройка для медиа файлов (изображения, шрифты)
      webpackConfig.module.rules.forEach(rule => {
        if (rule.oneOf) {
          rule.oneOf.forEach(oneOfRule => {
            // Для больших файлов (asset/resource)
            if (oneOfRule.type === 'asset/resource') {
              oneOfRule.generator = oneOfRule.generator || {};
              oneOfRule.generator.filename = 'cstatic/media/[name].[hash:8][ext]';
            }
            // Для файлов с условием размера (asset)
            if (oneOfRule.type === 'asset' && oneOfRule.parser && oneOfRule.parser.dataUrlCondition) {
              oneOfRule.generator = oneOfRule.generator || {};
              oneOfRule.generator.filename = 'cstatic/media/[name].[hash:8][ext]';
            }
            // Для inline файлов (asset/inline) - если нужно переопределить
            if (oneOfRule.type === 'asset/inline') {
              oneOfRule.generator = oneOfRule.generator || {};
              oneOfRule.generator.filename = 'cstatic/media/[name].[hash:8][ext]';
            }
          });
        }
      });

      // Настройка для CSS файлов
      const miniCssExtractPlugin = webpackConfig.plugins.find(
        plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
      );

      if (miniCssExtractPlugin) {
        miniCssExtractPlugin.options.filename = 'cstatic/css/[name].[contenthash:8].css';
        miniCssExtractPlugin.options.chunkFilename = 'cstatic/css/[name].[contenthash:8].chunk.css';
      }

      return webpackConfig;
    },
  },
};