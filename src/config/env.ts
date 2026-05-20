import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 這些空的函數是為了滿足程式碼其他部分的呼叫需求，防止報錯
export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });
export const loadEnvironment = () => environmentSchema.parse(process.env);
export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
