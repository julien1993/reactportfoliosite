const db = {
  "protocol":process.env.DB_PROTOCOL,
  "username":process.env.DB_USERNAME,
  "password":process.env.DB_PASSWORD,
  "url1":process.env.DB_URL1,
  "url2":process.env.DB_URL2,
  "url3":process.env.DB_URL3,
  "port1":process.env.DB_PORT1,
  "port2":process.env.DB_PORT2,
  "port3":process.env.DB_PORT3,
  "name":process.env.DB_NAME,
  "replicaset":process.env.DB_REPLICA_SET,
  "authsource":process.env.DB_AUTH_SOURCE
}

const port = process.env.PORT;

const sessionsecret = process.env.APP_SECRET;

const appname = process.env.APP_NAME

module.exports={db, port, sessionsecret, appname}
