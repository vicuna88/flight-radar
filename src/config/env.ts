import { z } from "zod";

// 定義環境變數架構
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 確保匯出的函式名稱與報錯中要求的完全一致
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

export const loadEnvironment = () => {
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
