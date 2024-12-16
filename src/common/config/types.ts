export interface DatabaseConfig {
  url: string,

}
export interface AuthConfig {
  clientId: string,
  authority: string,
  clientSecret: string

}
export interface MsalConfig {
  auth: AuthConfig
}

export interface AppConfig {
  database: {
  },
  port: string,
  msalConfig: MsalConfig
}
}
