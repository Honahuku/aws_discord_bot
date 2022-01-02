#!/bin/bash

# 変数$1はこのスクリプトの第1引数
# $1の中身がある場合
if [ -n "$1" ]; then

    # 変数responseにAWSコマンドの結果を格納
    response=$(aws ec2 --profile ap-northeast-1 describe-instances --instance-id $1 --query 'Reservations[*].Instances[*].PublicIpAddress' --output text)
    
    # AWSコマンドからの応答に中身がある場合
    if [ -n "$response" ]; then
    echo $response

    # AWSコマンドから文字列が返って来なかった場合
    elif [ -z "$STRING" ]; then
    echo "null"
    fi

# $1の中身が無い場合
elif [ -z "$1" ]; then
  echo "Value has not been entered"
fi