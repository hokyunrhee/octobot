import * as cdk from "aws-cdk-lib"
import * as sm from "aws-cdk-lib/aws-secretsmanager"
import { Construct } from "constructs"

export class SecretStack extends cdk.Stack {
  public secret: sm.Secret

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const secret = new sm.Secret(this, "Secret", {
      secretObjectValue: {},
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    this.secret = secret
  }
}
