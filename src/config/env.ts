import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
});

export type Environment = z.infer<typeof environmentSchema>;

// 下面這些函式必須保留，即使你現在沒在用資料庫，程式碼的其他部分也在找它們
export const getTursoConnectionConfig = () => ({ url: "", authToken: "" });
export const loadEnvironment = () => environmentSchema.parse(process.env);
export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
});
