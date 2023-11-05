import * as cdk from "aws-cdk-lib"

import { SlackBotStack } from "./stacks/slack-bot.stack"

const app = new cdk.App()
new SlackBotStack(app, `SlackBotStack`)
