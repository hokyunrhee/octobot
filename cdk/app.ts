import * as cdk from "aws-cdk-lib"

import { OctobotStack } from "./stacks/octobot.stack"
import { SecretStack } from "./stacks/secret.stack"

const app = new cdk.App()
const octobotStack = new OctobotStack(app, "OctobotStack")
new SecretStack(app, "SecretStack", { grantee: octobotStack.nodejsFunction })
