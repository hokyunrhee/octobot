import * as path from "path"
import * as cdk from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as logs from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"

export class SlackBotStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromDockerBuild(path.join(__dirname, "../../slack-app"), {
        platform: lambda.Architecture.X86_64.dockerPlatform,
        imagePath: "/var/task",
      }),
      handler: "app.handler",
      logRetention: logs.RetentionDays.ONE_MONTH,
      memorySize: 1024,
      architecture: lambda.Architecture.X86_64,
    })

    new apigateway.LambdaRestApi(this, `RestApi`, { handler })
  }
}
