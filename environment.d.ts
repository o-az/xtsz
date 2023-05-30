interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'test' | 'production'
  readonly CI: boolean | 'true' | 'false'
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariables
}
