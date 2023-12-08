import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_ZERODEV_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_WEB3AUTH_CLIENTID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ID: z.string().min(1),
    NEXT_PUBLIC_APP_ALCHEMY_KEY: z.string().min(1),
    NEXT_PUBLIC_BACKEND_URL: z.string().min(1),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_MORALIS_API_KEY: z.string().min(1),
    //NEXT_PUBLIC_password: z.string().min(1),
    //NEXT_PUBLIC_MongodbUsename: z.string().min(1),
    //NEXT_PUBLIC_PORT: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ZERODEV_PROJECT_ID: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
    NEXT_PUBLIC_WEB3AUTH_CLIENTID: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_APP_ALCHEMY_KEY: process.env.NEXT_PUBLIC_APP_ALCHEMY_KEY,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_MORALIS_API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    //NEXT_PUBLIC_password: process.env.NEXT_PUBLIC_password,
    //NEXT_PUBLIC_MongodbUsename: process.env.NEXT_PUBLIC_MongodbUsename,
    //NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
