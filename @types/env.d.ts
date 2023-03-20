declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test' | 'staging';
      HOST: string;
      PORT: number;
      FE_URL: string;
      POSTGRES_URL: string;
    }
  }
}
export = NodeJS;
