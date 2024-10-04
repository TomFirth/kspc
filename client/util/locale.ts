import { Platform, NativeModules } from 'react-native'
// import { Localization } from 'expo';

export const getLocale = (): string => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier;
  }
  return 'en-GB';
}