interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'test' | 'production'
  readonly CI: boolean | 'true' | 'false'
}

// rome-ignore lint/nursery/noNamespace: <explanation>
declare module NodeJS {
  type ProcessEnv = EnvironmentVariables
}
