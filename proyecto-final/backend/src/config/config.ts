import 'dotenv/config'

interface DbConfig {
  db_name: string;
  db_user: string;
  db_password: string;
  db_host: string;
  db_port: number;
}

interface AppConfig extends DbConfig {
  api_port: number;
  email_host: string;
  email_port: number;
  email_secure: boolean;
  email_user: string;
  email_password: string;
  email_link_confirm: string;
  email_from_confirm: string;
  email_from_mailing: string;
}


const config: AppConfig  = {

    api_port: Number(process.env.API_PORT ?? 3000),

  db_host: process.env.DB_HOST ?? "localhost",
  db_user: process.env.DB_USER ?? "root",
  db_password: process.env.DB_PASS ?? "",
  db_name: process.env.DB_NAME ?? "mydb",
  db_port: Number(process.env.DB_PORT ?? 3306),

  email_host: process.env.EMAIL_HOST ?? "",
  email_port: Number(process.env.EMAIL_PORT ?? 587),
  email_secure: process.env.EMAIL_SECURE?.toUpperCase() === "TRUE",
  email_user: process.env.EMAIL_USER ?? "",
  email_password: process.env.EMAIL_PASSWORD ?? "",
  email_link_confirm: process.env.EMAIL_LINK_CONFIRM ?? "",
  email_from_confirm: process.env.EMAIL_FROM_CONFIRM ?? "",
  email_from_mailing: process.env.EMAIL_FROM_MAILING ?? "",

}

export default config
