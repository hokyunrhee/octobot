import * as cdk from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import { Construct } from "constructs"

interface Props extends cdk.StackProps {
  handler: cdk.aws_lambda.IFunction
}

export class RestApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const restApi = new apigateway.RestApi(this, "RestApi")
    const slackEvents = restApi.root.addResource("slack").addResource("events")
    slackEvents.addMethod("POST", new apigateway.LambdaIntegration(props.handler))
  }
}
