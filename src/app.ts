import { App } from "@slack/bolt"
import AwsLambdaReceiver, { AwsHandler } from "@slack/bolt/dist/receivers/AwsLambdaReceiver"

import { setupEnv } from "./setup-env"

const awsHandler = setupEnv().then(async () => {
  const receiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  })

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver,
  })

  app.message("echo", async ({ message, say }) => {
    if (message.subtype === undefined || message.subtype === "bot_message") {
      await say(`<@${message.user}> :wave: ${message.text}`)
    }
  })

  return await receiver.start()
})

export const handler: AwsHandler = async (event, context, callback) => {
  const handler = await awsHandler

  return handler(event, context, callback)
}
