/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import clipboardCopy from "clipboard-copy"
import { LucideCopy } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useRef, useState } from "react"
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import { IoArrowUpCircleSharp } from "react-icons/io5"
import {
  MdArrowBack,
  MdDone,
  MdDownloadDone,
  MdOutlineAddCircle,
  MdSwapHorizontalCircle,
} from "react-icons/md"
import { BounceLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"

import DownArrow from "../../public/icon/DownArrow.svg"
import Ellipse52 from "../../public/icon/Ellipse 52.svg"
import Ellipse53 from "../../public/icon/Ellipse 53.svg"
import Ellipse54 from "../../public/icon/Ellipse 54.svg"
import Ellipse55 from "../../public/icon/Ellipse 55.svg"
import QR from "../../public/icon/QR.svg"
import Buycrypto from "../pages/Buycrypto/index"
import Addgarden from "./Add-Garden"
import Add_gardener from "./Add_gardener"
import Gardenswap from "./Garden-swap"
import Swap from "./Swap"
import Tokenbalance from "./Tokenbalance"
import { WalletContext, type WalletContextType } from "./WalletContext"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"
import useWallet from "~/hooks/use-wallet"

import "react-toastify/dist/ReactToastify.css"

interface WalletProps {
  lodingsome: boolean
  setLodingsome: React.Dispatch<React.SetStateAction<boolean>>
}
const Wallet: React.FC<WalletProps> = ({ lodingsome, setLodingsome }) => {
  // const popupRef: React.RefObject<HTMLDivElement> = useRef(null)
  const { accountAddress } = useWeb3AuthSigner()
  const contextData = useContext(WalletContext) as WalletContextType
  const rgardener = contextData?.rgardener
  const opengarden = contextData?.opengarden
  const setOpengarden = contextData?.setOpengarden
  const { data } = useWallet()
  //console.log("data", data)

  const router = useRouter()
  const [showSwapCard, setShowSwapCard] = useState<boolean>(false)
  const [showContent, setShowContent] = useState<boolean>(true)
  const [adddeposite, setAdddeposite] = useState<boolean>(false)
  const [showGardenerPopup, setShowGardenerPopup] = useState<boolean>(false)
  const [Token, setToken] = useState<"Investor" | "Manager" | null>(null)
  const [showTransakWidget, setShowTransakWidget] = useState<boolean>(false)
  const [showbalance, setshowbalance] = useState<boolean>(false)
  const [copy, setcopy] = useState<boolean>(false)
  const notify = () => {
    if (accountAddress) {
      toast.success("Address Copied", {
        position: toast.POSITION.TOP_RIGHT,
      })
      void clipboardCopy(accountAddress)
      setcopy(true)
      setTimeout(() => {
        setcopy(false)
      }, 1000)
    }
  }

  useEffect(() => {
    // Start the loading indicator for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setLodingsome(false)
    }, 5000) // 2000 milliseconds = 2 seconds

    // Clear the timeout to prevent memory leaks
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [setLodingsome])
  useEffect(() => {
    // Check if localStorage is available (only in the browser)
    if (typeof localStorage !== "undefined") {
      const userRole = localStorage.getItem("userRole")
      setToken(userRole as "Investor" | "Manager" | null)
    }
  }, [])

  const openSwapCard = () => {
    setShowSwapCard(true)
    setShowContent(showContent)
  }

  useEffect(() => {
    const token = localStorage.getItem("userRole")
    if (rgardener === false && token === "Manager") {
      setShowGardenerPopup(true)
    } else if (token === "Investor") {
      setShowGardenerPopup(false)
    }
  }, [rgardener])

  const handleBuyCryptoClick = () => {
    setShowTransakWidget(true)
    setAdddeposite(false)
    void router.push("/Buycrypto")
  }

  const popupRef = useRef<HTMLDivElement | null>(null)

  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (popupRef.current && !popupRef.current.contains(abc.target)) {
      setAdddeposite(false)
      setshowbalance(false)
    }
  }

  return (
    <div className="w-[100%] rounded-b-2xl bg-[#1D39DD] md:rounded-xl">
      <div className="flex flex-col items-center justify-center space-y-1 p-3">
        <p className="text-base text-white "> Total Balance </p>
        <p className="text-xl text-white">
          {data?.totalBalance === undefined || null
            ? "$ 0"
            : `$ ${data.totalBalance}`}
        </p>

        <div className="">
          <div className="cursor-pointer ">
            {accountAddress ? (
              <div className="flex items-center justify-center gap-3 rounded-md bg-[#ffff] px-3 md:py-1">
                <div className="" onClick={() => setshowbalance(true)}>{`${
                  accountAddress
                    ? accountAddress.slice(0, 3) +
                      "...." +
                      accountAddress.slice(-3)
                    : ""
                }`}</div>
                <div className="flex justify-center ">
                  <button onClick={notify}>
                    {copy ? (
                      <MdDownloadDone size={18} />
                    ) : (
                      <LucideCopy size={18} />
                    )}
                  </button>
                  <ToastContainer />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className=" my-2  grid place-items-center">
          <div className="my-2">
            <div className="flex flex-wrap justify-center">
              <div>
                <div className="h-[5px] w-[156px] rounded-lg border-4 border-[#1D98DD] bg-[#1D98DD]"></div>
                <div className="flex space-x-3 space-y-1">
                  <Image
                    src={Ellipse52 as StaticImageData}
                    alt="logo"
                    width={10}
                    height={10}
                  />
                  <p className="text-[8px] text-[#FFFFFF]">
                    Private Garden (8.64%)
                  </p>
                </div>
              </div>

              <div>
                <div className="h-[5px] w-[156px] rounded-lg border-4 border-[#FE9ADC] bg-[#FE9ADC]"></div>
                <div className="flex space-x-3 space-y-1">
                  <Image
                    src={Ellipse53 as StaticImageData}
                    alt="logo"
                    width={10}
                    height={10}
                  />
                  <p className="text-[8px] text-[#FFFFFF]">
                    Assigned Garden (8.64%)
                  </p>
                </div>
              </div>

              <div>
                <div className="h-[5px] w-[156px] rounded-lg border-4 border-[#A9FF8B] bg-[#A9FF8B]"></div>
                <div className="flex space-x-3 space-y-1">
                  <Image
                    src={Ellipse54 as StaticImageData}
                    alt="logo"
                    width={10}
                    height={10}
                  />

                  <p className="text-[8px] text-[#FFFFFF]">
                    Total BLOKC (8.64%)
                  </p>
                </div>
              </div>
              <div>
                <div className="h-[5px] w-[156px] rounded-lg border-4 border-[#FFE5AD] bg-[#FFE5AD]"></div>
                <div className="flex space-x-3 space-y-1">
                  <Image
                    src={Ellipse55 as StaticImageData}
                    alt="logo"
                    width={10}
                    height={10}
                  />

                  <p className="text-[8px] text-[#FFFFFF]">
                    Total USDT (8.64%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-center gap-5">
            <div
              className="flex cursor-pointer flex-col items-center"
              onClick={() => setAdddeposite(true)}
            >
              <div className=" cursor-pointer text-white">
                <IoArrowUpCircleSharp size={30} />
              </div>
              <p className="text-[12px] text-white"> Deposit </p>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={() => setOpengarden(true)}
            >
              <div className="cursor-pointer text-white">
                <MdOutlineAddCircle size={30} />
              </div>
              <p className="text-[12px] text-white"> Add Garden </p>
            </div>
            <div
              className="flex cursor-pointer flex-col items-center"
              onClick={openSwapCard}
            >
              <div className=" text-white">
                <MdSwapHorizontalCircle size={30} />
              </div>
              <p className="text-[12px] text-white"> Swap </p>
            </div>
          </div>
        </div>
      </div>

      {showbalance && <Tokenbalance setshowbalance={setshowbalance} />}

      {/* Swap Card */}
      {showGardenerPopup && Token === "Manager" && (
        <Add_gardener setShowGardenerPopup={setShowGardenerPopup} />
      )}

      {lodingsome && (
        <>
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
            <BounceLoader color="#012aff" size={100} />
          </div>
        </>
      )}

      {showSwapCard && Token === "Manager" && (
        <Swap setShowSwapCard={setShowSwapCard} />
      )}
      {showSwapCard && Token === "Investor" && (
        <Gardenswap setShowSwapCard={setShowSwapCard} />
      )}
      {opengarden && <Addgarden setOpengarden={setOpengarden} />}

      {adddeposite && (
        <div
          className="absolute inset-0  right-0 z-50 flex w-full items-end justify-center bg-black bg-opacity-50 md:items-center"
          onClick={closePopup}
        >
          <div
            className="w-full rounded-3xl border-2 bg-white md:w-96 lg:w-96"
            ref={popupRef}
          >
            <div className="space-y-5 p-6">
              <div className="flex cursor-pointer items-center gap-2 text-center">
                <div
                  className=" flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white "
                  onClick={() => {
                    setAdddeposite(false)
                  }}
                >
                  <MdArrowBack />
                </div>

                <p>Deposit USDT</p>
              </div>

              <div className="flex items-center justify-center py-10">
                <Image
                  src={QR as StaticImageData}
                  alt="logo"
                  height="100"
                  width="100"
                />
              </div>

              <div className="">
                <p className="text-center text-xs">
                  Send only USDT (ERC 20 - Ethereum Network){" "}
                </p>
                <p className="text-center text-xs">
                  Sending any other coins may result in permanent loss.
                </p>
              </div>

              <div className="flex gap-7 text-sm shadow-lg">
                <Image
                  src={DownArrow as StaticImageData}
                  alt="logo"
                  height="30"
                  width="30"
                  className="mx-1"
                />
                <p className="my-3">
                  Copy wallet address and send USDT (ERC 20) from external
                  wallet.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 font-bold">
                <p className=""> Address:</p>
                <p className="text-base">
                  {`0x${
                    accountAddress
                      ? accountAddress.slice(0, 3) +
                        "...." +
                        accountAddress.slice(-3)
                      : ""
                  }`}
                </p>
                <div className="">
                  <button
                    onClick={notify}
                    className="rounded-full bg-[#243892] px-2 py-2 text-white"
                  >
                    {copy ? <MdDone size={15} /> : <LucideCopy size={15} />}
                    <ToastContainer />
                  </button>
                </div>
              </div>

              <div className="flex gap-7 text-sm shadow-lg">
                <Image
                  src={DownArrow as StaticImageData}
                  alt="logo"
                  height="30"
                  width="30"
                  className="mx-1"
                />
                <p className="my-3">
                  Buy USDT Crypto using Fiat, in case you do not have crypto in
                  external wallet.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleBuyCryptoClick}
                  className="rounded-md border border-blue-600 bg-[#1D39DD] px-5 py-3 text-base font-medium text-white transition-colors duration-150 ease-in-out hover:bg-white hover:text-blue-600 focus:outline-none active:bg-[#1D39DD] disabled:opacity-50"
                >
                  Buy Crypto
                </button>
              </div>

              {showTransakWidget && <Buycrypto />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Wallet
