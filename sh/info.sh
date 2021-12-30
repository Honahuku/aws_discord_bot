#!/bin/bash
if [ -n "$1" ]; then
    response=$(aws ec2 --profile ap-northeast-1 describe-instances --instance-id $1 --query Reservations[*].Instances[*].State.Name --output text)
    if [ -n "$response" ]; then
    echo $response
    elif [ -z "$STRING" ]; then
    echo "null"
    fi
elif [ -z "$1" ]; then
  echo "Value has not been entered"
fi