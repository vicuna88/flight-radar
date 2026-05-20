import { z } from "zod";

export const environmentSchema = z.object({
  // ... 其他設定保持不變 ...
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"), // 這裡改為 CGO
  LIMIT_DAYS: z.coerce.number().int().positive().default(30),
});

export type Environment = z.infer<typeof environmentSchema>;

export interface AppConfig {
  env: Environment;
}

export const getConfig = (): AppConfig => {
  const env = environmentSchema.parse(process.env);
  return {
    env,
  };
};
