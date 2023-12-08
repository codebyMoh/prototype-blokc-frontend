/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type NextPage, type Metadata } from "next"
import { type AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, type ReactElement, type ReactNode } from "react"
import { WalletProvider } from "~/components/WalletContext"
// import LoginGuard from "~/components/login-guard";
import { Web3AuthSignerProvider } from "~/context/web3-auth-signer"
import "~/styles/globals.css"

export const metadata: Metadata = {
  manifest: "/public/manifest.webmanifest",
}

const queryClient = new QueryClient()
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "ServiceWorker registered with scope:",
              registration.scope,
            )
          })
          .catch((error) => {
            console.error("ServiceWorker registration failed:", error)
          })
      })
    }
  }, [])

  const router = useRouter()

  return (
    <>
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {router.pathname === "/wallet" && (
          <>
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="../../public/icon-192x192.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="../../public/icon-256x256.png"
            />
          </>
        )}

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="manifast" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      </Head>

      <Web3AuthSignerProvider>
        <QueryClientProvider client={queryClient}>
          {/*<LoginGuard>*/}
          <WalletProvider>
            <div className="md:flex md:min-h-screen md:items-center md:justify-center">
              <div>{getLayout(<Component {...pageProps} />)}</div>
            </div>
          </WalletProvider>
          {/*</LoginGuard>*/}
        </QueryClientProvider>
      </Web3AuthSignerProvider>
    </>
  )
}

export default MyApp

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

//_app.tsx
