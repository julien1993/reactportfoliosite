const db = {
  "protocol":process.env.DB_PROTOCOL,
  "username":process.env.DB_USERNAME,
  "password":process.env.DB_PASSWORD,
  "url":process.env.DB_URL,
  "port":process.env.DB_PORT,
  "name":process.env.DB_NAME,
}

const port = process.env.PORT;

const sessionsecret = process.env.APP_SECRET;

const appname = process.env.APP_NAME

module.exports={db, port, sessionsecret, appname}
