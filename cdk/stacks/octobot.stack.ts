import * as path from "path"
import * as cdk from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs"
import * as logs from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"

export class OctobotStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const handler = new nodejs.NodejsFunction(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      memorySize: 1024,
      architecture: lambda.Architecture.X86_64,
      entry: path.join(__dirname, "../../src/app.ts"),
      handler: "handler",
      logRetention: logs.RetentionDays.ONE_MONTH,
    })

    const restApi = new apigateway.RestApi(this, "OctobotRestApi")
    const slackEvents = restApi.root.addResource("slack").addResource("events")
    slackEvents.addMethod("POST", new apigateway.LambdaIntegration(handler))
  }
}
