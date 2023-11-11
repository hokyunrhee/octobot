// This script will run immediately on import.

import { z } from "zod"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const envVariables = z.object({
  // Secret
  SLACK_SIGNING_SECRET: z.string().min(1),
  SLACK_BOT_TOKEN: z.string().min(1),

  // AWS Lambda Reserved environment variable
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_SESSION_TOKEN: z.string().min(1),

  // AWS Lambda user environment variable
  SECRET_ARN: z.string().min(1),
})

envVariables.parse(process.env)
