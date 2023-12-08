// import { useRouter } from "next/router"
// import { useEffect, type ReactNode } from "react"

// import { Routes } from "~/configuration"
// import { useWeb3AuthSigner } from "~/context/web3-auth-signer"

// export default function LoginGuard({ children }: { children: ReactNode }) {
//   const { web3AuthSigner } = useWeb3AuthSigner()
//   const router = useRouter()

//   const isLogin = web3AuthSigner !== undefined //ok
//   const isProtectedRoute = router.pathname.startsWith(Routes.wallet.root)
//   const isUnauthorized = !isLogin && isProtectedRoute

//   useEffect(() => {
//     if (isUnauthorized) {
//       router.replace(Routes.login).catch(console.error)
//     }
//   }, [isUnauthorized, router])

//   if (isUnauthorized) {
//     return null
//   }

//   return <>{children}</>
// }
