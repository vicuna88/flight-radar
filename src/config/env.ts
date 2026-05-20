import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 為了避開 Module not found 錯誤，我們必須匯出這些函式，即便目前沒用到資料庫
export const getTursoConnectionConfig = () => ({
  url: "",
  authToken: "",
});

export const loadEnvironment = () => environmentSchema.parse(process.env);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
