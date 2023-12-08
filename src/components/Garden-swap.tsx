/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios"
import Image, { type StaticImageData } from "next/image"
import { stringify } from "querystring"
import React, {
  type Key,
  useEffect,
  useState,
  type SetStateAction,
  useRef,
  type ChangeEvent,
} from "react"
import { BsArrowDownCircleFill } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { MdArrowBack, MdOutlineArrowBackIos } from "react-icons/md"
import { PulseLoader } from "react-spinners"

// const eth: string = require('../../public/icon/ETH.svg');
import Swap1 from "../../public/icon/Swap.svg"
import CustomSelect1 from "./Gardenoption"
import GetAllTokens from "~/pages/getAllTokens"

interface DataItem {
  decimals: SetStateAction<number | undefined>
  address: `0x${string}` | undefined
  id: Key | null | undefined
  name: string
  symbol: string
  logoURI: string
}
interface GetAllTokensProps {
  setShowSwapCard: (open: boolean) => void
}

const GardenSwap: React.FC<GetAllTokensProps> = ({ setShowSwapCard }) => {
  // const modalRef: React.RefObject<HTMLDivElement> = useRef(null)
  const [originalData, setOriginalData] = useState<DataItem[]>([])
  const [isCardOpen1, setIsCardOpen1] = useState<boolean>(false)
  const [selectedLogo, setSelectedLogo] = useState<string>("")
  const [selectedName, setSelectedName] = useState<string>("")
  const [selectedLogo1, setSelectedLogo1] = useState<string>("")
  const [selectedName1, setSelectedName1] = useState<string>("")
  const [selectedDescription, setselectedDescription] = useState<string>()
  const [selectedDescription1, setselectedDescription1] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectToaddress, setSelectToaddress] = useState<
    `0x${string}` | undefined
  >(undefined)
  const [selectFromaddress, setSelectFromaddress] = useState<
    `0x${string}` | undefined
  >(undefined)
  const [selectdecimalfrom, setselectdecimalfrom] = useState<number>()
  const [selectdecimalto, setselectdecimalto] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState<string>("")
  const [from, setFrom] = useState<number | undefined>(undefined)
  const [to, setTo] = useState<number | undefined>(undefined)
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState<DataItem[]>([])
  const [displayedData, setDisplayedData] = useState<DataItem[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<string>("volvo")
  const [tokenamount, setTokenamount] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [toknselect, setToknselect] = useState<any>()

  const currentTrade = {
    from: {
      address: selectFromaddress, // Sample token address
      decimals: selectdecimalfrom, // Sample number of decimal places
    },
    to: {
      address: selectToaddress, // Sample token address
      decimals: selectdecimalto, // Sample number of decimal places
    },
  }

  //console.log("current", currentTrade)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPrice = async (): Promise<void> => {
    //console.log("Getting Price")

    // Check if currentTrade.from, currentTrade.to, and input value exist
    if (
      !currentTrade.from ||
      !currentTrade.to ||
      !from ||
      !currentTrade.from.decimals
    )
      return

    const amount = Number(from) * 10 ** currentTrade.from.decimals

    //console.log("amount", amount)
    // Calculate the amount based on decimalss
    const params = {
      sellToken: currentTrade.from.address,
      buyToken: currentTrade.to.address,
      sellAmount: amount,
    }

    //console.log("params: ", params)
    const headers = {
      "0x-api-key": "3644b058-8e98-4c7f-8eb6-cf25e347693f",
    }

    try {
      // Fetch the swap price.
      const response = await fetch(
        `https://api.0x.org/swap/v1/price?${stringify(params)}`,
        { headers },
      )
      //console.log("respons---->", response)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const swapPriceJSON = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //console.log("swapPriceJSON--->:", swapPriceJSON.buyAmount)

      // Update the "to_amount" input and "gas_estimate" element

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const BUY =
        swapPriceJSON.buyAmount / 10 ** (currentTrade.to.decimals ?? 0)

      // parseFloat(newDecimalValue).toFixed(2)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
      const Gasstimate = swapPriceJSON.estimatedGas
      // console.log("BUY", BUY)
      // console.log("Gas stimate-->", Gasstimate)

      setTo(BUY)
      // document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;
    } catch (error) {
      console.error("Error Fetching Swap Price:", error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newgetPrice = async (): Promise<void> => {
    //console.log("Getting Price")
    const from1 = 1
    // Check if currentTrade.from, currentTrade.to, and input value exist
    if (
      !currentTrade.from ||
      !currentTrade.to ||
      !from1 ||
      !currentTrade.from.decimals
    )
      return

    const amount = Number(from1) * 10 ** currentTrade.from.decimals
    //console.log("amount1", amount)
    // Calculate the amount based on decimalss
    const params = {
      sellToken: currentTrade.from.address,
      buyToken: currentTrade.to.address,
      sellAmount: amount,
    }

    //console.log("params1-->", params)

    const headers = {
      "0x-api-key": "3644b058-8e98-4c7f-8eb6-cf25e347693f",
    }

    try {
      // Fetch the swap price.
      const response = await fetch(
        `https://api.0x.org/swap/v1/price?${stringify(params)}`,
        { headers },
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const swapPriceJSON = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //console.log("swapPriceJSON 1--->:", swapPriceJSON.buyAmount)

      // Update the "to_amount" input and "gas_estimate" element

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const first = swapPriceJSON.buyAmount
      const second = 10 ** (currentTrade.to.decimals ?? 0)

      const One = first / second
      // console.log("One-->", One)
      setTokenamount(One)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
      const Gasstimate = swapPriceJSON.estimatedGas
      // console.log("Gas stimate-->", Gasstimate)

      // document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;
    } catch (error) {
      console.error("Error Fetching Swap Price:", error)
    }
  }

  useEffect(() => {
    void getPrice()
    //console.log("***************")
    void newgetPrice()
  }, [getPrice, newgetPrice])

  useEffect(() => {
    const fetchDataAndCache = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const response = await axios.get(
          "https://tokens.coingecko.com/uniswap/all.json",
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const data = response?.data?.tokens as DataItem[]

        setOriginalData(data)
        setFilteredData(data)

        const cache = await caches.open("my-cache")
        void cache.put("/api/data", new Response(JSON.stringify(data)))

        setLoading(false)
      } catch (error) {
        console.error("Error fetching and caching data:", error)
        setLoading(false)
      }
    }

    if (isCardOpen || isCardOpen1) {
      void fetchDataAndCache()
    }
  }, [isCardOpen, isCardOpen1])

  useEffect(() => {
    if (filteredData) {
      setDisplayedData(filteredData)
    }
  }, [filteredData])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSearchInput(inputValue)

    const filtered = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.symbol.toLowerCase().includes(inputValue.toLowerCase()),
    )

    setFilteredData(inputValue ? filtered : originalData)
  }
  const openCard = (e: any) => {
    setToknselect(e)
    setIsCardOpen(true)
    setLoading(true)
  }

  const openCard1 = () => {
    setIsCardOpen1(true)
  }
  const closeCard1 = () => {
    setIsCardOpen1(false)
    // document.body.style.overflow = "auto" // Allow scrolling when modal is closed
  }
  const handlePercentageClick = (percentage: string) => {
    setInputValue(percentage)
  }
  const handleInputChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = e.target.value

    // Check if the input is a valid number between 0 and 100
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (/^\d+$/.test(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const numericValue = parseInt(value, 10)
      if (numericValue >= 0 && numericValue <= 100) {
        setInputValue(numericValue.toString())
      }
    } else {
      setInputValue("") // Set to an empty string if not a valid number
    }
  }

  const selectFromName = (name: string, description: string, logo: string) => {
    setSelectedName(name)
    setselectedDescription(description)
    setSelectedLogo(logo)
    setIsCardOpen(false)
  }

  const selectToName = (name: string, description: string, logo: string) => {
    setSelectedName1(name)
    setselectedDescription1(description)
    setSelectedLogo1(logo)
    setIsCardOpen1(false)
  }

  const handleInputChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters from the input

    const inputValue = e.target.value.replace(/[^0-9]/g, "")

    setFrom(Number(inputValue))
  }

  const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters from the input
    const inputValue = e.target.value.replace(/[^0-9]/g, "")
    setTo(Number(inputValue))
  }

  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      setShowSwapCard(false)
    }
  }

  const [selectedOption1, setSelectedOption1] = useState("gardener")

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value)
  }

  const searchData = displayedData?.filter((item) => {
    const walletAddress = item?.symbol
    const userId = item?.name
    if (walletAddress == "USDT") {
      return userId
    } else if (walletAddress === "MATIC") {
      return userId
    } else if (walletAddress === "AVAX") {
      return userId
    } else if (walletAddress === "SETH") {
      return userId
    }
  })
  // console.log("searchData------->", searchData)

  return (
    <>
      <div
        className="fixed left-0  top-0 z-50 flex h-full w-full items-end justify-center bg-gray-900 bg-opacity-50 md:items-center"
        onClick={closePopup}
      >
        <div
          className=" mt-48 w-[480px] rounded-3xl bg-white md:mt-0 lg:mt-0"
          ref={modalRef}
        >
          <div className="mx-7 my-3 flex cursor-pointer items-center justify-between  pt-3 text-center">
            <div
              className="flex gap-2"
              onClick={() => {
                setShowSwapCard(false)
              }}
            >
              <div className=" flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
                <MdArrowBack />
              </div>
              <p>Back</p>
            </div>
          </div>

          <div className="mx-auto flex justify-center  gap-2">
            <div className="flex items-center gap-2 ">
              <Image
                src={Swap1 as StaticImageData}
                alt="Logo"
                height={25}
                width={25}
              />
              <p className="text-lg "> Garden Swap </p>
            </div>
          </div>

          <div className="">
            <div className="space-y-3 rounded-[10px] p-5">
              <div className="">
                <div className="space-y-3 rounded-[10px] ">
                  <CustomSelect1 />
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <label className="text-sm font-bold text-[#1D39DD]">
                  You Sell
                </label>

                <div>
                  <div className="flex cursor-pointer place-items-center justify-between rounded-lg bg-[#F6F6F6] p-2 ">
                    {selectedLogo && selectedName && selectedDescription ? (
                      <div className="flex gap-1 text-sm">
                        <Image
                          src={selectedLogo}
                          alt="logo"
                          height="30"
                          width="30"
                        />
                        <div>
                          <div>{selectedName}</div>

                          <div className="text-xs text-[#717171]">
                            {selectedDescription}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="rounded-xl  bg-[#e5e3e3] bg-transparent px-3 py-1"
                        onClick={() => openCard(0)}
                      >
                        <p>Select Token </p>
                      </div>
                    )}
                    <div className="">
                      <p className="text-sm text-[#717171]">
                        Amount :
                        <input
                          type="text"
                          className="w-32 rounded-full border-2 border-gray-300 px-4 py-2 transition-all duration-300 ease-in-out focus:border-[#1D39DD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Amount..."
                          value={from}
                          onChange={handleInputChange1}
                        />
                      </p>
                    </div>
                  </div>
                  {/* Card */}

                  {isCardOpen && (
                    <GetAllTokens
                      isCardOpen={isCardOpen}
                      setIsCardOpen={setIsCardOpen}
                      setSelectedName={setSelectedName}
                      setselectedDescription={setselectedDescription}
                      setSelectedLogo={setSelectedLogo}
                      setselectdecimalfrom={setselectdecimalfrom}
                      setSelectFromaddress={setSelectFromaddress}
                      selectFromName={selectFromName}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      toknselect={toknselect}
                      selectToName={selectToName}
                      setselectdecimalto={setselectdecimalto}
                      setSelectToaddress={setSelectToaddress}
                      setSelectedName1={setSelectedName1}
                      setselectedDescription1={setselectedDescription1}
                      setSelectedLogo1={setSelectedLogo1}
                    />
                  )}
                  <div id="load-more-trigger" style={{ height: "1px" }}></div>
                </div>
              </div>

              <div className="flex justify-center text-[#1D39DD]">
                <BsArrowDownCircleFill size={35} />
              </div>
              <div className="mb-3 space-y-3">
                <label className="text-sm font-bold text-[#1D39DD]">
                  You Buy
                </label>

                <div>
                  {/* Clickable Div */}

                  <>
                    <div className="flex cursor-pointer place-items-center justify-between rounded-lg bg-[#F6F6F6] p-2">
                      {selectedLogo1 &&
                      selectedName1 &&
                      selectedDescription1 ? (
                        <div className="flex gap-1 text-sm">
                          <Image
                            src={selectedLogo1}
                            alt="logo"
                            height="30"
                            width="30"
                          />
                          <div>
                            <div>{selectedName1}</div>
                            <div className="text-xs text-[#717171]">
                              {selectedDescription1}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="rounded-xl bg-[#e5e3e3] bg-transparent px-3 py-1"
                          onClick={() => openCard(1)}
                        >
                          <p>Select Token</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-[#717171]">
                          Amount :{" "}
                          <input
                            type="text"
                            value={to}
                            className="w-32 rounded-full border-2 border-gray-300 px-4 py-2 transition-all duration-300 ease-in-out focus:border-[#1D39DD] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Amount..."
                            onChange={handleInputChange2}
                          />
                        </p>
                      </div>
                    </div>
                  </>

                  {/* Card */}

                  {isCardOpen1 && (
                    // <div className="">
                    <div className="shadow-l fixed -mt-[475px] mb-10 flex items-center justify-center rounded-3xl">
                      <div className="mt-48 rounded-xl border-black bg-white px-7 py-5 shadow-2xl ">
                        <div className="">
                          <div className="relative  ">
                            <div className="flex items-center justify-center pb-3">
                              <h1 className="text-xl">Select a Token </h1>
                            </div>
                            <div
                              className="absolute top-1  cursor-pointer"
                              onClick={closeCard1}
                            >
                              <MdOutlineArrowBackIos />
                            </div>
                          </div>

                          {/* Search Bar */}

                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-[#8899FA] sm:pl-3">
                              <CiSearch size={20} />
                            </div>
                            <input
                              type="text"
                              className="2xs:py-1 w-full rounded-lg border border-[#1D39DD] bg-[#EFEFEF] pl-10 text-lg  outline-none  sm:py-2 sm:text-base"
                              placeholder="Search by name or paste address"
                              value={searchInput}
                              onChange={handleSearchInputChange}
                            />
                          </div>

                          <div className="">
                            <div className="mt-2 flex items-center justify-center space-x-2">
                              {searchData?.map((item) => (
                                <>
                                  <button
                                    // className="flex items-center justify-center  gap-3 rounded border border-[#E8E8E8] px-2 py-1 "
                                    className="flex items-center justify-center  gap-3 rounded border border-[#E8E8E8] px-2 py-1  "
                                    onClick={() => {
                                      selectToName(
                                        item.symbol,
                                        item.name,
                                        item.logoURI,
                                      )
                                      setselectdecimalto(item.decimals)
                                      setSelectToaddress(item.address)
                                    }}
                                  >
                                    <Image
                                      src={item.logoURI}
                                      height={25}
                                      width={25}
                                      alt="ETH"
                                    />
                                    <span className="text-sm">
                                      {item.symbol}{" "}
                                    </span>
                                  </button>
                                </>
                              ))}
                            </div>
                          </div>

                          <div className="w-full items-center overflow-y-scroll p-2 py-4 md:h-64">
                            {/* Display filtered data */}

                            {loading ? (
                              <div className="w-full text-center ">
                                <PulseLoader color="#368ed6" />
                              </div>
                            ) : (
                              displayedData?.map((e) => (
                                <>
                                  <div
                                    className="my-3 flex cursor-pointer place-items-center rounded-lg p-2"
                                    onClick={() => {
                                      selectToName(e.symbol, e.name, e.logoURI)
                                      // eslint-disable-next-line @typescript-eslint/unbound-method
                                      setSelectToaddress(e.address)
                                      setselectdecimalto(e.decimals) // Assuming setSelectToaddress is a state setter function
                                    }}
                                    key={e.id}
                                  >
                                    {/* Your content*/}

                                    <div className="flex gap-2 text-sm">
                                      <Image
                                        src={e?.logoURI}
                                        alt={e?.name}
                                        height={38}
                                        width={38}
                                        className="rounded-full"
                                      />
                                      <div>
                                        <div>{e.symbol}</div>
                                        <div className="text-xs text-[#717171]">
                                          {e.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div id="load-more-trigger" style={{ height: "1px" }}></div>
                </div>
              </div>
              {to ? (
                <>
                  <div className="border-t">
                    <div className="mb-6 space-y-3">
                      <div className="flex place-items-center justify-between  rounded-lg  p-3">
                       
                        <div className="flex gap-1 text-sm">
                          <div>
                            <div className="">
                              <span className="text-xs">
                                <span className="text-[#717171]">
                                  Swap ETH at rate{" "}
                                </span>
                                <span className="text-[#12CB02]">(+0.03%)</span>{" "}
                                <span className="text-[#1D39DD]">
                                  Set to Market Price
                                </span>{" "}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-[#000000]">
                              1 {selectedName} = {tokenamount} {selectedName1}
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-[#717171]">
                            <span className="text-[#1D39DD]"> Expire In </span>
                            <br />
                            <span className="font-bold text-[#000000]">
                              24 hours
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="text-center">
                <button
                  type="submit"
                  className="focus:shadow-outline-blue rounded bg-[#1D39DD] px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800"
                >
                  Swap
                </button>
              </div>
              <div className="flex"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GardenSwap
