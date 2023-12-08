/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/jsx-no-undef */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-explicit-any */
//import { EvmChain } from "@moralisweb3/common-evm-utils"
import axios, { type AxiosRequestConfig } from "axios"
import clipboardCopy from "clipboard-copy"
import { Loader2, LucideCopy } from "lucide-react"
//import Moralis from "moralis"
import Image, { type StaticImageData } from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { MdArrowBack, MdDownloadDone } from "react-icons/md"
import { toast } from "react-toastify"

import blokclogo from "../../public/icon-512x512.png"
//import GetOwnerWalletAddress from "./New"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"
import { env } from "~/env.mjs"

interface confi {
  method: string
  url: string
  headers: {
    "Content-Type": string
  }
  data: string
}
// Replace with the correct path
interface TokenBalanceData {
  data: TokenBalanceData
  jsonrpc: string
  id: number
  result: {
    address: string
    tokenBalances: {
      contractAddress: string
      tokenBalance: number
    }[]
  }
}
interface balance {
  setshowbalance: React.Dispatch<React.SetStateAction<boolean>>
}
const Tokenbalance: React.FC<balance> = ({ setshowbalance }) => {
  const [tokens, setTokens] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { accountAddress } = useWeb3AuthSigner()
  const [copy, setcopy] = useState<boolean>(false)
  console.log(tokens)
  //console.log("Token Logo:", tokens.logo)
  //const address = "0x251286FEB640dd7f39Cebf1E9cB650C7E72d58B2" // Replace with your desired address
  const address = accountAddress
  //  const address = accountwallet
  // Alchemy URL with your API key
  const baseURL = env.NEXT_PUBLIC_ALCHEMY_API_KEY // Replace with your Alchemy API key

  // Data for making the request to query token balances
  const data = {
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    headers: {
      "Content-Type": "application/json",
    },
    params: [`${address}`],
    id: 42,
  }

  // Config object for making a request with axios
  const config: confi = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  }

  async function getTokens() {
    let response: TokenBalanceData = await axios(config)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    response = response.data
    //console.log("response", response)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const balances = response.result
    //console.log("balances", balances)
    const tokensData: { name: any; balance: string; logo: string }[] = []
    //console.log("tokensData--->", tokensData)

    const contractAddresses = balances.tokenBalances
      .filter((token) => token.tokenBalance !== 0)
      .map((token) => token.contractAddress)
    //console.log("contractAddresses", contractAddresses)

    const metadataPromises = contractAddresses.map(async (contractAddress) => {
      const options: AxiosRequestConfig = {
        method: "POST",
        url: baseURL,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [contractAddress],
        },
      }

      return axios.request(options)
    })

    // Wait for all metadata requests to complete
    const metadataResponses = await Promise.all(metadataPromises)
    //console.log("metadataResponses", metadataResponses)

    metadataResponses.forEach((metadataResponse, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const balance = balances?.tokenBalances[index]?.tokenBalance

      if (typeof balance !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const metadata = metadataResponse.data
        //console.log("metadata", metadata)

        if (metadata?.result) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const balanceValue = balance / Math.pow(10, metadata.result.decimals)
          const formattedBalance = balanceValue.toFixed(5)

          tokensData.push({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            name: metadata.result.name,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            logo: metadata.result.logo,
            balance: `${formattedBalance}`,
          })
        }
      }
    })

    setLoading(false)
    return tokensData
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const tokenData = await getTokens()
      setTokens(tokenData)
      //console.log("tokenData", tokenData)
    }

    void fetchData()
  }, [])

  const notify1 = () => {
    if (accountAddress) {
      toast.success("Address Copied")
      void clipboardCopy(accountAddress)
      setcopy(true)
      setTimeout(() => {
        setcopy(false)
      }, 1000)
    }
  }

  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      setshowbalance(false)
    }
  }
  return (
    <>
      <div
        className="absolute inset-0  right-0 z-50 flex w-full items-end justify-center md:items-center  "
        onClick={closePopup}
      >
        <div
          className="w-full rounded-3xl border-2 bg-white md:w-96 lg:w-96"
          ref={modalRef}
        >
          <div className=" p-6">
            <div
              className="flex cursor-pointer items-center gap-2 py-2 text-center"
              onClick={() => {
                setshowbalance(false)
              }}
            >
              <div className="flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
                <MdArrowBack />
              </div>

              <p> Back </p>
            </div>
            <div className="bg-[#ffff]">
              <hr className="" />
              <div className="flex items-center justify-center gap-2 py-2 text-lg font-semibold">
                <p>
                  Address:{" "}
                  {`${
                    accountAddress
                      ? accountAddress.slice(0, 5) +
                        "...." +
                        accountAddress.slice(-5)
                      : ""
                  }`}
                </p>
                <button onClick={notify1}>
                  {copy ? (
                    <MdDownloadDone size={18} />
                  ) : (
                    <LucideCopy size={18} />
                  )}

                  {/*<ToastContainer />*/}
                </button>
              </div>
              <hr className="py-2" />

              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                </div>
              ) : (
                //<p>loding....</p>
                <div className=" overflow-y-scroll text-center">
                  {tokens.map((token, index) => (
                    <div key={index} className="flex gap-5 ">
                      {/*{`${index + 1}. ${token.name}: ${token.balance}`}*/}

                      <div className="mb-5 ">
                        <Image
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          src={token?.logo || blokclogo.src}
                          alt={`${token.name}`}
                          height={40}
                          width={40}
                        />
                      </div>
                      <div className="mb-5 flex flex-col items-start justify-start">
                        {/*<p className="text-lg font-medium">{`${token.logo}.`}</p>*/}
                        <p className="text-base font-semibold">{`${token.name}`}</p>
                        <p className="text-sm text-[#535353]">{`${token.balance}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/*<GetOwnerWalletAddress />*/}

          {/*{showResult &&
            result.map((token) => {
              return (
                <section
                  className="flex items-center justify-center space-x-3"
                  key={result.indexOf(token)}
                >*/}
          {/*<Image
                    src={token.thumbnail as StaticImageData}
                    alt="logo"
                    height={30}
                    width={30}
                  />*/}
          {/*<Image
                    src={token.logo}
                    alt={token.name}
                    height={30}
                    width={30}
                  />
                  <p className="">{token.name}</p>
                  <p className="">
                    {(token.balance / 10 ** token.decimals).toFixed(5)}
                  </p>
                </section>
              )
            })}*/}
        </div>
        <div className="fixed inset-0 -z-40 bg-black opacity-30"></div>
      </div>
    </>
  )
}

export default Tokenbalance
