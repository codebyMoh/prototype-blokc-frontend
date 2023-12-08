/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/consistent-type-imports */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { SafeEventEmitterProvider } from "@web3auth/base"
import {
  Web3AuthMPCCoreKit,
  WEB3AUTH_NETWORK,
  COREKIT_STATUS,
  type SubVerifierDetailsParams,
} from "@web3auth/mpc-core-kit"
import { providers } from "ethers"
import { Loader2 } from "lucide-react"
import Head from "next/head"
import Image, { type StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

import logo from "../../public/icon/Logo.svg"
import google from "../../public/icon/google.svg"
import {
  type Wallet1,
  WalletContext,
  type WalletContextType,
} from "~/components/WalletContext"
import { Routes } from "~/configuration"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"
import { env } from "~/env.mjs"

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/consistent-type-imports */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export default function Page() {
  const router = useRouter()
  //const {  } = useContext(WalletContext) ?? {}
  const contextData = useContext(WalletContext) as WalletContextType
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const setUserinfo = contextData?.setUserinfo
  const { setWeb3AuthSigner } = useWeb3AuthSigner()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Investor")
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED,
  )
  //console.log(coreKitStatus)

  const [coreKitInstance, setCoreKitInstance] =
    useState<Web3AuthMPCCoreKit | null>(null)
  //console.log("loginwallet---->", wallet.email)
  const buttonStyle =
    // "border-[2px] rounded-[8px] w-[330px] h-[48px] border-[#1D39DD] active:bg-[#1D39DD] active:text-white hover:bg-[#1D39DD] hover:text-white transition-all"
    "md:w-[484px] md:h-[61px] border-[#1D39DD] rounded-[8px] border-2 flex justify-center gap-4 items-center my-5 w-[330px] h-[48px] "

  useEffect(() => {
    const init = async () => {
      const selectedNetwork = WEB3AUTH_NETWORK.MAINNET
      const coreKitInstance = new Web3AuthMPCCoreKit({
        web3AuthClientId: env.NEXT_PUBLIC_WEB3AUTH_CLIENTID,
        web3AuthNetwork: selectedNetwork,
        uxMode: "popup",
      })
      await coreKitInstance.init()
      setCoreKitInstance(coreKitInstance)
      // if (coreKitInstance.provider) {
      //   setProvider(coreKitInstance.provider)
      // }

      setCoreKitStatus(coreKitInstance.status)
    }
    void init()
  }, [])

  const login = async () => {
    try {
      setIsLoading(true)
      if (!coreKitInstance) {
        throw new Error("initiated to login")
      }
      const verifierConfig = {
        subVerifierDetails: {
          typeOfLogin: "google",
          verifier: "blok-capital",
          clientId: env.NEXT_PUBLIC_GOOGLE_ID,
        },
      } as SubVerifierDetailsParams

      await coreKitInstance.loginWithOauth(verifierConfig)

      //console.log("provider: ", provider)
      //google - tkey - w3a
      //new-blokc-verifier //
      if (coreKitInstance.provider === null) {
        throw new Error("Failed to login: provider is null")
      }
      setWeb3AuthSigner(coreKitInstance.provider as SafeEventEmitterProvider)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

      const userdata: Wallet1 =
        coreKitInstance.getUserInfo() as unknown as Wallet1

      setUserinfo(userdata)

      localStorage.setItem("userRole", selectedOption)

      router.push(Routes.wallet.root)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BLOKC</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dg6o4qafx/image/upload/v1698131801/qmhrqtnzsvgmvoelwtle.png"
        />

        <meta name="theme-color" content="rgb(100,116,139)" />
      </Head>

      <main>
        <div className=" mx-auto flex h-[100vh] w-[100%] flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-center  p-0 md:p-5">
            <Image
              src={logo as StaticImageData}
              alt="logo"
              height="202"
              width="202"
            />
            <p className="text-[33px]">Welcome to BLOKC </p>
            <p className="text-[16px] text-[#5F5F5F] md:text-[19px]">
              You’re in Prototype Test Version
            </p>
            <p className="mr-32 mt-20 text-[20px] text-[#B6B6B6] md:mr-40">
              Login as :
            </p>
            <div>
              <div className="my-2 flex items-center gap-2">
                <input
                  type="radio"
                  className="h-[15px] w-[15px] cursor-pointer rounded-[3px] border-[#1D39DD]"
                  checked={selectedOption === "Investor"} // Check if this option is selected
                  onChange={() => setSelectedOption("Investor")} // Update the state on selection
                />
                <label className="text-[14px] md:text-[18px] ">
                  Garden [Investor]
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="h-[15px] w-[15px] cursor-pointer rounded-[3px] border-[#1D39DD]"
                  checked={selectedOption === "Manager"} // Check if this option is selected
                  onChange={() => setSelectedOption("Manager")} // Update the state on selection
                />
                <label className="text-[14px] md:text-[18px] ">
                  Gardener [Fund Manager]
                </label>
              </div>
            </div>

            <div className="my-8 flex flex-col">
              <button
                className={`${buttonStyle} flex items-center justify-center`}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => login()}
                disabled={!selectedOption || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Image
                  src={google as StaticImageData}
                  alt="logo"
                  height="27"
                  width="27"
                />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
