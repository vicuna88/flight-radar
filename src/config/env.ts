import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1), // 這裡會自動對應到你剛設定的 Secret
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

export const getTursoConnectionConfig = () => ({
  url: "",
  authToken: "",
});

export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
