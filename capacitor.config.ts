import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.personal.taskmanager',
  appName: 'Personal Task Manager',
  webDir: 'out',
  server: {
    cleartext: true
  }
};

export default config;
