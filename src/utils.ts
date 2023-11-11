import { readFileSync } from "fs"
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"

export const getSecret = async <T extends Record<string, string>>(secretArn: string) => {
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  })
  const input = { SecretId: secretArn }
  const command = new GetSecretValueCommand(input)
  const response = await client.send(command)
  const secret = response.SecretString

  return JSON.parse(secret as string) as T
}

export const readFile = (path: string) => {
  return readFileSync(path, { encoding: "utf8", flag: "r" })
}
