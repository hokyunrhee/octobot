FROM public.ecr.aws/lambda/nodejs:18

COPY package.json app.js ${LAMBDA_TASK_ROOT}

RUN npm install
 
CMD [ "app.handler" ]