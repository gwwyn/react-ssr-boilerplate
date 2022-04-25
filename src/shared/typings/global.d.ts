declare global {
  interface Window {
    __INITIAL_DATA__?: Record<string, unknown> | undefined
  }
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string | string[]
      NODE_ENV: 'development' | 'production' | 'test'
      PORT?: string
    }
  }
}

export default {}
