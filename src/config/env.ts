import { z } from "zod";

export const environmentSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
  SKYSCANNER_API_KEY: z.string().min(1),
  DESTINATION_AIRPORT_CODE: z.string().min(1).default("CGO"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),
  RSS_FEED_URLS: z.string().optional(),
  SCHEDULER_LEASE_DURATION_MS: z.string().optional(),
  SERPAPI_API_KEY: z.string().optional(),
  BUSINESS_DEAL_MIN_CONFIDENCE: z.string().optional(),
  BUSINESS_DEAL_THRESHOLD_GBP: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

export const loadEnvironment = () => environmentSchema.parse(process.env) as any;

export const getTursoConnectionConfig = () => ({ url: "", authToken: "" } as any);

export const getConfig = () => ({
  env: loadEnvironment(),
  db: getTursoConnectionConfig(),
} as any);

export const runBusinessDeals = async (...args: any[]) => {
    console.log("Running job...");
};

export const runBusinessDealsJob = runBusinessDeals as any;
