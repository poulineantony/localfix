const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 */
const config = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'ttf', 'otf', 'json', 'xml', 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
