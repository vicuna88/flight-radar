import { z } from "zod";

// 1. 定義環境變數
export const environmentSchema = z.object({
  DATABASE_URL: z.string().optional(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
  DISCORD_WEBHOOK_URL: z.string().url(),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  LIMIT_DAYS: z.coerce.number().int().positive().default(30),
});

export type Environment = z.infer<typeof environmentSchema>;

// 2. 這是讓其他檔案能找到資料庫的關鍵函式
export interface TursoConnectionConfig {
  url: string;
  authToken: string;
}

export const getTursoConnectionConfig = (): TursoConnectionConfig => {
  return {
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN || "",
  };
};

export const loadEnvironment = (): Environment => {
  return environmentSchema.parse(process.env);
};

export interface AppConfig {
  env: Environment;
  db: TursoConnectionConfig;
}

export const getConfig = (): AppConfig => {
  return {
    env: loadEnvironment(),
    db: getTursoConnectionConfig(),
  };
};
