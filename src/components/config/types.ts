export enum ConfigType {
	Server = "server",
	Db = "db",
	Redis = "redis",
	Services = "services"
}

export interface DbConfig extends BaseConfig {
	type: string;
	host: string;
	database: string;
	username: string;
	password: string;
}

export interface ConfigDictionary {
	[key: string]: BaseConfig;
}

export interface ServicesConfig extends BaseConfig {
	observer: string;
}

export interface BaseConfig {}

export interface ServerConfig extends BaseConfig {
	host: string;
	port: number;
}

export interface DbConfig extends BaseConfig {
	host: string;
	port: number;
	database: string;
	username: string;
	password: string;
}

interface EntryLogConfig {
	type: string;
	filename: string;
	level: string;
}

export interface LogConfig extends BaseConfig {
	[key: string]: EntryLogConfig;
}

export interface RedisConfig extends BaseConfig {
	host: string;
	port: number;
	keyPrefix: string;
}

export interface ProviderConfig extends BaseConfig {
	issuer: string;
	cookieSecret: string;
	clients: Array<{
		client_id: string;
		client_secret: string;
		grant_types: string[];
		response_types: string[];
		redirect_uris: string[];
		db: DbConfig;
	}>;
}
