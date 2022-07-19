if [ -f .env ]; then
  export $(echo $(cat .local.env | sed 's/#.*//g'| xargs) | envsubst)
fi
node db/migrate.js
