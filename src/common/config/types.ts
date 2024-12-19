export interface DatabaseConfig {
  url: string,

}

export interface AppConfig {
  database: DatabaseConfig,
  port: string,
}
