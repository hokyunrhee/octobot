import * as cdk from "aws-cdk-lib"

import { OctobotStack } from "./stacks/octobot.stack"

const app = new cdk.App()
new OctobotStack(app, "OctobotStack")
