/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios"
import { ethers } from "ethers"
import Image, { type StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { BiMenuAltLeft } from "react-icons/bi"
import { BsArrowUpCircleFill } from "react-icons/bs"
import { IoIosNotificationsOutline } from "react-icons/io"
import { MdArrowBack, MdOutlineContentCopy } from "react-icons/md"

import discover1 from "../../public/icon/Discover1.png"
import discover from "../../public/icon/Discover.png"
import Gardens1 from "../../public/icon/Gardens1.png"
import Gardens from "../../public/icon/Gardens.png"
import growth1 from "../../public/icon/Growth1.png"
import growth from "../../public/icon/Growth.png"
import home1 from "../../public/icon/Home1.png"
import Navlogo from "../../public/icon/Navlogo.svg"
import setting1 from "../../public/icon/Settings1.png"
import setting from "../../public/icon/Settings.png"
import home from "../../public/icon/home.png"
import profile from "../../public/icon/profiledefault.jpg"
import abi from "../contract/blokc.json"
import BuyBlokCPopUP from "./BlokCPopup"
import Referral from "./Referral"
import {
  type Wallet1,
  WalletContext,
  type WalletContextType,
} from "~/components/WalletContext"
import { Routes } from "~/configuration"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"
import { env } from "~/env.mjs"

interface FooterItem {
  id: number
  pathname: string
  pagename: string
  Title: string
  logo: StaticImageData
  colorlogo: StaticImageData
}
//interface Navbar {
//  isLoading1: React.Dispatch<React.SetStateAction<boolean>>
//}

const Navbar: React.FC = () => {
  const router = useRouter()
  const contextData = useContext(WalletContext) as WalletContextType
  const userinfo: Wallet1 | null = contextData?.userinfo
  const setAlltoken = contextData?.setAlltoken
  const setRgardener = contextData?.setRgardener
  const setAllgardener = contextData?.setAllgardener
  const setStrategy = contextData?.setStrategy
  const setGarden = contextData?.setGarden
  const [hoveredItemId, setHoveredItemId] = useState<number | null>()
  const [activeMenu, setActiveMenu] = useState<number | null>()
  const [logoutpage, setLogoutpage] = useState<boolean>(false)
  const { accountAddress } = useWeb3AuthSigner()
  const [presale, Setpresale] = useState<boolean>(false)
  const [youPay, setYouPay] = useState<number>(0)
  const [youSell, setYouSell] = useState<number>(0)
  const [mycode, setMycode] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [openreferral, setOpenreferral] = useState<boolean>(false)
  //console.log("mycode_navbar--->", mycode)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("userRole")
      if (userRole) {
        setRole(userRole)
      }
    }
  }, [])
  const handleMenuMouseEnter = (id: number) => {
    setHoveredItemId(id)
  }

  const handleMenuMouseLeave = () => {
    setHoveredItemId(null)
  }

  const handleMenuClick = (id: number) => {
    setActiveMenu(id)
  }
  const open = () => {
    setLogoutpage(!logoutpage)
  }

  const logout = () => {
    setLogoutpage(false)
    void router.replace(Routes.login)
  }

  const openreffel = () => {
    setLogoutpage(false)
    setOpenreferral(true)
  }

  const footerbar: FooterItem[] = [
    {
      id: 0,
      pathname: "/Wallet",
      pagename: "Home",
      Title: "Home",
      logo: home,
      colorlogo: home1,
    },
    {
      id: 1,
      pathname: "/Wallet/coin",
      pagename: "Growth",
      Title: "Growth",
      logo: growth,
      colorlogo: growth1,
    },
    {
      id: 2,
      pathname: "/Wallet",
      pagename: "Gardens",
      Title: "Gardens",
      logo: Gardens,
      colorlogo: Gardens1,
    },
    {
      id: 3,
      pathname: "/Wallet",
      pagename: "Discover",
      Title: "Discover",
      logo: discover,
      colorlogo: discover1,
    },
    {
      id: 4,
      pathname: "/Wallet",
      pagename: "Settings",
      Title: "Settings",
      logo: setting,
      colorlogo: setting1,
    },
  ]

  // Function to update "You Sell" based on "You Pay"
  const handleYouPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setYouPay(value)
    // Calculate "You Sell" based on your logic (e.g., multiplying by 10)
    setYouSell(value * 100)
  }

  // Function to update "You Pay" based on "You Sell"
  const handleYouSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setYouSell(value)
    // Calculate "You Pay" based on your logic (e.g., dividing by 10)
    setYouPay(value / 100)
  }

  const copyToClipboard = () => {
    const textField = document.createElement("textarea")
    textField.innerText = mycode
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
  }

  useEffect(() => {
    const sendApiRequest = async () => {
      const dataToSend = {
        wallet: accountAddress,
        email: userinfo?.email,
        username: userinfo?.name,
        role: role,
        //refaral: referralCode,
      }
      //console.log("dataToSend--->", dataToSend)
      try {
        await axios
          .post(`${env.NEXT_PUBLIC_BACKEND_URL}/registerUser`, dataToSend)
          .then((response) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            //console.log(
            //  "API Response:",
            //  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            //  response?.data?.data?.checkUser?.mycode,
            //)
            //toast.success(response?.data?.message)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            //console.log("message-->", response?.data?.message)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            setMycode(String(response?.data?.data?.checkUser?.mycode))
          })
      } catch (error) {
        console.error("API Error:", error)
      }
    }
    void sendApiRequest()
  }, [accountAddress, role, userinfo, userinfo?.email, userinfo?.name])

  useEffect(() => {
    const executeReadContract = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-mainnet.g.alchemy.com/v2/vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H",
      )
      const ERC20_ABI = abi
      const contractAddress = "0xc1b1d35BCb4145939E0b51663A9CdCb05EE1777A" // ETH mainnet
      const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider)
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const gardener = await contract.isGardenerRegistered(accountAddress)
        if (setRgardener) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setRgardener(gardener)
        }
        //console.log("gardener-->", gardener)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const gardeners = await contract.getAllGardeners()
        //console.log("getAllGardeners-->", gardeners)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setAllgardener(gardeners)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const Gardens = await contract.getGardensByAddress(accountAddress)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setGarden(Gardens)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const strategy = await contract.viewAllStrategiesForGardener(
          accountAddress,
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setStrategy(strategy)
        //console.log("strategy-->", strategy)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const owner = await contract.owner()
        //console.log("owner--->", owner)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        //const id = await contract.getIdGardener()
        //console.log("-----id---->", id)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        //const getgardensforgardener = await contract.getGardensForGardener()
        //console.log("--------getGardensForGardener-->", getgardensforgardener)
      } catch (error) {
        console.error("Error interacting with readcontract :", error)
      }
    }
    const delay = 1000
    // Execute the function with a delay on the initial render
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const delayedExecution = setTimeout(executeReadContract, delay)
    // Execute the function on subsequent re-renders
    void executeReadContract()
    return () => {
      clearTimeout(delayedExecution)
    }
  }, [accountAddress, setAllgardener, setGarden, setRgardener, setStrategy])

  useEffect(() => {
    const fetchDataAndCache = async () => {
      try {
        const response = await axios.get(
          "https://tokens.coingecko.com/uniswap/all.json",
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const data = response?.data?.tokens
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setAlltoken(data)
      } catch (error) {
        console.error("Error fetching and caching data:", error)
      }
    }

    void fetchDataAndCache()
  }, [setAlltoken])

  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      setLogoutpage(false)
    }
  }

  return (
    <>
      <div className="block  bg-[#1D39DD] md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="text-white">
            <BiMenuAltLeft size={30} />
          </div>

          <div
            className="flex cursor-pointer flex-col items-center"

            onClick={() => Setpresale(true)}
          >
            <button className="border-1 space-x-10 rounded-md rounded-l  bg-[#eeeff5] px-1 py-1 text-black">
              Buy BLOKC 
            </button>
          </div>

          <div className="flex items-center gap-2">
            {userinfo && (
              <>
                <IoIosNotificationsOutline size={22} className="text-white " />
                {userinfo?.profileImage ? (
                  <Image
                    src={userinfo?.profileImage}
                    alt="logo"
                    height={30}
                    width={30}
                    className="rounded-full"
                    onClick={() => open()}
                  />
                ) : (
                  <Image
                    src={profile}
                    alt="logo"
                    height={30}
                    width={30}
                    className="rounded-full"
                    onClick={() => open()}
                  />
                )}
              </>
            )}
          </div>
          
        </div>

        <div className="flex justify-end">
          {logoutpage && (
            <div className="absolute">
              <div
                className="flex w-52 flex-col justify-center gap-2 rounded-md border border-indigo-600 bg-white p-2 text-center"
                onClick={closePopup}
              >
                <div
                  className="flex cursor-pointer flex-col justify-center text-center text-base"
                  ref={modalRef}
                >
                  <p
                    className="rounded-md bg-[#2a32a7] py-1 text-white"
                    onClick={() => openreffel()}
                  >
                    Referral
                  </p>
                  <div className="flex gap-2">
                    <h3 className="pt-2 font-semibold"> {mycode}</h3>
                    <button className="" onClick={copyToClipboard}>
                      <MdOutlineContentCopy size={18} />
                    </button>
                  </div>
                </div>
                <hr />
                <div className="border-1 rounded-lg bg-transparent bg-white  text-[#1D39DD] shadow hover:bg-[#1D39DD] hover:text-white">
                  <button className="text-base font-semibold">
                    Add Gardiens
                  </button>
                </div>

                <div
                  className="border-1 w-full rounded-l bg-[#1D39DD] py-1 text-white   shadow"
                  onClick={logout}
                >
                  <button className="text-base font-semibold">Logout </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={Navlogo as StaticImageData}
              alt="logo"
              height={25}
              width={25}
            />
            <p className="text-base font-semibold"> BLOKC </p>
          </div>
          <div className="flex items-center justify-center gap-28">
            <div className="flex">
              {footerbar.map((e) => (
                <div
                  className="flex cursor-pointer items-center"
                  key={e.id}
                  onMouseEnter={() => handleMenuMouseEnter(e.id)}
                  onMouseLeave={handleMenuMouseLeave}
                  onClick={() => handleMenuClick(e.id)}
                >
                  <div className="flex">
                    {hoveredItemId === e.id || activeMenu === e.id ? (
                      <div className="flex items-center justify-center space-x-1 px-2">
                        <Image
                          src={e?.colorlogo}
                          alt="logo"
                          height={15}
                          width={15}
                        />
                        <p className="text-sm text-[#1D39DD]">{e.Title}</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-1 px-2">
                        <Image
                          src={e?.logo}
                          alt="logo"
                          height={15}
                          width={15}
                        />
                        <p className="text-sm text-[#5F5F5F]">{e.Title}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div
                className="flex cursor-pointer flex-col items-center"
                onClick={() => Setpresale(true)}
              >
                {/* <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-1 text-white shadow-lg transition duration-300 ease-in-out hover:from-blue-800 hover:to-blue-600 hover:shadow-xl focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 ">
                  Buy BLOKC
                </button> */}

                <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-1 text-white shadow-lg transition duration-300 ease-in-out hover:from-blue-800 hover:to-blue-600 hover:shadow-xl focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 md:px-1 md:py-0.5 md:text-sm">
                  Buy BLOKC
                </button>
              </div>

              {userinfo?.profileImage ? (
                <Image
                  src={userinfo.profileImage}
                  alt="logo"
                  height={30}
                  width={30}
                  className="cursor-pointer rounded-full"
                  onClick={() => open()}
                />
              ) : (
                <Image
                  src={profile}
                  alt="55"
                  height={30}
                  width={30}
                  className="cursor-pointer rounded-full"
                  onClick={() => open()}
                />
              )}

              {logoutpage && (
                // <div className="absolute mt-40">
                <div className="absolute -ml-24 mt-64" onClick={closePopup}>
                  <div
                    className="flex w-64 flex-col gap-2 rounded-md border border-indigo-600 bg-white p-2"
                    ref={modalRef}
                  >
                    <div className="flex cursor-pointer flex-col justify-center text-center text-base">
                      <p
                        className="rounded-md bg-[#2a32a7] py-2 text-white"
                        onClick={() => setOpenreferral(true)}
                      >
                        Referral
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="pt-2 font-semibold "> {mycode}</h3>
                        <button className="" onClick={copyToClipboard}>
                          <MdOutlineContentCopy size={18} />
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="border-1 rounded-lg bg-transparent bg-white  px-14 py-2 text-[#1D39DD] shadow hover:bg-[#1D39DD] hover:text-white">
                      <button className="text-base font-semibold">
                        Add Gardiens{" "}
                      </button>
                    </div>

                    <div
                      className="border-1 rounded-lg bg-transparent bg-white  px-20 py-2 text-[#1D39DD] shadow hover:bg-[#1D39DD] hover:text-white"
                      onClick={logout}
                    >
                      <button className="text-base font-semibold">
                        Logout{" "}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {openreferral && (
                <Referral mycode={mycode} setOpenreferral={setOpenreferral} />
              )}

              {presale && (
                <div
                  className="fixed left-0  top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
                  onClick={closePopup}
                >
                  <div
                    className=" mt-48 rounded-3xl bg-white md:mt-0 lg:mt-0"
                    ref={modalRef}
                  >
                    <div
                      className="mx-7 my-3 flex cursor-pointer items-center gap-2 pt-3 text-center"
                      onClick={() => {
                        Setpresale(false)
                      }}
                    >
                      <div className=" flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
                        <MdArrowBack />
                      </div>
                      <p>Back </p>
                    </div>
                    <div className="my-8 flex justify-center gap-2 pb-2">
                      <p className="flex place-items-center items-center gap-2 text-center">
                        <span className="text-2xl font-bold"></span>{" "}
                        <span className="text-2xl text-[#1D39DD]">
                          Buy BLOKC
                        </span>
                      </p>
                    </div>

                    <div className="border-t">
                      <div className="rounded-[10px] p-5">
                        <div className="flex justify-between">
                          <div className="">
                            <label className="text-sm font-bold text-[#1D39DD]">
                              You Pay
                            </label>
                          </div>
                          <div className="">
                            <p className="text-right text-xs text-[#828282]">
                              Price: 0.01 USDT/BLOKC
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-3">
                          <input
                            type="number"
                            id="youPay"
                            name="youPay"
                            placeholder="Enter Your Amount."
                            className="appearance-none bg-transparent outline-none"
                            value={youPay}
                            onChange={handleYouPayChange}
                          />
                          <span className="bold ml-2 text-[#1D39DD]">USDT</span>
                        </div>
                        <div className="text-xs text-[#A7A7A7]">
                          Minimum 100 USDT
                        </div>
                        <div className="flex justify-center">
                          <Image
                            src="icon/Recive.svg"
                            alt="logo"
                            height={35}
                            width={35}
                            className="mx-1"
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className="">
                            <label className="text-sm font-bold text-[#1D39DD]">
                              You Sell
                            </label>
                          </div>
                        </div>
                        <div className="">
                          {" "}
                          {/* Add margin-bottom to create space */}
                          <div className="flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-3">
                            <input
                              type="number"
                              id="youSell"
                              name="youSell"
                              placeholder="Enter Your Amount."
                              className="bg-transparent outline-none"
                              value={youSell === 0 ? "" : youSell}
                              onChange={handleYouSellChange}
                            />
                            <span className="bold ml-2 text-[#1D39DD]">
                              BLOKC
                            </span>
                          </div>
                        </div>{" "}
                        {/* Close the wrapper div with margin-bottom to create space */}
                        <div className="text-xs text-[#A7A7A7]">
                          Minimum 10000 BLOKC
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="focus:shadow-outline-blue rounded bg-[#1D39DD] px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800"
                          >
                            Buy
                          </button>
                        </div>
                        {/* Add margin-top to create space between the button and the hr */}
                        <hr className="mt-4" />
                        <div className="mt-6 text-xs">
                          {" "}
                          {/* Add margin-top to create space */}
                          <p>
                            *Price of Pre-Sale is 0.01 USDT/BLOKC is only
                            available for this round of Pre-Sale. After
                            <hr />
                            this, We will have Launch pad pre sale via Pinksale
                            and Gempad. Starting Price will be
                            <hr />
                            0.02USDT/BLOKC at launchpads. We are happy to have
                            you as a community!ddd
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BuyBlokCPopUP
        presale={presale}
        youPay={youPay}
        handleYouPayChange={handleYouPayChange}
        youSell={youSell}
        handleYouSellChange={handleYouSellChange}
        Setpresale={Setpresale}
      />
    </>
  )
}

export default Navbar
