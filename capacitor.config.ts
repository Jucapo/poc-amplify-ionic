import type { CapacitorConfig } from '@capacitor/cli';

interface CustomCapacitorConfig extends CapacitorConfig {
  bundledWebRuntime?: boolean;
}

const config: CustomCapacitorConfig = {
  appId: 'com.jucapo.poc',
  appName: 'poc-amplify-ionic',
  webDir: 'www',
  bundledWebRuntime: false,
};

export default config;
