import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  DATABASE_URL: z.string().optional(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

export interface TursoConnectionConfig {
  url: string;
  authToken: string;
}

// 補上專案需要的這些函式
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
