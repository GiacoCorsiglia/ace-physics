#! /usr/bin/env bash
set -e
set -o pipefail

docker run --name ddb -d -p 8000:8000 amazon/dynamodb-local --wait

echo "Testing"
# aws dynamodb list-tables --no-cli-pager --endpoint-url http://localhost:8000
# # curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000

# echo "Continuing"
max_retry=30
counter=0
until [[ "$( curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000 )" == "400" ]]
do
  sleep 1
  [[ counter -eq $max_retry ]] && echo "Failed!" && exit 1
  echo "Trying again. Try #$counter"
  (( counter++ ))
done

# echo "hi";

docker stop ddb
docker remove ddb
