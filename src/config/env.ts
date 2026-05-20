import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 強制匯出這些函式，滿足其他檔案的需求
export const getTursoConnectionConfig = () => ({
  url: "",
  authToken: "",
});

export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
