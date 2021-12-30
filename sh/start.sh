#!/bin/bash
if [ -n "$1" ]; then
    response=$(aws ec2 --profile ap-northeast-1 start-instances --instance-ids $1 --output text)
    if [ -n "$response" ]; then
    echo $response
    elif [ -z "$STRING" ]; then
    echo "null"
    fi
elif [ -z "$1" ]; then
  echo "Value has not been entered"
fi