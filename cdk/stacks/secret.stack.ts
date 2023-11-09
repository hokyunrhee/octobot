import * as cdk from "aws-cdk-lib"
import * as sm from "aws-cdk-lib/aws-secretsmanager"
import { Construct } from "constructs"

interface Props extends cdk.StackProps {
  grantee: cdk.aws_iam.IGrantable
}

export class SecretStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const secret = new sm.Secret(this, "Secret", {
      secretObjectValue: {},
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    secret.grantRead(props.grantee)
  }
}
