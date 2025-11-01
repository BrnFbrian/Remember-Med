/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Main Colors
export const MainColors = {
  teal: '#20C9C9',
  lightBlueBase: '#07BEC8',
  lightBlueLight: '#10E3EE',
  darkBlueBase: '#334FDC',
  darkBlueLight: '#6E83EC',
};

// Grayscale
export const Grayscale = {
  gray100: '#17222B',
  gray200: '#293C4C',
  gray300: '#4D708F',
  gray400: '#A2B9CD',
  gray500: '#CAD7E2',
  gray600: '#D7E1EA',
  gray700: '#E8EEF3',
  gray800: '#F8FAFB',
};

const tintColorLight = MainColors.darkBlueBase;
const tintColorDark = MainColors.darkBlueLight;

export const Colors = {
  light: {
    text: Grayscale.gray100,
    background: '#fff',
    white: '#FFFFFF',
    tint: tintColorLight,
    icon: Grayscale.gray300,
    tabIconDefault: Grayscale.gray400,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: Grayscale.gray800,
    background: Grayscale.gray100,
    tint: tintColorDark,
    icon: Grayscale.gray400,
    tabIconDefault: Grayscale.gray400,
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
