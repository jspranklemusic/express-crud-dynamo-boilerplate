# java, node.js must be installed
if [ -f prod.env ]; then
  export $(echo $(cat prod.env | sed 's/#.*//g'| xargs) | envsubst)
fi

export PORT=80
sudo node index.js
