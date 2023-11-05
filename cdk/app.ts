import * as cdk from "aws-cdk-lib"

import { PulumiStack } from "./stacks/pulumi.stack"
import { SlackBotStack } from "./stacks/slack-bot.stack"

const app = new cdk.App()
new SlackBotStack(app, "SlackBotStack")
new PulumiStack(app, "PulumiStack")
