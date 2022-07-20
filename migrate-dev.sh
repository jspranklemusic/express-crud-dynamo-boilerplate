if [ -f .local.env ]; then
  export $(echo $(cat .local.env | sed 's/#.*//g'| xargs) | envsubst)
fi
node db/migrate.js
export CURR_DIRECTORY=`pwd`
cd "$LOCAL_DB_URL/../"
java -Djava.library.path="$LOCAL_DB_URL" -jar DynamoDBLocal.jar -sharedDb &
cd $CURR_DIRECTORY
node db/migrate.js
pkill -f "/usr/bin/java -Djava.library.path=$LOCAL_DB_URL -jar DynamoDBLocal.jar -sharedDb"
