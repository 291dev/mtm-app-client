#!/bin/bash

#prerequisite ibmcloud login
#latestCommit=`git log | head -1 | awk '{print $2}'`
#echo $latestCommit
export NODE_ENV_FLAG=0

npm install
ibmcloud target --cf
npm run build
cp ./serve_module/package.json ./build/
npm --prefix ./build  install ./build
ibmcloud cf push
echo "pushed"
