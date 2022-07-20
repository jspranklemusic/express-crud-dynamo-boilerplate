# java, node.js must be installed
if [ -f local.env ]; then
  export $(echo $(cat local.env | sed 's/#.*//g'| xargs) | envsubst)
fi

export PORT=3000
export LOCAL_DB_URL="/Users/josiahsprankle/dynamodb/DynamoDBLocal_lib"
export CURR_DIRECTORY=`pwd`
cd "$LOCAL_DB_URL/../"
java -Djava.library.path="$LOCAL_DB_URL" -jar DynamoDBLocal.jar -sharedDb &
cd $CURR_DIRECTORY
nodemon index.js
pkill -f "/usr/bin/java -Djava.library.path=$LOCAL_DB_URL -jar DynamoDBLocal.jar -sharedDb"
