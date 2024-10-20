import * as process from 'node:process';

export default () => (
  {
    port: process.env.PORT,
    db_host: process.env.DATABASE_HOST,
    db_port: process.env.DATABASE_PORT,
    db_user: process.env.DATABASE_USER,
    db_password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
    secret_jwt: process.env.SECRET_JWT,
    expire_jwt: process.env.EXPIRE_JWT,
  }
)