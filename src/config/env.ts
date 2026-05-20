import { z } from "zod";

// 定義你需要的所有環境變數
export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 這裡填補原有的函式接口，確保程式不會報 "Module not found" 錯誤
export const getTursoConnectionConfig = () => ({
  url: "",
  authToken: "",
});

export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
