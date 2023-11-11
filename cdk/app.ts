import * as cdk from "aws-cdk-lib"

import { LambdaStack } from "./stacks/lambda.stack"
import { RestApiStack } from "./stacks/rest-api.stack"
import { SecretStack } from "./stacks/secret.stack"

const app = new cdk.App()
const secretStack = new SecretStack(app, "SecretStack")
const lambdaStack = new LambdaStack(app, "LambdaStack", { secret: secretStack.secret })
new RestApiStack(app, "RestApiStack", { handler: lambdaStack.nodejsFunction })
