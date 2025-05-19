import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.personal.taskmanager',
  appName: 'Personal Task Manager',
  webDir: 'out',
  server: {
    url: 'https://personal-task-manager-ten.vercel.app/',
    cleartext: true
  }
};

export default config;
