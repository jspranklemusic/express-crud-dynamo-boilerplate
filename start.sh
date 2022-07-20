# java, node.js must be installed
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

export PORT=80
node index.js
