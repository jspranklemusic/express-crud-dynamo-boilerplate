if [ -f .prod.env ]; then
  export $(echo $(cat .prod.env | sed 's/#.*//g'| xargs) | envsubst)
fi
node db/migrate.js
