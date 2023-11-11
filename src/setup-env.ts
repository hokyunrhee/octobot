import { getSecret } from "./utils"

export const setupEnv = async () => {
  const secret = await getSecret(process.env.SECRET_ARN)
  Object.entries(secret).forEach(([key, value]) => (process.env[key] = value))

  await import("./env")
}
