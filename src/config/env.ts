import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 這些函式必須導出，否則其他檔案會報錯找不到
export const getTursoConnectionConfig = () => ({
  url: "",
  authToken: "",
});

export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
