import { z } from "zod";

export const environmentSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1),
  DISCORD_WEBHOOK_URL: z.string().url(),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  LIMIT_DAYS: z.coerce.number().int().positive().default(30),
});

export type Environment = z.infer<typeof environmentSchema>;

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
