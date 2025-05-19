import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.personal.taskmanager',
  appName: 'personal-task-manager',
  webDir: 'public',
  
  server: {
    url: 'https://personal-task-manager.ir', // your deployed site
    cleartext: true
  }
};

export default config;
