const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

// Primero aplica la configuración de Reanimated
config = wrapWithReanimatedMetroConfig(config);

// Luego aplica la configuración de NativeWind
config = withNativeWind(config, { input: "./global.css" });

module.exports = config;
