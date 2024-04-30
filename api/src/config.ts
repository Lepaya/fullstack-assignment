const PORT = process.env.PORT ?? 3033

export const config = {
  host: process.env.HOST || `http://localhost:${PORT}`,
  port: PORT,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433,
    database: process.env.DB_NAME || "fruity",
    user: process.env.DB_USER || "candidate",
    password: process.env.DB_PASSWORD || "candidate",
  },
}
