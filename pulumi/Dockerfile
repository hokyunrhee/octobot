FROM public.ecr.aws/lambda/nodejs:18

COPY . ${LAMBDA_TASK_ROOT}

# RUN yum -y update && yum install -y gzip tar
# RUN curl -fsSL https://get.pulumi.com | sh
RUN npm install
RUN npm run build
RUN mv ${LAMBDA_TASK_ROOT}/dist/* ${LAMBDA_TASK_ROOT}/
RUN rm -r ${LAMBDA_TASK_ROOT}/src
 
CMD [ "app.handler" ]